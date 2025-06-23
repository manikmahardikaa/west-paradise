<?php

namespace App\Models;

use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TouristDestination extends Model
{
    use HasFactory;

    use Translatable;

    public $translatedAttributes = ['name', 'description', 'facilities'];

    protected $fillable = [
        'id',
        'district',
        'village',
        'address',
        'thumbnail',
        'contact',
        'google_business',
        'latitude',
        'longitude',
        'authority',
        'is_published',
        'type_category',
        'start_time',
        'end_time',
        'is_fullday',
        'category_id',
    ];

    protected $table = 'tourist_destinations';

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }
    public function images()
    {
        return $this->hasMany(ImageTouristDestination::class, 'tourist_destination_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function views()
    {
        return $this->hasMany(DestinationDetailView::class, 'destination_id')
            ->where('type', 'destinasi');
    }

    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }
}
