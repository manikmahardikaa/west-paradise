<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'id' => Str::uuid(),
            'no_identity' => '123456789',
            'name' => 'manik',
            'email' => 'manik@gmail.com',
            'password' => Hash::make('123456789'),
            'is_active' => true
        ]);
    }
}
