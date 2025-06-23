<?php

namespace App\Http\Controllers;

use App\Helpers\GeminiTranslator;
use App\Helpers\SupabaseHelper;
use App\Models\Category;
use App\Models\CreativeEconomy;
use App\Models\ImageCreativeEconomy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;


class CreativeEconomyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $creativeEconomy = CreativeEconomy::with('images')->get();
        return Inertia::render('dashboard/creative-economy/Page', [
            'creativeEconomy' => $creativeEconomy
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
            ->where('type_category', 'Ekonomi Kreatif')
            ->get();
        return Inertia::render('dashboard/creative-economy/create/Page', [
            'category' => $category
        ]);
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
                'category_id' => 'required|exists:categories,id',
                'type_category' => 'required|string|max:255',
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
                    $creativeEconomy = new CreativeEconomy([
                        'name' => $validated['name'],
                        'district' => $validated['district'],
                        'village' => $validated['village'],
                        'address' => $validated['address'],
                        'thumbnail' => $validated['thumbnail'],
                        'category_id' => $validated['category_id'],
                        'type_category' => $validated['type_category'],
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
                    ]);

                    $creativeEconomy->description = $validated['description'];
                    $creativeEconomy->facilities = $validated['facilities'] ?? null;

                    $translator = new GeminiTranslator();
                    $creativeEconomy->translateOrNew('en')->description = $translator->translate($validated['description'], 'id', 'en');
                    $creativeEconomy->translateOrNew('en')->facilities = $translator->translate($validated['facilities'] ?? '', 'id', 'en');
                    $creativeEconomy->save();

                    if (!empty($validated['photos'])) {
                        foreach ($validated['photos'] as $url) {
                            ImageCreativeEconomy::create([
                                'creative_economy_id' => $creativeEconomy->id,
                                'image_url' => $url,
                            ]);
                        }
                    }
                });

                return redirect()
                    ->to('/dashboard/creative-economy')
                    ->with('success', 'Ekonomi Kreatif berhasil ditambahkan.');
            } catch (\Exception $e) {
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
        $creativeEconomy = CreativeEconomy::with(['category', 'images'])->findOrFail($id);
        $category = Category::where('status', true)
            ->where('type_category', 'Ekonomi Kreatif')
            ->get();
        return Inertia::render('dashboard/creative-economy/edit/Page', [
            'creativeEconomy' => $creativeEconomy,
            'category' => $category
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
            'category_id' => 'required|exists:categories,id',
            'type_category' => 'required|string|max:255',
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
            ''
        ]);

        try {
            DB::transaction(function () use ($validated, $id) {
                $creativeEconomy = CreativeEconomy::findOrFail($id);


                if ($creativeEconomy->thumbnail) {
                    $parsed = parse_url($creativeEconomy->thumbnail);
                    $path = isset($parsed['path']) ? ltrim($parsed['path'], '/') : null;
                    if ($path) {
                        SupabaseHelper::deleteFile('images', $path);
                    }
                }

                $creativeEconomy->fill([
                    'name' => $validated['name'],
                    'district' => $validated['district'],
                    'village' => $validated['village'],
                    'address' => $validated['address'],
                    'thumbnail' => $validated['thumbnail'],
                    'category_id' => $validated['category_id'],
                    'type_category' => $validated['type_category'],
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
                ]);

                $creativeEconomy->description = $validated['description'];
                $creativeEconomy->facilities = $validated['facilities'] ?? null;

                $translator = new GeminiTranslator();
                $creativeEconomy->translateOrNew('en')->description = $translator->translate($validated['description'], 'id', 'en');
                $creativeEconomy->translateOrNew('en')->facilities = $translator->translate($validated['facilities'] ?? '', 'id', 'en');
                $creativeEconomy->save();

                $creativeEconomy->images()->delete();
                foreach ($creativeEconomy->images as $img) {
                    $parsed = parse_url($img->image_url);
                    $path = isset($parsed['path']) ? ltrim($parsed['path'], '/') : null;
                    if ($path) {
                        SupabaseHelper::deleteFile('images', $path);
                    }
                }

                if (!empty($validated['photos'])) {
                    foreach ($validated['photos'] as $url) {
                        ImageCreativeEconomy::create([
                            'creative_economy_id' => $creativeEconomy->id,
                            'image_url' => $url,
                        ]);
                    }
                }
            });

            return redirect()
                ->to('/dashboard/creative-economy')
                ->with('success', 'Data restoran berhasil diperbarui.');
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
                $creativeEconomy = CreativeEconomy::findOrFail($id);

                ImageCreativeEconomy::where('creative_economy_id', $creativeEconomy->id)->delete();

                $creativeEconomy->delete();
            });

            return redirect()
                ->to('/dashboard/creative-economy')
                ->with('success', 'Restoran berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Terjadi kesalahan saat menghapus data. Silakan periksa log.');
        }
    }
}
