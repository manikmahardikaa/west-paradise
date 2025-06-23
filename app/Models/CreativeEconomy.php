<?php

namespace App\Models;

use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreativeEconomy extends Model
{
    use HasFactory;
    protected $table = 'creative_economy';

    use Translatable;

    public $translatedAttributes = ['description', 'facilities'];

    protected $fillable = [
        'id',
        'name',
        'location',
        'latitude',
        'longitude',
        'category_id',
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
        'type_category',
        'category_id',
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
        return $this->hasMany(ImageCreativeEconomy::class, 'creative_economy_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    public function views()
    {
        return $this->hasMany(DestinationDetailView::class, 'destination_id')
            ->where('type', 'ekonomi-kreatif');
    }
}
