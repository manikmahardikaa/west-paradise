<?php

namespace App\Models;

use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Village extends Model
{
    use HasFactory;
    protected $table = 'villages';

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
        return $this->hasMany(ImageVillage::class, 'village_id');
    }

    public function views()
    {
        return $this->hasMany(DestinationDetailView::class, 'destination_id')
            ->where('type', 'desa-wisata');
    }

    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }
}
