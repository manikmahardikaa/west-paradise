<?php

namespace App\Http\Controllers;

use App\Helpers\GeminiTranslator;
use App\Helpers\SlugHelper;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $news = News::all();
        return Inertia::render('dashboard/news/Page', [
            'news' => $news
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('dashboard/news/create/Page');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    public function store(Request $request)
    {
        Log::info('Request: ', $request->all());

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'thumbnail' => 'required|string',
            'is_published' => 'boolean',
        ]);

        try {
            DB::transaction(function () use ($validated) {
                $translator = new GeminiTranslator();

                // Translate title and description
                $translatedTitle = $translator->translate($validated['title'], 'id', 'en');
                $translatedDescription = $translator->translate($validated['description'], 'id', 'en');

                // Generate slugs for each language
                $slugId = SlugHelper::generateUniqueSlug($validated['title'], 'news_translations', 'slug');
                $slugEn = SlugHelper::generateUniqueSlug($translatedTitle, 'news_translations', 'slug');

                // Save base News
                $news = new News([
                    'thumbnail' => $validated['thumbnail'],
                    'is_published' => $validated['is_published'] ?? false,
                ]);
                $news->save();

                // Translation: ID
                $news->translateOrNew('id')->title = $validated['title'];
                $news->translateOrNew('id')->slug = $slugId;
                $news->translateOrNew('id')->description = $validated['description'];

                // Translation: EN
                $news->translateOrNew('en')->title = $translatedTitle;
                $news->translateOrNew('en')->slug = $slugEn;
                $news->translateOrNew('en')->description = $translatedDescription;

                $news->save();
            });

            return redirect()
                ->to('/dashboard/news')
                ->with('success', 'Berita berhasil ditambahkan.');
        } catch (\Exception $e) {
            Log::error('Error creating news: ' . $e->getMessage());
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
        $news = News::findOrFail($id);
        return Inertia::render('dashboard/news/edit/Page', [
            'news' => $news
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
        Log::info('Update Request: ', $request->all());

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'thumbnail' => 'required|string',
            'is_published' => 'boolean',
        ]);

        try {
            DB::transaction(function () use ($validated, $id) {
                $news = News::findOrFail($id);
                $translator = new GeminiTranslator();

                // Translate to English
                $translatedTitle = $translator->translate($validated['title'], 'id', 'en');
                $translatedDescription = $translator->translate($validated['description'], 'id', 'en');

                // Generate new slugs
                $slugId = SlugHelper::generateUniqueSlug($validated['title'], 'news_translations', 'slug', $news->id);
                $slugEn = SlugHelper::generateUniqueSlug($translatedTitle, 'news_translations', 'slug', $news->id);

                // Update main news
                $news->update([
                    'thumbnail' => $validated['thumbnail'],
                    'is_published' => $validated['is_published'] ?? false,
                ]);

                // Update translations
                $news->translateOrNew('id')->title = $validated['title'];
                $news->translateOrNew('id')->description = $validated['description'];
                $news->translateOrNew('id')->slug = $slugId;

                $news->translateOrNew('en')->title = $translatedTitle;
                $news->translateOrNew('en')->description = $translatedDescription;
                $news->translateOrNew('en')->slug = $slugEn;

                $news->save();
            });

            return redirect()
                ->to('/dashboard/news')
                ->with('success', 'Berita berhasil diperbarui.');
        } catch (\Exception $e) {
            Log::error('Error updating news: ' . $e->getMessage());
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
            $news = News::findOrFail($id);
            $news->delete();

            return redirect()
                ->to('/dashboard/news')
                ->with('success', 'Berita berhasil dihapus.');
        } catch (\Exception $e) {
            Log::error('Error deleting news: ' . $e->getMessage());
            return redirect()->back()
                ->with('error', 'Terjadi kesalahan saat menghapus data. Silakan periksa log.');
        }
    }
}
