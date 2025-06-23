<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Http;

class DeepSeekTranslator
{

    public function translate(string $text, string $from = 'id', string $to = 'en'): string
    {
        $apiKey = env('DEEP_SEEK_API_KEY');
        $baseUrl = "https://api.deepseek.com";
        if (empty($text)) return '';

        $prompt = "Terjemahkan teks berikut dari $from ke $to. " .
            "Jika teks mengandung nama tempat, perusahaan, atau nama orang, JANGAN diterjemahkan. " .
            "Hanya balas dengan hasil terjemahan tanpa penjelasan tambahan:\n\n\"$text\"";

        $response = Http::withHeaders([
            'Authorization' => "Bearer {$apiKey}",
            'Content-Type' => 'application/json',
        ])->post("{$baseUrl}/v1/chat/completions", [
            'model' => 'deepseek-reasoner',
            'stream' => false,
            'messages' => [
                ['role' => 'system', 'content' => 'You are a professional translator.'],
                ['role' => 'user', 'content' => $prompt],
            ],
        ]);

        if ($response->successful()) {
            return $response->json('choices.0.message.content') ?? $text;
        }

        logger()->error('DeepSeek Translate Error', ['response' => $response->body()]);
        return $text; // fallback
    }
}
