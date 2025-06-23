<?php

namespace App\Models;

use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accomodation extends Model
{
    use HasFactory;
    protected $table = 'accomodations';

    use Translatable;

    public $translatedAttributes = ['description', 'facilities',];
    protected $fillable = [
        'id',
        'name',
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
        return $this->hasMany(ImageAccomodation::class, 'accomodation_id');
    }

    public function views()
    {
        return $this->hasMany(DestinationDetailView::class, 'destination_id')
            ->where('type', 'akomodasi');
    }

    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }
}
