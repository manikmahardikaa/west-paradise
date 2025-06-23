<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageAccomodation extends Model
{
    use HasFactory;
    protected $table = 'images_accomodations';
    protected $fillable = [
        'id',
        'image_url',
        'accomodation_id',
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
    public function accomodation()
    {
        return $this->belongsTo(Accomodation::class);
    }
}
