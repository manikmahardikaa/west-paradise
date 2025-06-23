<?php

namespace App\Services;

use App\Models\TouristDestination;
use App\Models\Restaurant;
use App\Models\Accomodation;
use App\Models\Village;
use App\Models\CreativeEconomy;
use App\Models\Transportation;
use App\Models\HealtFacility;
use App\Models\HealthFacility;
use Illuminate\Support\Facades\DB;

class NearbyService
{
    public function getNearbyPlaces($latitude, $longitude, $excludeType, $excludeId)
    {
        $results = collect();

        $models = [
            'destinasi' => [TouristDestination::class, true],
            'restoran' => [Restaurant::class, false],
            'akomodasi' => [Accomodation::class, false],
            'desa-wisata' => [Village::class, false],
            'ekonomi-kreatif' => [CreativeEconomy::class, true],
            'transportasi' => [Transportation::class, false],
            'fasilitas-kesehatan' => [HealthFacility::class, false],
        ];

        foreach ($models as $type => [$model, $hasCategory]) {
            $query = $model::query();

            if ($hasCategory) {
                $query->with('category');
            }

            $query->select('*', DB::raw("(
                6371 * acos(
                    cos(radians($latitude)) *
                    cos(radians(latitude)) *
                    cos(radians(longitude) - radians($longitude)) +
                    sin(radians($latitude)) *
                    sin(radians(latitude))
                )
            ) AS distance"))
                ->where('is_published', 1);

            if ($type === $excludeType) {
                $query->where('id', '!=', $excludeId);
            }

            $items = $query->get()->map(function ($item) use ($type) {
                $item->setAttribute('type', $type);
                return $item;
            });

            $results = $results->concat($items);
        }

        return $results->sortBy('distance')->take(4)->values();
    }
}
