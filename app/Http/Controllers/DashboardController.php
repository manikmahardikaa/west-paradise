<?php

namespace App\Http\Controllers;

use App\Models\DestinationView;
use App\Models\PageView;
use App\Models\SearchLocationLog;
use App\Models\SearchLog;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $year = $request->query('year', date('Y'));
        $monthName = $request->query('month', date('F'));

        // Mapping nama bulan Indonesia ke Inggris
        $monthTranslations = [
            'Januari' => 'January',
            'Februari' => 'February',
            'Maret' => 'March',
            'April' => 'April',
            'Mei' => 'May',
            'Juni' => 'June',
            'Juli' => 'July',
            'Agustus' => 'August',
            'September' => 'September',
            'Oktober' => 'October',
            'November' => 'November',
            'Desember' => 'December',
        ];

        $monthEnglish = $monthTranslations[$monthName] ?? date('F');
        $monthNumber = date('m', strtotime($monthEnglish));

        // Log Debug

        $startDate = Carbon::createFromDate($year, $monthNumber, 1)->startOfMonth();
        $endDate = $startDate->copy()->endOfMonth();

        $homeView = PageView::where('page', 'home')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->count();

        $destinationView = DestinationView::whereBetween('created_at', [$startDate, $endDate])->count();

        $searchLogDestination = SearchLog::whereBetween('created_at', [$startDate, $endDate])->count();
        $searchLogLocation = SearchLocationLog::whereBetween('created_at', [$startDate, $endDate])->count();


        $allTypes = [
            'destinasi',
            'desa-wisata',
            'restoran',
            'ekonomi-kreatif',
            'akomodasi',
            'transportasi',
            'fasilitas-kesehatan',
        ];

        $existingCounts = DestinationView::select('type', DB::raw('count(*) as total'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('type')
            ->pluck('total', 'type') // hasil: ['destinasi' => 1, ...]
            ->toArray();

        // Gabungkan dengan semua type (yang tidak ada jadi 0)
        $searchLogDestinationPerType = [];
        foreach ($allTypes as $type) {
            $searchLogDestinationPerType[$type] = $existingCounts[$type] ?? 0;
        }

        return Inertia::render('dashboard/home/Page', [
            'homeView' => $homeView,
            'destinationView' => $destinationView,
            'searchLogDestination' => $searchLogDestination,
            'searchLogLocation' => $searchLogLocation,
            'searchLogDestinatioPerType' => $searchLogDestinationPerType,
            'year' => $year,
            'month' => $monthName,
        ]);
    }
}
