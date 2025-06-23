<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageCreativeEconomy extends Model
{
    use HasFactory;
    protected $table = 'images_creative_economy';
    protected $fillable = [
        'id',
        'image_url',
        'creative_economy_id',
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
    public function creativeEconomy()
    {
        return $this->belongsTo(CreativeEconomy::class);
    }
}
