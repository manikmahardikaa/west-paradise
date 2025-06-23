<?php

namespace App\Http\Controllers;

use App\Helpers\DeepSeekTranslator;
use App\Helpers\GeminiTranslator;
use App\Helpers\SupabaseHelper;
use App\Models\ImageTransportation;
use App\Models\Transportation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Symfony\Component\Mailer\Transport;

class TransportationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $transportations = Transportation::with('images')->get();
        return Inertia::render('dashboard/transportations/Page', [
            'transportations' => $transportations,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('dashboard/transportations/create/Page');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
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
                $transportation = new Transportation([
                    'name' => $validated['name'],
                    'district' => $validated['district'],
                    'village' => $validated['village'],
                    'address' => $validated['address'],
                    'thumbnail' => $validated['thumbnail'],
                    'contact' => $validated['contact'],
                    'google_business' => $validated['google_business'] ?? null,
                    'latitude' => $validated['latitude'],
                    'authority' => $validated['authority'],
                    'longitude' => $validated['longitude'],
                    'start_time' => $validated['start_time'] ?? null,
                    'end_time' => $validated['end_time'] ?? null,
                    'is_fullday' => $validated['is_fullday'] ?? false,
                    'is_published' => $validated['is_published'] ?? false,
                ]);

                // Bahasa Indonesia
                // $transportation->translateOrNew('id')->name = $validated['name'];
                $transportation->translateOrNew('id')->description = $validated['description'];
                $transportation->translateOrNew('id')->facilities = $validated['facilities'] ?? null;

                // Bahasa Inggris (menggunakan Gemini)
                $translator = new GeminiTranslator();
                // $transportation->translateOrNew('en')->name = $translator->translate($validated['name'], 'id', 'en');
                $transportation->translateOrNew('en')->description = $translator->translate($validated['description'], 'id', 'en');
                $transportation->translateOrNew('en')->facilities = $translator->translate($validated['facilities'] ?? '', 'id', 'en');

                $transportation->save();

                if (!empty($validated['photos'])) {
                    foreach ($validated['photos'] as $url) {
                        ImageTransportation::create([
                            'transportation_id' => $transportation->id,
                            'image_url' => $url
                        ]);
                    }
                }
            });

            return redirect()
                ->to('/dashboard/transportations')
                ->with('success', 'Transportasi berhasil ditambahkan.');
        } catch (\Exception $e) {
            Log::error('Gagal menyimpan transportasi: ' . $e->getMessage());
            return redirect()->back()
                ->withInput()
                ->with('error', 'Terjadi kesalahan saat menyimpan data. Silakan periksa log.');
        }
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $transportation = Transportation::with('images')->findOrFail($id);
        return Inertia::render('dashboard/transportations/edit/Page', [
            'transportation' => $transportation
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
                $transportation = Transportation::findOrFail($id);

                // Hapus thumbnail lama jika berbeda
                if ($transportation->thumbnail && $transportation->thumbnail !== $validated['thumbnail']) {
                    $parsed = parse_url($transportation->thumbnail);
                    $path = isset($parsed['path']) ? ltrim($parsed['path'], '/') : null;
                    if ($path) {
                        SupabaseHelper::deleteFile('images', $path);
                    }
                }

                // Update field utama
                $transportation->fill([
                    'name' => $validated['name'],
                    'district' => $validated['district'],
                    'village' => $validated['village'],
                    'address' => $validated['address'],
                    'thumbnail' => $validated['thumbnail'],
                    'contact' => $validated['contact'],
                    'google_business' => $validated['google_business'] ?? null,
                    'latitude' => $validated['latitude'],
                    'authority' => $validated['authority'],
                    'longitude' => $validated['longitude'],
                    'start_time' => $validated['start_time'] ?? null,
                    'end_time' => $validated['end_time'] ?? null,
                    'is_fullday' => $validated['is_fullday'] ?? false,
                    'is_published' => $validated['is_published'] ?? false,
                ]);

                // Bahasa Indonesia
                $transportation->translateOrNew('id')->description = $validated['description'];
                $transportation->translateOrNew('id')->facilities = $validated['facilities'] ?? null;

                // Bahasa Inggris (gunakan Gemini/DeepSeek sesuai preferensi)
                $translator = new GeminiTranslator; // Ganti jika pakai DeepSeekTranslator

                $transportation->translateOrNew('en')->description = $translator->translate($validated['description'], 'id', 'en');
                $transportation->translateOrNew('en')->facilities = $translator->translate($validated['facilities'] ?? '', 'id', 'en');

                $transportation->save();

                // Hapus gambar lama
                foreach ($transportation->images as $img) {
                    $parsed = parse_url($img->image_url);
                    $path = isset($parsed['path']) ? ltrim($parsed['path'], '/') : null;
                    if ($path) {
                        SupabaseHelper::deleteFile('images', $path);
                    }
                    $img->delete();
                }

                // Tambah gambar baru
                if (!empty($validated['photos'])) {
                    foreach ($validated['photos'] as $url) {
                        ImageTransportation::create([
                            'transportation_id' => $transportation->id,
                            'image_url' => $url,
                        ]);
                    }
                }
            });

            return redirect()
                ->to('/dashboard/transportations')
                ->with('success', 'Data transportasi berhasil diperbarui.');
        } catch (\Exception $e) {
            Log::error('Gagal memperbarui transportasi: ' . $e->getMessage());
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
                $transportation = Transportation::findOrFail($id);

                ImageTransportation::where('transportation_id', $transportation->id)->delete();

                $transportation->delete();
            });

            return redirect()
                ->to('/dashboard/transportations')
                ->with('success', 'Destinasi Desa berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Terjadi kesalahan saat menghapus data. Silakan periksa log.');
        }
    }
}
