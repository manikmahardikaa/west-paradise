<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportationTranslation extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['description', 'facilities'];
}
