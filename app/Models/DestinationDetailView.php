<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Restaurant;
use App\Models\TouristDestination;
use App\Models\Accomodation;
use App\Models\Village;
use App\Models\CreativeEconomy;
use App\Models\Transportation;
use App\Models\HealtFacility;

class DestinationDetailView extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'destination_id',
        'ip_address',
        'user_agent',
    ];

    /**
     * Mengembalikan instance model destinasi berdasarkan type dan destination_id.
     * Contoh: $view->destination_model
     */
    public function getDestinationModelAttribute()
    {
        return match ($this->type) {
            'restoran' => Restaurant::find($this->destination_id),
            'destinasi' => TouristDestination::find($this->destination_id),
            'akomodasi' => Accomodation::find($this->destination_id),
            'desa-wisata' => Village::find($this->destination_id),
            'ekonomi-kreatif' => CreativeEconomy::find($this->destination_id),
            'transportasi' => Transportation::find($this->destination_id),
            'fasilitas-kesehatan' => HealtFacility::find($this->destination_id),
            default => null,
        };
    }
}
