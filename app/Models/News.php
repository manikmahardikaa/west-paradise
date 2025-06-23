<?php

namespace App\Models;

use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $table = 'news';

    use Translatable;

    public $translatedAttributes = ['title', 'slug', 'description'];
    protected $fillable = [
        'id',
        'thumbnail',
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
}
