<?php

namespace App\Helpers;

use Carbon\Carbon;

class TimeHelper
{
    public static function relativeTimeWithOffset($timestamp)
    {
        $adjustedTime = Carbon::parse($timestamp);

        Carbon::setLocale('id');

        return $adjustedTime->diffForHumans();
    }
}
