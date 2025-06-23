<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class SetLocaleFromQuery
{
    public function handle(Request $request, Closure $next)
    {
        $locale = $request->query('lang', 'id'); 
        App::setLocale($locale);
        $request->session()->put('locale', $locale); 

        return $next($request);
    }
}
