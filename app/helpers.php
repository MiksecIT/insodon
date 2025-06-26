<?php
 
use Illuminate\Support\Facades\Http;
use Illuminate\Support\HtmlString;
use App\Utils\Utils;

if (! function_exists('can_edit')) {
    function can_edit ($toCheck) {
        if (auth()->user()->isPartOfAdmin()) {
            return true;
        } else {
            if (is_null($toCheck))  {
                return true;
            } 
            else {
                if (Utils::appSettings()->enable_profile_edit == 1) {
                    return true;
                } else {
                    return false;
                }
            }   
        }        
    }
}

if (! function_exists('load_asset_url')) {
    function load_asset_url ($assetUrl) {
        if (!is_null($assetUrl)) {
            $assetUrlExploded = explode("/", $assetUrl);
            if (count($assetUrlExploded) > 0 && count($assetUrlExploded) == 2) {
                if ($assetUrlExploded[0] == "uploads") {
                    if (\Storage::disk('public')->exists($assetUrlExploded[1])) {
                        return asset($assetUrl);
                    }
                }            
            }
        }
        return asset("uploads/default.png");
    }   
}

if (! function_exists('humanable_date')) {
    function humanable_date ($datetime) {
        if (!is_null($datetime)) {
            return $datetime->day." ".config('app.default_availability_months')[$datetime->month][session('lang') == 'fr' ? 'fr' : 'en']." ".$datetime->year;
        }
        return null;
    }   
}

if (! function_exists('to_plural')) {
    function to_plural ($string) {
        if (!is_null($string)) {
            if (session('lang') == 'en') {
                if (substr($string, -1) == 'y') {
                    return substr($string, 0, -1).'ies';
                }  
            } 
            return $string.'s';
        }
        return null;
    }   
}
