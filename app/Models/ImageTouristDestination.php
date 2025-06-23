<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ImageTouristDestination extends Model
{
    use HasFactory;

    protected $table = 'images_tourist_destinations';

    protected $fillable = [
        'id',
        'image_url',
        'tourist_destination_id',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = (string) Str::uuid();
        });
    }

    public function touristDestination()
    {
        return $this->belongsTo(TouristDestination::class);
    }
}
