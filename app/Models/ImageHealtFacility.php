<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageHealtFacility extends Model
{
    use HasFactory;
    protected $table = 'images_healt_facilities';
    protected $fillable = [
        'id',
        'image_url',
        'healt_facility_id',
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
    public function healthFacility()
    {
        return $this->belongsTo(HealtFacility::class, 'healt_facility_id');
    }
}
