<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DestinationView extends Model
{
    use HasFactory;
    protected $fillable = [
        'type',
        'ip_address',
        'user_agent',
    ];
}
