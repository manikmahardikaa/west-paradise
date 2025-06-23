<?php

namespace App\Models;

use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $table = 'reviews';

    use Translatable;

    public $translatedAttributes = ['review'];

    protected $fillable = [
        'rating',
        'name',
        'email',
        'review_type',
        'reviewable_id',
        'reviewable_type',
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

    public function reviewable()
    {
        return $this->morphTo();
    }
}
