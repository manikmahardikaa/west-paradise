<?php

namespace App\Http\Controllers;

use App\Helpers\GeminiTranslator;
use App\Helpers\TimeHelper;
use App\Models\Accomodation;
use App\Models\Category;
use App\Models\CreativeEconomy;
use App\Models\DestinationDetailView;
use App\Models\DestinationView;
use App\Models\Event;
use App\Models\HealtFacility;
use App\Models\HealthFacility;
use App\Models\News;
use App\Models\PageView;
use App\Models\Restaurant;
use App\Models\Review;
use App\Models\SearchLocationLog;
use App\Models\Slider;
use App\Models\TouristDestination;
use App\Models\Transportation;
use App\Models\Village;
use App\Services\NearbyService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use Inertia\Inertia;


class HomeController extends Controller
{
    public function homePage()
    {
        $alreadyViewed = PageView::where('page', 'home')
            ->where('ip_address', request()->ip())
            ->where('created_at', '>=', now()->subMinutes(10))
            ->exists();

        if (!$alreadyViewed) {
            PageView::create([
                'page' => 'home',
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);
        }
        $sliders = Slider::where('is_published', 1)->get();
        $touristDestinations = TouristDestination::where('is_published', 1)
            ->with('category')
            ->orderBy('created_at', 'desc')
            ->take(4)
            ->get();
        $restaurants = Restaurant::where('is_published', 1)
            ->orderBy('created_at', 'desc')
            ->take(4)
            ->get();
        $accomodations = Accomodation::where('is_published', 1)
            ->orderBy('created_at', 'desc')
            ->take(4)
            ->get();
        $events = Event::where('is_published', 1)
            ->with('category')
            ->orderBy('created_at', 'desc')
            ->take(4)
            ->get();
        $news = News::where('is_published', 1)
            ->orderBy('created_at', 'desc')
            ->take(4)
            ->get();
        return Inertia::render('home/home-page/Page', [
            'sliders' => $sliders,
            'touristDestinations' => $touristDestinations,
            'restaurants' => $restaurants,
            'accomodations' => $accomodations,
            'events' => $events,
            'news' => $news,
        ]);
    }

    public function about()
    {
        return Inertia::render('home/about/Page');
    }

    public function destination(Request $request)
    {
        $type = $request->query('type', 'destinasi');
        $ip = $request->ip();

        // Cek jika sudah tercatat sebelumnya (misal dalam 1 jam terakhir)
        $alreadyViewed = DestinationView::where('ip_address', $ip)
            ->where('type', $type)
            ->where('created_at', '>=', Carbon::now()->subHour())
            ->exists();

        if (!$alreadyViewed) {
            DestinationView::create([
                'type' => $type,
                'ip_address' => $ip,
                'user_agent' => $request->userAgent(),
            ]);
        }

        $categories = [];
        $districts = [];

        switch ($type) {
            case 'destinasi':
                $data = TouristDestination::with(['views', 'reviews', 'category'])
                    ->where('is_published', 1)
                    ->get();

                $categories = $data
                    ->pluck('category.name_category')
                    ->unique()
                    ->values();

                $districts = $data
                    ->pluck('district')
                    ->unique()
                    ->values();
                break;

            case 'restoran':
                $data = Restaurant::with(['views', 'reviews'])->where('is_published', 1)->get();
                $districts = Restaurant::where('is_published', 1)
                    ->select('district')
                    ->distinct()
                    ->pluck('district');
                break;

            case 'akomodasi':
                $data = Accomodation::with(['views', 'reviews'])->where('is_published', 1)->get();
                $districts = Accomodation::where('is_published', 1)
                    ->select('district')
                    ->distinct()
                    ->pluck('district');
                break;

            case 'desa-wisata':
                $data = Village::with(['views', 'reviews'])->where('is_published', 1)->get();
                $districts = Village::where('is_published', 1)
                    ->select('district')
                    ->distinct()
                    ->pluck('district');
                break;

            case 'ekonomi-kreatif':
                $data = CreativeEconomy::with(['views', 'reviews', 'category'])
                    ->where('is_published', 1)
                    ->get();

                $categories = $data
                    ->pluck('category.name_category')
                    ->unique()
                    ->values();

                $districts = $data
                    ->pluck('district')
                    ->unique()
                    ->values();
                break;

            case 'transportasi':
                $data = Transportation::with(['views', 'reviews'])->where('is_published', 1)->get();
                $districts = Transportation::where('is_published', 1)
                    ->select('district')
                    ->distinct()
                    ->pluck('district');
                break;

            case 'fasilitas-kesehatan':
                $data = HealthFacility::with(['views', 'reviews'])->where('is_published', 1)->get();
                $districts = HealthFacility::where('is_published', 1)
                    ->select('district')
                    ->distinct()
                    ->pluck('district');
                break;

            default:
                $data = collect();
                $categories = collect();
                $districts = collect();
                break;
        }

        return Inertia::render('home/destination/Page', [
            'data' => $data,
            'categories' => $categories,
            'districts' => $districts,
            'type' => $type,
        ]);
    }

    public function event()
    {
        $events = Event::where('is_published', 1)
            ->with('category')
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('home/event/Page', [
            'events' => $events,
        ]);
    }

    public function news()
    {
        $news = News::where('is_published', 1)
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('home/news/Page', [
            'news' => $news
        ]);
    }

    public function mapTour()
    {
        $touristCoordinates = TouristDestination::withTranslation()
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'latitude' => $item->latitude,
                    'longitude' => $item->longitude,
                ];
            });

        $villageCoordinates = Village::withTranslation()
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'latitude' => $item->latitude,
                    'longitude' => $item->longitude,
                ];
            });

        $accomodationCoordinates = Accomodation::select('id', 'name', 'latitude', 'longitude')->get();

        $restaurantCoordinates = Restaurant::select('id', 'name', 'latitude', 'longitude')->get();

        $creativeEconomyCoordinates = CreativeEconomy::select('id', 'name', 'latitude', 'longitude')->get();

        $healthFacilityCoordinates = HealthFacility::withTranslation()
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'latitude' => $item->latitude,
                    'longitude' => $item->longitude,
                ];
            });

        $tranportationCoordinates = Transportation::select('id', 'name', 'latitude', 'longitude')->get();

        return Inertia::render('home/map-tour/Page', [
            'touristCoordinates' => $touristCoordinates,
            'villageCoordinates' => $villageCoordinates,
            'accomodationCoordinates' => $accomodationCoordinates,
            'restaurantCoordinates' => $restaurantCoordinates,
            'creativeEconomyCoordinates' => $creativeEconomyCoordinates,
            'healthFacilityCoordinates' => $healthFacilityCoordinates,
            'tranportationCoordinates' => $tranportationCoordinates,
        ]);
    }

    public function detailDestination(Request $request, NearbyService $nearbyService)
    {

        $type = $request->query('type', 'destinasi');
        $id = $request->query('id');
        $ip = $request->ip();
        $userAgent = $request->userAgent();

        $alreadyLogged = DestinationDetailView::where('type', $type)
            ->where('destination_id', $id)
            ->where('ip_address', $ip)
            ->exists();

        if (!$alreadyLogged) {
            DestinationDetailView::create([
                'type' => $type,
                'destination_id' => $id,
                'ip_address' => $ip,
                'user_agent' => $userAgent,
            ]);
        }

        switch ($type) {
            case 'destinasi':
                $data = TouristDestination::with(['category', 'images'])
                    ->where('is_published', 1)
                    ->findOrFail($id);
                $reviews = Review::where('review_type', 'destinasi')->get();
                break;

            case 'restoran':
                $data = Restaurant::with('images')->where('is_published', 1)->findOrFail($id);
                $reviews = Review::where('review_type', 'restoran')->get();
                break;

            case 'akomodasi':
                $data = Accomodation::with('images')->where('is_published', 1)->findOrFail($id);
                $reviews = Review::where('review_type', 'akomodasi')->get();
                break;

            case 'desa-wisata':
                $data = Village::with('images')->where('is_published', 1)->findOrFail($id);
                $reviews = Review::where('review_type', 'desa-wisata')->get();
                break;

            case 'ekonomi-kreatif':
                $data = CreativeEconomy::with(['category', 'images'])
                    ->where('is_published', 1)
                    ->findOrFail($id);
                $reviews = Review::where('review_type', 'ekonomi-kreatif')->get();
                break;

            case 'transportasi':
                $data = Transportation::with('images')->where('is_published', 1)->findOrFail($id);
                $reviews = Review::where('review_type', 'transportasi')->get();
                break;

            case 'fasilitas-kesehatan':
                $data = HealthFacility::with('images')->where('is_published', 1)->findOrFail($id);
                $reviews = Review::where('review_type', 'fasilitas-kesehatan')->get();
                break;

            default:
                $data = collect();
                break;
        }

        $viewCount = DestinationDetailView::where('type', $type)
            ->where('destination_id', $id)
            ->count();

        if (!empty($data->latitude) && !empty($data->longitude)) {
            $nearby = $nearbyService->getNearbyPlaces($data->latitude, $data->longitude, $type, $data->id);
        }

        return Inertia::render('home/detail-destination/Page', [
            'data' => $data,
            'type' => $type,
            'nearby' => $nearby,
            'reviews' => $reviews->map(
                function ($item) {
                    $item->relative_time = TimeHelper::relativeTimeWithOffset($item->created_at);
                    return $item;
                }
            ),
            'viewCount' => $viewCount,
        ]);
    }


    public function detailNews($slug)
    {
        $data = News::whereTranslation('slug', $slug)
            ->where('is_published', 1)
            ->firstOrFail();
        return Inertia::render('home/detail-news/Page', [
            'data' => $data
        ]);
    }

    public function detailEvent(Request $request)
    {
        $id = $request->query('id');
        $type = $request->query('type');
        $data = Event::where('id', $id)
            ->with('category')
            ->where('is_published', 1)
            ->first();
        $reviews = Review::where('review_type', 'event')->get();
        return Inertia::render('home/detail-event/Page', [
            'data' => $data,
            'type' => $type,
            'reviews' => $reviews
        ]);
    }

    public function review(Request $request)
    {
        $id = $request->query('id');
        $type = $request->query('type');
        $access = $request->query('access');

        switch ($type) {
            case 'destinasi':
                $data = Review::where('review_type', 'destinasi')->get();
                break;

            case 'restoran':
                $data = Review::where('review_type', 'restoran')->get();
                break;

            case 'akomodasi':
                $data = Review::where('review_type', 'akomodasi')->get();
                break;

            case 'desa-wisata':
                $data = Review::where('review_type', 'desa-wisata')->get();
                break;

            case 'ekonomi-kreatif':
                $data = Review::where('review_type', 'ekonomi-kreatif')->get();
                break;

            case 'transportasi':
                $data = Review::where('review_type', 'transportasi')->get();
                break;

            case 'fasilitas-kesehatan':
                $data = Review::where('review_type', 'fasilitas-kesehatan')->get();
                break;

            case 'event':
                $data = Review::where('review_type', 'event')->get();
                break;

            default:
                $data = collect();
                break;
        }
        return Inertia::render('home/review/Page', [
            'id' => $id,
            'type' => $type,
            'reviews' => $data->map(function ($item) {
                $item->relative_time = TimeHelper::relativeTimeWithOffset($item->created_at);
                return $item;
            }),
            'access' => $access
        ]);
    }

    public function createReview(Request $request)
    {
        try {
            $validated = $request->validate([
                'rating' => 'required|numeric|min:1|max:5',
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'review' => 'required|string',
                'review_type' => 'required|string', // misal: destinasi, restoran, akomodasi, desa-wisata, ekonomi-kreatif, transportasi, fasilitas-kesehatan, event
                'reviewable_id' => 'required|uuid',
                'reviewable_type' => 'required|string', // misal: App\Models\Restaurant
            ]);

            $review = new Review([
                'rating' => $validated['rating'],
                'name' => $validated['name'],
                'review_type' => $validated['review_type'],
                'email' => $validated['email'],
            ]);

            $review->reviewable_id = $validated['reviewable_id'];
            $review->reviewable_type = $validated['reviewable_type'];

            $review->translateOrNew('id')->review = $validated['review'];

            $translator = new GeminiTranslator();
            $review->translateOrNew('en')->review = $translator->translate(
                $validated['review'],
                'id',
                'en'
            );

            $review->save();

            return redirect()
                ->back()
                ->with('success', 'Review berhasil dikirim.');
        } catch (\Throwable $e) {
            Log::error('Error creating review: ' . $e->getMessage(), [
                'request_data' => $request->all(),
            ]);

            return redirect()
                ->back()
                ->with('error', 'Gagal mengirim review. Silakan coba lagi.');
        }
    }

    public function searchPage()
    {
        $allData = TouristDestination::where('is_published', 1)
            ->with([
                'category',
                'reviews',
                'views'
            ])
            ->get()
            ->merge(Restaurant::where('is_published', 1)->with(['reviews', 'views'])->get())
            ->merge(Accomodation::where('is_published', 1)->with(['reviews', 'views'])->get())
            ->merge(Village::where('is_published', 1)->with(['reviews', 'views',])->get())
            ->merge(CreativeEconomy::where('is_published', 1)->with(['category', 'reviews', 'views',])->get())
            ->merge(HealthFacility::where('is_published', 1)->with(['reviews', 'views'])->get())
            ->merge(Transportation::where('is_published', 1)->with(['reviews', 'views'])->get())
            ->take(4);
        return Inertia::render('home/search-location/Page', [
            'data' => $allData
        ]);
    }


    public function searchLocation(Request $request)
    {
        $query = $request->input('query');
        $ip = $request->ip();
        $userAgent = $request->userAgent();

        // Cek apakah IP sudah pernah log sebelumnya
        $existingLog = SearchLocationLog::where('ip_address', $ip)->first();

        if (!$existingLog) {
            SearchLocationLog::create([
                'ip_address' => $ip,
                'user_agent' => $userAgent,
            ]);
        }

        if (!$query) {
            return response()->json([
                'message' => 'Query tidak boleh kosong.',
                'data' => []
            ], 400);
        }

        $results = collect();

        $models = [
            ['model' => Accomodation::class, 'with' => ['reviews', 'views']],
            ['model' => Village::class, 'with' => ['reviews', 'views']],
            ['model' => CreativeEconomy::class, 'with' => ['category', 'reviews', 'views']],
            ['model' => HealthFacility::class, 'with' => ['reviews', 'views']],
            ['model' => Transportation::class, 'with' => ['reviews', 'views']],
        ];

        foreach ($models as $entry) {
            $model = $entry['model'];
            $with = $entry['with'];

            $results = $results->merge(
                $model::where('is_published', 1)
                    ->whereHas('translations', function ($q) use ($query) {
                        $q->where('name', 'like', "%$query%");
                    })
                    ->with($with)
                    ->get()
            );
        }

        return response()->json([
            'message' => 'Hasil pencarian.',
            'data' => $results->take(10)->values(), // Ambil maksimal 10 hasil
        ]);
    }
}
