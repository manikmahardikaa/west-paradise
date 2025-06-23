<?php

namespace App\Http\Controllers;

use App\Helpers\GeminiTranslator;
use App\Helpers\SupabaseHelper;
use App\Models\Category;
use App\Models\TouristDestination;
use App\Models\ImageTouristDestination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class TouristDestinationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $touristDestinations = TouristDestination::with(['images', 'category'])->get();

        return Inertia::render('dashboard/tourist-destinations/Page', [
            'touristDestinations' => $touristDestinations,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $category = Category::where('status', true)
            ->where('type_category', 'Umum')
            ->get();

        return Inertia::render('dashboard/tourist-destinations/create/Page', [
            'category' => $category,
        ]);
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
            'type_category' => 'required|string',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'is_fullday' => 'nullable|boolean',
            'category_id' => 'required|uuid|exists:categories,id',
            'photos' => 'array',
            'photos.*' => 'string',
        ]);

        try {
            DB::transaction(function () use ($validated) {
                $destination = new TouristDestination([
                    'district' => $validated['district'],
                    'village' => $validated['village'],
                    'address' => $validated['address'],
                    'thumbnail' => $validated['thumbnail'],
                    'contact' => $validated['contact'],
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
                    'type_category' => $validated['type_category'],
                    'category_id' => $validated['category_id'],
                ]);

                $destination->translateOrNew('id')->name = $validated['name'];
                $destination->translateOrNew('id')->description = $validated['description'];
                $destination->translateOrNew('id')->facilities = $validated['facilities'] ?? null;

                // Bahasa Inggris (menggunakan Gemini)
                $translator = new GeminiTranslator();
                $destination->translateOrNew('en')->name = $translator->translate($validated['name'], 'id', 'en');
                $destination->translateOrNew('en')->description = $translator->translate($validated['description'], 'id', 'en');
                $destination->translateOrNew('en')->facilities = $translator->translate($validated['facilities'] ?? '', 'id', 'en');

                $destination->save();


                if (!empty($validated['photos'])) {
                    foreach ($validated['photos'] as $url) {
                        ImageTouristDestination::create([
                            'tourist_destination_id' => $destination->id,
                            'image_url' => $url,
                        ]);
                    }
                }
            });

            return Inertia::location('/dashboard/tourist-destinations');
        } catch (\Exception $e) {
            Log::error('Gagal memperbarui transportasi: ' . $e->getMessage());
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
        $touristDestinations = TouristDestination::with(['images', 'category'])->findOrFail($id);
        $category = Category::where('status', true)
            ->where('type_category', 'Umum')
            ->get();
        return Inertia::render('dashboard/tourist-destinations/edit/Page', [
            'touristDestination' => $touristDestinations,
            'category' => $category,
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
            'authority' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'is_published' => 'boolean',
            'type_category' => 'required|string',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'is_fullday' => 'nullable|boolean',
            'category_id' => 'required|uuid|exists:categories,id',
            'photos' => 'array',
            'photos.*' => 'string',
        ]);

        try {
            Log::debug('Validated data', $validated);
            DB::transaction(function () use ($validated, $id) {
                $destination = TouristDestination::findOrFail($id);

                if ($destination->thumbnail) {
                    $parsed = parse_url($destination->thumbnail);
                    $path = isset($parsed['path']) ? ltrim($parsed['path'], '/') : null;
                    if ($path) {
                        SupabaseHelper::deleteFile('images', $path);
                    }
                }

                $destination->fill([
                    'district' => $validated['district'],
                    'village' => $validated['village'],
                    'address' => $validated['address'],
                    'thumbnail' => $validated['thumbnail'],
                    'contact' => $validated['contact'],
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
                    'type_category' => $validated['type_category'],
                    'category_id' => $validated['category_id'],
                ]);

                $destination->translateOrNew('id')->name = $validated['name'];
                $destination->translateOrNew('id')->description = $validated['description'];
                $destination->translateOrNew('id')->facilities = $validated['facilities'] ?? null;

                // Bahasa Inggris (menggunakan Gemini)
                $translator = new GeminiTranslator();
                $destination->translateOrNew('en')->name = $translator->translate($validated['name'], 'id', 'en');
                $destination->translateOrNew('en')->description = $translator->translate($validated['description'], 'id', 'en');
                $destination->translateOrNew('en')->facilities = $translator->translate($validated['facilities'] ?? '', 'id', 'en');

                $destination->save();

                $destination->images()->delete();
                foreach ($destination->images as $img) {
                    $parsed = parse_url($img->image_url);
                    $path = isset($parsed['path']) ? ltrim($parsed['path'], '/') : null;
                    if ($path) {
                        SupabaseHelper::deleteFile('images', $path);
                    }
                }

                if (!empty($validated['photos'])) {
                    foreach ($validated['photos'] as $url) {
                        ImageTouristDestination::create([
                            'tourist_destination_id' => $destination->id,
                            'image_url' => $url,
                        ]);
                    }
                }
            });

            return redirect()
                ->to('/dashboard/tourist-destinations')
                ->with('success', 'Destinasi Wisata berhasil ditambahkan.');
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
                $destination = TouristDestination::findOrFail($id);

                ImageTouristDestination::where('tourist_destination_id', $destination->id)->delete();

                $destination->delete();
            });

            return redirect()
                ->to('/dashboard/tourist-destinations')
                ->with('success', 'Destinasi Wisata berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Terjadi kesalahan saat menghapus data. Silakan periksa log.');
        }
    }
}
