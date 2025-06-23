<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        // Ambil user berdasarkan email
        $user = User::where('email', $credentials['email'])->first();

        if ($user) {
            // Cek apakah user aktif
            if (!$user->is_active) {
                return Inertia::render('Login', [
                    'errors' => [
                        'email' => 'Akun Anda belum aktif.',
                    ],
                ]);
            }

            // Lakukan login jika is_active true
            if (Auth::attempt($credentials)) {
                $request->session()->regenerate();
                return redirect('/dashboard/home')->with('success', 'Berhasil login.');
            }
        }

        return Inertia::render('Login', [
            'errors' => [
                'email' => 'Email atau password salah.',
            ],
        ]);
    }
}
