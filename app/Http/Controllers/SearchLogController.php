<?php

namespace App\Http\Controllers;

use App\Models\SearchLog;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SearchLogController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'nullable|string|max:50',
        ]);

        $ip = $request->ip();
        $type = $request->type;
        $userAgent = $request->userAgent();

        // Cek apakah IP dan type sudah melakukan log dalam 1 jam terakhir
        $existingLog = SearchLog::where('ip_address', $ip)
            ->where('type', $type)
            ->where('created_at', '>=', Carbon::now()->subHour())
            ->first();

        if ($existingLog) {
            // ✅ Jika request dari Inertia/AJAX, kirim JSON
            if ($request->expectsJson() || $request->header('X-Inertia')) {
                return response()->json(['message' => 'Search already logged recently'], 200);
            }

            // ✅ Jika request biasa (misalnya form submit), redirect dengan message
            return back()->with('info', 'Search already logged recently');
        }

        // Buat log baru
        SearchLog::create([
            'type' => $type,
            'ip_address' => $ip,
            'user_agent' => $userAgent,
        ]);

        if ($request->expectsJson() || $request->header('X-Inertia')) {
            return response()->json(['message' => 'Search log recorded'], 200);
        }

        return back()->with('success', 'Search log recorded.');
    }
}
