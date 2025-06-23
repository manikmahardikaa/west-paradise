<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HealthFacilityTranslation extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'health_facilities_translations';

    protected $fillable = ['name', 'description', 'facilities'];
}
