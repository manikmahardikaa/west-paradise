<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create([
            'id' => Str::uuid(),
            'name_category' => 'Alam',
            'type_category' => 'Umum',

        ], [
            'id' => Str::uuid(),
            'name_category' => 'Buatan',
            'type_category' => 'Ekonomi Kreatif',
        ]);
    }
}
