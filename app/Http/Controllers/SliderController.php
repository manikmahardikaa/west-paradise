<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SliderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sliders = Slider::all();
        return Inertia::render('dashboard/sliders/Page', [
            'sliders' => $sliders
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('dashboard/sliders/create/Page');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image_url' => 'required|string',
            'is_published' => 'boolean',
        ]);

        Slider::create([
            'image_url' => $validated['image_url'],
            'is_published' => $validated['is_published'] ?? false,
        ]);

        return redirect()
            ->to('/dashboard/sliders')
            ->with('success', 'Slider berhasil ditambahkan.');
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
        $slider = Slider::findOrFail($id);
        return Inertia::render('dashboard/sliders/edit/Page', [
            'slider' => $slider
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
            'image_url' => 'required|string',
            'is_published' => 'boolean',
        ]);

        $slider = Slider::findOrFail($id);
        $slider->update([
            'image_url' => $validated['image_url'],
            'is_published' => $validated['is_published'] ?? false,
        ]);

        return redirect()
            ->to('/dashboard/sliders')
            ->with('success', 'Slider berhasil ditambahkan.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $slider = Slider::findOrFail($id);
        $slider->delete();

        return redirect()
            ->to('/dashboard/sliders')
            ->with('success', 'Ekonomi Kreatif berhasil ditambahkan.');
    }
}
