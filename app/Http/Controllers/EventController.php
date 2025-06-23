<?php

namespace App\Http\Controllers;

use App\Helpers\GeminiTranslator;
use App\Models\Category;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $events = Event::with('category')->get();
        return Inertia::render('dashboard/events/Page', [
            'events' => $events
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $category = Category::where('status', true)->where('type_category', 'Umum')->get();
        return Inertia::render('dashboard/events/create/Page', [
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
    {

        Log::info('request', $request->all());

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|uuid|exists:categories,id',
            'type_category' => 'required|string|max:255',
            'thumbnail' => 'required|string',
            'description' => 'required|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'is_uncertain' => 'boolean',
            'contact' => 'required|string|max:255',
            'authority' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'is_published' => 'boolean',
        ]);

        try {
            $event = new Event([
                'category_id' => $validated['category_id'],
                'type_category' => $validated['type_category'],
                'thumbnail' => $validated['thumbnail'],
                'start_date' => isset($validated['start_date'])
                    ? Carbon::parse($validated['start_date'])->format('Y-m-d')
                    : null,
                'end_date' => isset($validated['end_date'])
                    ? Carbon::parse($validated['end_date'])->format('Y-m-d')
                    : null,
                'is_uncertain' => $validated['is_uncertain'] ?? false,
                'contact' => $validated['contact'],
                'authority' => $validated['authority'],
                'address' => $validated['address'],
                'latitude' => $validated['latitude'],
                'longitude' => $validated['longitude'],
                // 'start_time' => isset($validated['start_time'])
                //     ? Carbon::parse($validated['start_time'])->format('H:i')
                //     : null,
                // 'end_time' => isset($validated['end_time'])
                //     ? Carbon::parse($validated['end_time'])->format('H:i')
                //     : null,
                'start_time' => isset($validated['start_time'])
                    ? date('H:i', strtotime($validated['start_time']))
                    : null,
                'end_time' => isset($validated['end_time'])
                    ? date('H:i', strtotime($validated['end_time']))
                    : null,
                'is_published' => $validated['is_published'] ?? false,
            ]);

            $event->translateOrNew('id')->name = $validated['name'];
            $event->translateOrNew('id')->description = $validated['description'];

            $translator = new GeminiTranslator();
            $event->translateOrNew('en')->name = $translator->translate($validated['name'], 'id', 'en');
            $event->translateOrNew('en')->description = $translator->translate($validated['description'], 'id', 'en');

            $event->save();

            return redirect()
                ->to('/dashboard/events')
                ->with('success', 'Event berhasil ditambahkan.');
        } catch (\Exception $e) {
            Log::error('Error creating event: ' . $e->getMessage());
            return redirect()->back()
                ->withInput()
                ->with('error', 'Terjadi kesalahan saat menyimpan data.');
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
        $event = Event::with('category')->findOrFail($id);
        $category = Category::where('status', true)
            ->where('type_category', 'Umum')
            ->get();
        return Inertia::render('dashboard/events/edit/Page', [
            'event' => $event,
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
        Log::info('update request', $request->all());

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|uuid|exists:categories,id',
            'type_category' => 'required|string|max:255',
            'thumbnail' => 'required|string',
            'description' => 'required|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'is_uncertain' => 'boolean',
            'contact' => 'required|string|max:255',
            'authority' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'is_published' => 'boolean',
        ]);

        try {
            $event = Event::findOrFail($id);
            $event->fill([
                'category_id' => $validated['category_id'],
                'type_category' => $validated['type_category'],
                'thumbnail' => $validated['thumbnail'],
                'start_date' => isset($validated['start_date'])
                    ? Carbon::parse($validated['start_date'])->format('Y-m-d')
                    : null,
                'end_date' => isset($validated['end_date'])
                    ? Carbon::parse($validated['end_date'])->format('Y-m-d')
                    : null,
                'is_uncertain' => $validated['is_uncertain'] ?? false,
                'contact' => $validated['contact'],
                'authority' => $validated['authority'],
                'address' => $validated['address'],
                'latitude' => $validated['latitude'],
                'longitude' => $validated['longitude'],
                'start_time' => isset($validated['start_time'])
                    ? date('H:i', strtotime($validated['start_time']))
                    : null,
                'end_time' => isset($validated['end_time'])
                    ? date('H:i', strtotime($validated['end_time']))
                    : null,
                'is_published' => $validated['is_published'] ?? false,
            ]);

            $event->translateOrNew('id')->name = $validated['name'];
            $event->translateOrNew('id')->description = $validated['description'];

            $translator = new GeminiTranslator();
            $event->translateOrNew('en')->name = $translator->translate($validated['name'], 'id', 'en');
            $event->translateOrNew('en')->description = $translator->translate($validated['description'], 'id', 'en');

            $event->save();

            return redirect()
                ->to('/dashboard/events')
                ->with('success', 'Event berhasil diperbarui.');
        } catch (\Exception $e) {
            Log::error('Error updating event: ' . $e->getMessage());
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
        $event = Event::findOrFail($id);
        $event->delete();
        return redirect()
            ->to('/dashboard/events')
            ->with('success', 'Event berhasil dihapus.');
    }
}
