<?php

namespace App\Models;

use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $table = 'events';

    use Translatable;

    public $translatedAttributes = ['name', 'description',];

    protected $fillable = [
        'category_id',
        'type_category',
        'thumbnail',
        'start_date',
        'end_date',
        'is_uncertain',
        'contact',
        'authority',
        'address',
        'latitude',
        'longitude',
        'start_time',
        'end_time',
        'is_published',
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

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }
}
