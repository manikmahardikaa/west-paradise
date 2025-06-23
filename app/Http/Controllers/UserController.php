<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return Inertia::render('dashboard/user/Page', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('dashboard/user/create/Page');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {

            $validated = $request->validate([
                'no_identity' => 'required',
                'name' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
                'is_active' => 'required',
            ]);

            User::create([
                'no_identity' => $validated['no_identity'],
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => bcrypt($validated['password']),
                'is_active' => $validated['is_active']
            ]);

            return redirect()
                ->to('/dashboard/accounts')
                ->with('success', 'Akun berhasil ditambahkan.');
        } catch (\Throwable $e) {
            Log::error('Error creating user: ' . $e->getMessage(), [
                'request' => $request->all(),
            ]);

            return redirect()
                ->back()
                ->with('error', 'Terjadi kesalahan saat membuat akun.');
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
        $user = User::findOrFail($id);
        return Inertia::render('dashboard/user/edit/Page', [
            'user' => $user,
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
                'no_identity' => 'required',
                'name' => 'required',
                'email' => 'required|email|unique:users,email,' . $id,
                'password' => 'nullable|min:6',
                'is_active' => 'required|boolean',
            ]);

            $user = User::findOrFail($id);

            $user->no_identity = $validated['no_identity'];
            $user->name = $validated['name'];
            $user->email = $validated['email'];
            $user->is_active = $validated['is_active'];

            if (!empty($validated['password'])) {
                $user->password = bcrypt($validated['password']);
            }

            $user->save();

            return redirect()
                ->to('/dashboard/accounts')
                ->with('success', 'Akun berhasil diperbarui.');
        } catch (\Throwable $e) {
            Log::error('Error updating user: ' . $e->getMessage(), [
                'request' => $request->all(),
            ]);

            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Terjadi kesalahan saat memperbarui akun.');
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
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()
            ->to('/dashboard/accounts')
            ->with('success', 'Akun berhasil dihapus.');
    }
}
