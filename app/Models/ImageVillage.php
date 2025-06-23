<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageVillage extends Model
{
    use HasFactory;
    protected $table = 'images_villages';
    protected $fillable = [
        'id',
        'image_url',
        'village_id',
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
    public function village()
    {
        return $this->belongsTo(Village::class);
    }
}
