<?php

namespace App\Models;

use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HealthFacility extends Model
{
    use HasFactory;
    protected $table = 'healt_facilities';

    use Translatable;

    public $translatedAttributes = ['name', 'description', 'facilities'];
    protected $fillable = [
        'id',
        'location',
        'latitude',
        'longitude',
        'thumbnail',
        'contact',
        'google_business',
        'is_published',
        'start_time',
        'end_time',
        'is_fullday',
        'authority',
        'district',
        'village',
        'address',
        'status',
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
    public function images()
    {
        return $this->hasMany(ImageHealtFacility::class, 'healt_facility_id');
    }

    public function views()
    {
        return $this->hasMany(DestinationDetailView::class, 'destination_id')
            ->where('type', 'fasilitas-kesehatan');
    }

    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }
}
