<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SearchLog extends Model
{
    use HasFactory;
    protected $fillable = [
        'page',
        'ip_address',
        'user_agent',
        'type',
    ];
}
