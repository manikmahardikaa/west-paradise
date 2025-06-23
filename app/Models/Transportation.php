<?php

namespace App\Models;

use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transportation extends Model
{
    use HasFactory;
    protected $table = 'transportations';

    use Translatable;

    public $translatedAttributes = ['description', 'facilities'];

    protected $fillable = [
        'id',
        'name',
        'thumbnail',
        'contact',
        'google_business',
        'latitude',
        'longitude',
        'address',
        'district',
        'village',
        'authority',
        'is_published',
        'type_category',
        'start_time',
        'end_time',
        'is_fullday',
    ];
    protected $keyType = 'string';
    public $incrementing = false;
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) \Illuminate\Support\Str::uuid();
            }
        });
    }
    public function images()
    {
        return $this->hasMany(ImageTransportation::class, 'transportation_id');
    }

    public function views()
    {
        return $this->hasMany(DestinationDetailView::class, 'destination_id')
            ->where('type', 'transportasi');
    }

    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }
}
