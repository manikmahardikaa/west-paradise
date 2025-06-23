<?php

namespace App\Http\Controllers;

use App\Helpers\GeminiTranslator;
use App\Helpers\SupabaseHelper;
use App\Models\HealtFacility;
use App\Models\HealthFacility;
use App\Models\ImageHealtFacility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class HealtFacilityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $healthFacilities = HealthFacility::with('images')->get();
        return Inertia::render('dashboard/health-facilities/Page', [
            'healthFacilities' => $healthFacilities,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('dashboard/health-facilities/create/Page');
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
                    $healthFacility = new HealthFacility([
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

                    $healthFacility->translateOrNew('id')->name = $validated['name'];
                    $healthFacility->translateOrNew('id')->description = $validated['description'];
                    $healthFacility->translateOrNew('id')->facilities = $validated['facilities'] ?? null;

                    // Bahasa Inggris (menggunakan Gemini)
                    $translator = new GeminiTranslator();
                    $healthFacility->translateOrNew('en')->name = $translator->translate($validated['name'], 'id', 'en');
                    $healthFacility->translateOrNew('en')->description = $translator->translate($validated['description'], 'id', 'en');
                    $healthFacility->translateOrNew('en')->facilities = $translator->translate($validated['facilities'] ?? '', 'id', 'en');

                    $healthFacility->save();



                    if (!empty($validated['photos'])) {
                        foreach ($validated['photos'] as $url) {
                            ImageHealtFacility::create([
                                'healt_facility_id' => $healthFacility->id,
                                'image_url' => $url,
                            ]);
                        }
                    }
                });

                return redirect()
                    ->to('/dashboard/health-facilities')
                    ->with('success', 'Fasilitas Kesehatan berhasil ditambahkan.');
            } catch (\Exception $e) {
                Log::error('Store error:', ['message' => $e->getMessage()]);
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
        $healthFacility = HealthFacility::with('images')->findOrFail($id);
        return Inertia::render('dashboard/health-facilities/edit/Page', [
            'healthFacility' => $healthFacility,
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
        Log::info('Update request data:', $request->all());

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
                $healthFacility = HealthFacility::findOrFail($id);


                if ($healthFacility->thumbnail) {
                    $parsed = parse_url($healthFacility->thumbnail);
                    $path = isset($parsed['path']) ? ltrim($parsed['path'], '/') : null;
                    if ($path) {
                        SupabaseHelper::deleteFile('images', $path);
                    }
                }

                $healthFacility->fill([
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

                $healthFacility->translateOrNew('id')->name = $validated['name'];
                $healthFacility->translateOrNew('id')->description = $validated['description'];
                $healthFacility->translateOrNew('id')->facilities = $validated['facilities'] ?? null;

                // Bahasa Inggris (menggunakan Gemini)
                $translator = new GeminiTranslator();
                $healthFacility->translateOrNew('en')->name = $translator->translate($validated['name'], 'id', 'en');
                $healthFacility->translateOrNew('en')->description = $translator->translate($validated['description'], 'id', 'en');
                $healthFacility->translateOrNew('en')->facilities = $translator->translate($validated['facilities'] ?? '', 'id', 'en');

                $healthFacility->save();


                $healthFacility->images()->delete();
                foreach ($healthFacility->images as $img) {
                    $parsed = parse_url($img->image_url);
                    $path = isset($parsed['path']) ? ltrim($parsed['path'], '/') : null;
                    if ($path) {
                        SupabaseHelper::deleteFile('images', $path);
                    }
                }

                if (!empty($validated['photos'])) {
                    foreach ($validated['photos'] as $url) {
                        ImageHealtFacility::create([
                            'healt_facility_id' => $healthFacility->id,
                            'image_url' => $url,
                        ]);
                    }
                }
            });

            return redirect()
                ->to('/dashboard/health-facilities')
                ->with('success', 'Fasilitas Kesehatan berhasil diperbarui.');
        } catch (\Exception $e) {
            Log::error('Update error:', ['message' => $e->getMessage()]);
            return redirect()->back()
                ->withInput()
                ->with('error', 'Terjadi kesalahan saat memperbarui data.');
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
                $healthFacility = HealthFacility::findOrFail($id);

                ImageHealtFacility::where('healt_facility_id', $healthFacility->id)->delete();

                $healthFacility->delete();
            });

            return redirect()
                ->to('/dashboard/health-facilities')
                ->with('success', 'Restoran berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Terjadi kesalahan saat menghapus data. Silakan periksa log.');
        }
    }
}
