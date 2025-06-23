<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageRestaurant extends Model
{
    use HasFactory;
    protected $table = 'images_restaurants';
    protected $fillable = [
        'id',
        'image_url',
        'restaurant_id',
    ];
    protected $keyType = 'string';
    public $incrementing = false;
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = (string) \Illuminate\Support\Str::uuid();
        });
    }
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
