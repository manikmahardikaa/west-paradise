<?php

namespace App\Models;

use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $table = 'categories';

    use Translatable;

    public $translatedAttributes = ['name_category'];

    protected $fillable = ['id', 'type_category', 'status'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function touristDestination()
    {
        return $this->hasOne(TouristDestination::class, 'category_id');
    }

    public function creativeEconomy()
    {
        return $this->hasOne(CreativeEconomy::class, 'category_id');
    }

    public function event()
    {
        return $this->hasOne(Event::class, 'category_id');
    }
}
