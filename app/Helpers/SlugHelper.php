<?php

namespace App\Helpers;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class SlugHelper
{
    /**
     * Generate unique slug for given model and field
     *
     * @param  string  $title
     * @param  string  $table
     * @param  string  $column
     * @return string
     */
    public static function generateUniqueSlug($title, $table, $column = 'slug', $exceptId = null)
    {
        $baseSlug = Str::slug($title);
        $slug = $baseSlug;
        $count = 1;

        while (
            DB::table($table)
            ->where($column, $slug)
            ->when($exceptId, fn($query) => $query->where('id', '!=', $exceptId))
            ->exists()
        ) {
            $slug = $baseSlug . '-' . $count++;
        }

        return $slug;
    }
}
