<?php

use App\Http\Controllers\AccomodationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CreativeEconomyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\HealtFacilityController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SearchLogController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\TouristDestinationController;
use App\Http\Controllers\TransportationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VillageController;
use App\Models\Review;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/dashboard', function () {
    return Inertia::render('dashboard/Layout', [
        'success' => session('success')
    ]);
})->middleware('auth');

Route::post('/log-search', [SearchLogController::class, 'store']);

Route::get('/dashboard/home', [DashboardController::class, 'index'])->middleware('auth');

Route::get('/dashboard/reviews', [ReviewController::class, 'index'])->middleware('auth');
Route::delete('/dashboard/reviews/{id}', [ReviewController::class, 'destroy'])->middleware('auth');

Route::get('/dashboard/accounts', [UserController::class, 'index'])->middleware('auth');
Route::get('/dashboard/accounts/create', [UserController::class, 'create'])->middleware('auth');
Route::post('/dashboard/accounts', [UserController::class, 'store'])->middleware('auth');
Route::get('/dashboard/accounts/{id}/edit', [UserController::class, 'edit'])->middleware('auth');
Route::put('/dashboard/accounts/{id}', [UserController::class, 'update'])->middleware('auth');
Route::get('/dashboard/accounts/{id}', [UserController::class, 'show'])->middleware('auth');
Route::delete('/dashboard/accounts/{id}', [UserController::class, 'destroy'])->middleware('auth');

Route::get('/dashboard/sliders', [SliderController::class, 'index'])->middleware('auth');
Route::get('/dashboard/sliders/create', [SliderController::class, 'create'])->middleware('auth');
Route::post('/dashboard/sliders', [SliderController::class, 'store'])->middleware('auth');
Route::get('/dashboard/sliders/{id}/edit', [SliderController::class, 'edit'])->middleware('auth');
Route::put('/dashboard/sliders/{id}', [SliderController::class, 'update'])->middleware('auth');
Route::get('/dashboard/sliders/{id}', [SliderController::class, 'show'])->middleware('auth');
Route::delete('/dashboard/sliders/{id}', [SliderController::class, 'destroy'])->middleware('auth');

Route::get('/dashboard/events', [EventController::class, 'index'])->middleware('auth');
Route::get('/dashboard/events/create', [EventController::class, 'create'])->middleware('auth');
Route::post('/dashboard/events', [EventController::class, 'store'])->middleware('auth');
Route::get('/dashboard/events/{id}/edit', [EventController::class, 'edit'])->middleware('auth');
Route::put('/dashboard/events/{id}', [EventController::class, 'update'])->middleware('auth');
Route::get('/dashboard/events/{id}', [EventController::class, 'show'])->middleware('auth');
Route::delete('/dashboard/events/{id}', [EventController::class, 'destroy'])->middleware('auth');

Route::get('/dashboard/news', [NewsController::class, 'index'])->middleware('auth');
Route::get('/dashboard/news/create', [NewsController::class, 'create'])->middleware('auth');
Route::post('/dashboard/news', [NewsController::class, 'store'])->middleware('auth');
Route::get('/dashboard/news/{id}/edit', [NewsController::class, 'edit'])->middleware('auth');
Route::put('/dashboard/news/{id}', [NewsController::class, 'update'])->middleware('auth');
Route::get('/dashboard/news/{id}', [NewsController::class, 'show'])->middleware('auth');
Route::delete('/dashboard/news/{id}', [NewsController::class, 'destroy'])->middleware('auth');

Route::get('/dashboard/health-facilities', [HealtFacilityController::class, 'index'])->middleware('auth');
Route::get('/dashboard/health-facilities/create', [HealtFacilityController::class, 'create'])->middleware('auth');
Route::post('/dashboard/health-facilities', [HealtFacilityController::class, 'store'])->middleware('auth');
Route::get('/dashboard/health-facilities/{id}/edit', [HealtFacilityController::class, 'edit'])->middleware('auth');
Route::put('/dashboard/health-facilities/{id}', [HealtFacilityController::class, 'update'])->middleware('auth');
Route::get('/dashboard/health-facilities/{id}', [HealtFacilityController::class, 'show'])->middleware('auth');
Route::delete('/dashboard/health-facilities/{id}', [HealtFacilityController::class, 'destroy'])->middleware('auth');

Route::get('/dashboard/transportations', [TransportationController::class, 'index'])->middleware('auth');
Route::get('/dashboard/transportations/create', [TransportationController::class, 'create'])->middleware('auth');
Route::post('/dashboard/transportations', [TransportationController::class, 'store'])->middleware('auth');
Route::get('/dashboard/transportations/{id}/edit', [TransportationController::class, 'edit'])->middleware('auth');
Route::put('/dashboard/transportations/{id}', [TransportationController::class, 'update'])->middleware('auth');
Route::get('/dashboard/transportations/{id}', [TransportationController::class, 'show'])->middleware('auth');
Route::delete('/dashboard/transportations/{id}', [TransportationController::class, 'destroy'])->middleware('auth');

