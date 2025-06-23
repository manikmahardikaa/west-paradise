<?php

namespace App\Http\Controllers;

use App\Helpers\GeminiTranslator;
use App\Helpers\SupabaseHelper;
use App\Models\Accomodation;
use App\Models\ImageAccomodation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AccomodationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $accomodations = Accomodation::with('images')->get();
        return Inertia::render('dashboard/accomodations/Page', [
            'accomodations' => $accomodations
        ]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('dashboard/accomodations/create/Page');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    { {
            Log::info('Request data:', $request->all());
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'district' => 'required|string|max:255',
                'village' => 'required|string|max:255',
                'address' => 'required|string',
                'description' => 'required|string',
                'thumbnail' => 'required|string',
                'contact' => 'required|string|max:255',
                'facilities' => 'nullable|string',
                'google_business' => 'nullable|string',
                'latitude' => 'required|numeric',
                'longitude' => 'required|numeric',
                'is_published' => 'boolean',
                'authority' => 'required|string|max:255',
                'start_time' => 'nullable|date_format:H:i',
                'end_time' => 'nullable|date_format:H:i',
                'is_fullday' => 'nullable|boolean',
                'photos' => 'array',
                'photos.*' => 'string',
            ]);

            try {
                DB::transaction(function () use ($validated) {
                    Log::info('Memulai penyimpanan akomodasi...');
                    $accomodation = new Accomodation([
                        'name' => $validated['name'],
                        'district' => $validated['district'],
                        'village' => $validated['village'],
                        'address' => $validated['address'],
                        'description' => $validated['description'],
                        'thumbnail' => $validated['thumbnail'],
                        'contact' => $validated['contact'],
                        'facilities' => $validated['facilities'] ?? null,
                        'google_business' => $validated['google_business'] ?? null,
                        'latitude' => $validated['latitude'],
                        'authority' => $validated['authority'],
                        'longitude' => $validated['longitude'],
                        'start_time' => isset($validated['start_time'])
                            ? date('H:i', strtotime($validated['start_time']))
                            : null,
                        'end_time' => isset($validated['end_time'])
                            ? date('H:i', strtotime($validated['end_time']))
                            : null,
                        'is_fullday' => $validated['is_fullday'] ?? false,
                        'is_published' => $validated['is_published'] ?? false,
                    ]);
                    Log::info('Akomodasi berhasil dibuat dengan ID:', [$accomodation->id]);

                    $accomodation->translateOrNew('id')->description = $validated['description'];
                    $accomodation->translateOrNew('id')->facilities = $validated['facilities'] ?? null;

                    // Bahasa Inggris (gunakan Gemini/DeepSeek sesuai preferensi)
                    $translator = new GeminiTranslator; // Ganti jika pakai DeepSeekTranslator

                    $accomodation->translateOrNew('en')->description = $translator->translate($validated['description'], 'id', 'en');
                    $accomodation->translateOrNew('en')->facilities = $translator->translate($validated['facilities'] ?? '', 'id', 'en');

                    $accomodation->save();


                    if (!empty($validated['photos'])) {
                        foreach ($validated['photos'] as $url) {
                            Log::info('Menyimpan foto akomodasi:', ['url' => $url]);
                            ImageAccomodation::create([
                                'accomodation_id' => $accomodation->id,
                                'image_url' => $url,
                            ]);
                        }
                    }
                });

                return redirect()
                    ->to('/dashboard/accommodations')
                    ->with('success', 'Restoran berhasil ditambahkan.');
            } catch (\Exception $e) {
                Log::error('Gagal menyimpan akomodasi: ' . $e->getMessage());
                return redirect()->back()
                    ->withInput()
                    ->with('error', 'Terjadi kesalahan saat menyimpan data. Silakan periksa log.');
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {}

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $accomodation = Accomodation::with('images')->findOrFail($id);
        return Inertia::render('dashboard/accomodations/edit/Page', [
            'accomodation' => $accomodation
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        Log::info('Request data for update:', $request->all());
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'village' => 'required|string|max:255',
            'address' => 'required|string',
            'description' => 'required|string',
            'thumbnail' => 'required|string',
            'contact' => 'required|string|max:255',
            'facilities' => 'nullable|string',
            'google_business' => 'nullable|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'is_published' => 'boolean',
            'authority' => 'required|string|max:255',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'is_fullday' => 'nullable|boolean',
            'photos' => 'array',
            'photos.*' => 'string',
        ]);

        try {
            DB::transaction(function () use ($validated, $id) {
                $accomodation = Accomodation::findOrFail($id);

                if ($accomodation->thumbnail) {
                    $parsed = parse_url($accomodation->thumbnail);
                    $path = isset($parsed['path']) ? ltrim($parsed['path'], '/') : null;
                    if ($path) {
                        SupabaseHelper::deleteFile('images', $path);
                    }
                }

                $accomodation->fill([
                    'name' => $validated['name'],
                    'district' => $validated['district'],
                    'village' => $validated['village'],
                    'address' => $validated['address'],
                    'description' => $validated['description'],
                    'thumbnail' => $validated['thumbnail'],
                    'contact' => $validated['contact'],
                    'facilities' => $validated['facilities'] ?? null,
                    'google_business' => $validated['google_business'] ?? null,
                    'latitude' => $validated['latitude'],
                    'authority' => $validated['authority'],
                    'longitude' => $validated['longitude'],
                    'start_time' => isset($validated['start_time'])
                        ? date('H:i', strtotime($validated['start_time']))
                        : null,
                    'end_time' => isset($validated['end_time'])
                        ? date('H:i', strtotime($validated['end_time']))
                        : null,
                    'is_fullday' => $validated['is_fullday'] ?? false,
                    'is_published' => $validated['is_published'] ?? false,
                ]);

                $accomodation->translateOrNew('id')->description = $validated['description'];
                $accomodation->translateOrNew('id')->facilities = $validated['facilities'] ?? null;

                // Bahasa Inggris (gunakan Gemini/DeepSeek sesuai preferensi)
                $translator = new GeminiTranslator; // Ganti jika pakai DeepSeekTranslator

                $accomodation->translateOrNew('en')->description = $translator->translate($validated['description'], 'id', 'en');
                $accomodation->translateOrNew('en')->facilities = $translator->translate($validated['facilities'] ?? '', 'id', 'en');

                $accomodation->save();

                // Delete old images
                $accomodation->images()->delete();
                foreach ($accomodation->images as $img) {
                    $parsed = parse_url($img->image_url);
                    $path = isset($parsed['path']) ? ltrim($parsed['path'], '/') : null;
                    if ($path) {
                        SupabaseHelper::deleteFile('images', $path);
                    }
                }

                // Insert new images
                if (!empty($validated['photos'])) {
                    foreach ($validated['photos'] as $url) {
                        ImageAccomodation::create([
                            'accomodation_id' => $accomodation->id,
                            'image_url' => $url,
                        ]);
                    }
                }
            });

            return redirect()
                ->to('/dashboard/accommodations')
                ->with('success', 'Data destinasi desa berhasil diperbarui.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Terjadi kesalahan saat memperbarui data. Silakan periksa log.');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            DB::transaction(function () use ($id) {
                $accomodation = Accomodation::findOrFail($id);

                ImageAccomodation::where('accomodation_id', $accomodation->id)->delete();

                $accomodation->delete();
            });

            return redirect()
                ->to('/dashboard/accommodations')
                ->with('success', 'Destinasi Desa berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Terjadi kesalahan saat menghapus data. Silakan periksa log.');
        }
    }
}
