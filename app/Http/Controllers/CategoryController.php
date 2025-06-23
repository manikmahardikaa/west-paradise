<?php

namespace App\Http\Controllers;

use App\Helpers\GeminiTranslator;
use App\Models\Category;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use \Illuminate\Validation\ValidationException;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::all();

        return Inertia::render('dashboard/categories/Page', [
            'categories' => $categories
        ]);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('dashboard/categories/create/Page');
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
        try {
            $validated = $request->validate([
                'name_category' => 'required|string|max:255',
                'type_category' => 'required|string|max:255',
                'status' => 'nullable|boolean',
            ]);

            $category = new Category([
                'type_category' => $validated['type_category'],
                'status' => $request->has('status') ? 1 : 0,
            ]);

            $category->translateOrNew('id')->name_category = $validated['name_category'];

            $translator = new GeminiTranslator();
            $category->translateOrNew('en')->name_category = $translator->translate($validated['name_category'], 'id', 'en');
            $category->save();

            return redirect()
                ->to('/dashboard/categories')
                ->with('success', 'Kategori berhasil ditambahkan.');
        } catch (Exception $e) {
            Log::error('Gagal menyimpan kategori: ' . $e->getMessage());
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Validasi gagal. Silakan periksa input Anda.');
        } catch (\Exception $e) {
            return redirect()
                ->back()
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
        $category = Category::findOrFail($id);

        return Inertia::render('dashboard/categories/edit/Page', [
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
        try {
            $validated = $request->validate([
                'name_category' => 'required|string|max:255',
                'type_category' => 'required|string|max:255',
                'status' => 'nullable|boolean',
            ]);

            $category = Category::findOrFail($id);
            $category->fill([
                'type_category' => $validated['type_category'],
                'status' => $request->has('status') ? 1 : 0,
            ]);

            $category->translateOrNew('id')->name_category = $validated['name_category'];

            $translator = new GeminiTranslator();
            $category->translateOrNew('en')->name_category = $translator->translate($validated['name_category'], 'id', 'en');
            $category->save();

            return redirect()
                ->to('/dashboard/categories')
                ->with('success', 'Kategori berhasil diperbarui.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()
                ->back()
                ->withErrors($e->validator)
                ->withInput()
                ->with('error', 'Validasi gagal. Silakan periksa input Anda.');
        } catch (\Exception $e) {
            return redirect()
                ->back()
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
            $category = Category::findOrFail($id);
            $category->delete();

            return redirect()
                ->to('/dashboard/categories')
                ->with('success', 'Kategori berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Terjadi kesalahan saat menghapus kategori.');
        }
    }
}