Route::get('/dashboard/accommodations', [AccomodationController::class, 'index'])->middleware('auth');
Route::get('/dashboard/accommodations/create', [AccomodationController::class, 'create'])->middleware('auth');
Route::post('/dashboard/accommodations', [AccomodationController::class, 'store'])->middleware('auth');
Route::get('/dashboard/accommodations/{id}/edit', [AccomodationController::class, 'edit'])->middleware('auth');
Route::put('/dashboard/accommodations/{id}', [AccomodationController::class, 'update'])->middleware('auth');
Route::get('/dashboard/accommodations/{id}', [AccomodationController::class, 'show'])->middleware('auth');
Route::delete('/dashboard/accommodations/{id}', [AccomodationController::class, 'destroy'])->middleware('auth');

Route::get('/dashboard/creative-economy', [CreativeEconomyController::class, 'index'])->middleware('auth');
Route::get('/dashboard/creative-economy/create', [CreativeEconomyController::class, 'create'])->middleware('auth');
Route::post('/dashboard/creative-economy', [CreativeEconomyController::class, 'store'])->middleware('auth');
Route::get('/dashboard/creative-economy/{id}/edit', [CreativeEconomyController::class, 'edit'])->middleware('auth');
Route::put('/dashboard/creative-economy/{id}', [CreativeEconomyController::class, 'update'])->middleware('auth');
Route::get('/dashboard/creative-economy/{id}', [CreativeEconomyController::class, 'show'])->middleware('auth');
Route::delete('/dashboard/creative-economy/{id}', [CreativeEconomyController::class, 'destroy'])->middleware('auth');

Route::get('/dashboard/restaurants', [RestaurantController::class, 'index'])->middleware('auth');
Route::get('/dashboard/restaurants/create', [RestaurantController::class, 'create'])->middleware('auth');
Route::post('/dashboard/restaurants', [RestaurantController::class, 'store'])->middleware('auth');
Route::get('/dashboard/restaurants/{id}/edit', [RestaurantController::class, 'edit'])->middleware('auth');
Route::put('/dashboard/restaurants/{id}', [RestaurantController::class, 'update'])->middleware('auth');
Route::get('/dashboard/restaurants/{id}', [RestaurantController::class, 'show'])->middleware('auth');
Route::delete('/dashboard/restaurants/{id}', [RestaurantController::class, 'destroy'])->middleware('auth');


Route::get('/dashboard/villages', [VillageController::class, 'index'])->middleware('auth');
Route::get('/dashboard/villages/create', [VillageController::class, 'create'])->middleware('auth');
Route::post('/dashboard/villages', [VillageController::class, 'store'])->middleware('auth');
Route::get('/dashboard/villages/{id}/edit', [VillageController::class, 'edit'])->middleware('auth');
Route::put('/dashboard/villages/{id}', [VillageController::class, 'update'])->middleware('auth');
Route::get('/dashboard/villages/{id}', [VillageController::class, 'show'])->middleware('auth');
Route::delete('/dashboard/villages/{id}', [VillageController::class, 'destroy'])->middleware('auth');


Route::get('/dashboard/tourist-destinations', [TouristDestinationController::class, 'index'])->middleware('auth');
Route::get('/dashboard/tourist-destinations/create', [TouristDestinationController::class, 'create'])->middleware('auth');
Route::post('/dashboard/tourist-destinations', [TouristDestinationController::class, 'store'])->middleware('auth');
Route::get('/dashboard/tourist-destinations/{id}/edit', [TouristDestinationController::class, 'edit'])->middleware('auth');
Route::put('/dashboard/tourist-destinations/{id}', [TouristDestinationController::class, 'update'])->middleware('auth');
Route::delete('/dashboard/tourist-destinations/{id}', [TouristDestinationController::class, 'destroy'])->middleware('auth');

Route::get('/dashboard/categories', [CategoryController::class, 'index'])->middleware('auth');
Route::get('/dashboard/categories/create', [CategoryController::class, 'create'])->middleware('auth');
Route::post('/dashboard/categories', [CategoryController::class, 'store'])->middleware('auth');
Route::get('/dashboard/categories/{id}/edit', [CategoryController::class, 'edit'])->middleware('auth');
Route::put('/dashboard/categories/{id}', [CategoryController::class, 'update'])->middleware('auth');
Route::delete('/dashboard/categories/{id}', [CategoryController::class, 'destroy'])->middleware('auth');

Route::get('/', [HomeController::class, 'homePage']);
Route::get('/about', [HomeController::class, 'about']);
Route::get('/destination', [HomeController::class, 'destination']);
Route::get('/event', [HomeController::class, 'event']);
Route::get('/news', [HomeController::class, 'news']);
Route::get('/map-tour', [HomeController::class, 'mapTour']);
Route::get('/detail-destination', [HomeController::class, 'detailDestination']);
Route::get('/detail-news/{slug}', [HomeController::class, 'detailNews']);
Route::get('/review', [HomeController::class, 'review']);
Route::post('/review', [HomeController::class, 'createReview']);
Route::get('/detail-event', [HomeController::class, 'detailEvent']);
Route::get('/search-location', [HomeController::class, 'searchPage']);
Route::get('/search', [HomeController::class, 'searchLocation'])->name('search');

Route::get('/admin', function () {
    return Inertia::render('Login');
})->name('login');

Route::post('/login', [AuthController::class, 'login']);
