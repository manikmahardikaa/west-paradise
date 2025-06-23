<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Http;

class SupabaseHelper
{
    public static function deleteFile($bucket, $filePath)
    {
        $url = env('VITE_SUPABASE_URL') . "/storage/v1/object/$bucket/$filePath";
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('VITE_SUPABASE_SERVICE_ROLE_KEY'),
        ])->delete($url);

        return $response->successful();
    }
}
