<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class GeminiTranslator
{
    public static function translate($text, $from = 'id', $to = 'en')
    {
        if (empty($text)) return '';

        $prompt = <<<EOT
Terjemahkan teks berikut dari $from ke $to. Jangan terjemahkan nama tempat atau nama perusahaan. 
Berikan hasil langsung tanpa tambahan ```html atau tanda kutip lainnya. Cukup kirim teks terjemahannya saja.

$text
EOT;

        try {
            $apiKey = env('GEMINI_API_KEY');
            $endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={$apiKey}";

            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post($endpoint, [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ]
            ]);

            return $response->json('candidates.0.content.parts.0.text') ?? $text;
        } catch (\Throwable $e) {
            Log::warning('Terjemahan gagal dengan Gemini: ' . $e->getMessage());
            return $text;
        }
    }
}
