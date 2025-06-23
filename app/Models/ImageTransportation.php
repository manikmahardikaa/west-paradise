<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageTransportation extends Model
{
    use HasFactory;
    protected $table = 'images_transportations';
    protected $fillable = [
        'id',
        'image_url',
        'transportation_id',
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
    public function transportation()
    {
        return $this->belongsTo(Transportation::class);
    }
}
