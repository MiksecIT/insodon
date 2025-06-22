<?php

namespace App\Utils;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use App\Models\AppSetting;
use App\Models\Setting;
use App\Models\Reward;
use App\Models\Don;

class Utils
{
    static $IMAGE_MIMES = ["image/png", "image/jpg", "image/jpeg"];

    static $VIDEO_MIMES = ["video/mp4", "video/m4a", "video/m4b", "video/3gpp", "video/3gp", "video/webm", "video/ogg", "video/mpeg"];

    static $ALL_SUPPORTED_LANGUAGES = ["en", "fr"];

    /**
     * Initialize or load app setting
     *
     * @return void
     */
    public static function appSettings ()
    {
        $appSetting = AppSetting::get()->first();
        # Create new record if not done yet
        if (is_null($appSetting)) {
            $appSetting = AppSetting::create([
                "created_at" => now(),
                "updated_at" => now(),
            ]);
        }
        # Restoring if deleted
        else {
            if (!is_null($appSetting->deleted_at)) {
                $appSetting->restore();
            }
        }
        return $appSetting;
    }
    /**
     * Return not fusioned reward
     *
     * @return void
     */
    public static function notFusionedRewards ()
    {
        $array = [];
        $rewards = Reward::all();
        if (count($rewards) > 0) {
            foreach ($rewards as $reward) {
                if ($reward->isReady() && $reward->isFusioned() == false) {
                    array_push ($array, $reward);
                }
            }
        }
        return $array; 
    }
    /**
     * Return not fusioned don
     *
     * @return void
     */
    public static function notFusionedDons ()
    {
        $array = [];
        $dons = Don::all();
        if (count($dons) > 0) {
            foreach ($dons as $don) {
                if ($don->isFusioned() == false) {
                    array_push ($array, $don);
                }
            }
        }
        return $array; 
    }
    /**
     * Go to existing conversation between auth user and TO user
     *
     * @param \App\Models\User $to
     * @return void
     */
    public static function goToConversation(\App\Models\User $to)
    {
        if (\Auth::check()) {
            # Checks if user TO is set and really exists
            if (!is_null($to)) {
                $conversation = \App\Models\Conversation::where(
                    [
                        ['from', '=', auth()->user()->id],
                        ['to', '=', $to->id]
                    ]
                )->orWhere(
                    [
                        ['from', '=', $to->id],
                        ['to', '=', auth()->user()->id]
                    ]
                )->first();
                
                # Go to messages page with given conversation
                if (!is_null($conversation)) {
                    return redirect(route('app.messages', ['conversationReference' => $conversation->reference]));
                } 
                # There's no conversation yet
                # We init a new one
                else {
                    $conversation = \App\Models\Conversation::create([
                        "reference" => Utils::generateReference(Conversation::all(), "CON", 10),
                        "from" => auth()->user()->id,
                        "to" => $to->id,
                        "created_at" => now(),
                        "updated_at" => now(),
                    ]);
                    # Go to messages page with newly created conversation
                    return redirect(route('app.messages', ['conversationReference' => $conversation->reference]));
                } 
            } 
            # Go to messages page with default value
            else {
                return redirect(route('app.messages'));
            }
        } 
        # Go to login view
        else {
            return redirect(route('login'));
        }
    }
    /**
     * Generate a reference
     * Each item of the collection should have a 'reference' column
     *
     * @param Illuminate\Database\Eloquent\Collection
     * @param string $string
     * @param int $max_digit
     */
    public static function generateReference(Collection $collection, $string, $max_digit)
    {
        $reference = self::randomReference($string, $max_digit);

        while (1)
        {
            if (self::checkReference($collection, $reference) == false)
            {
                break;
            }
            $reference = self::randomReference($string, $max_digit);
        }

        return $reference;
    }
    /**
     * Generate an unique pseudo
     * Each item of the collection should have a 'reference' column
     *
     * @param Illuminate\Database\Eloquent\Collection
     * @param string $string
     * @param int $max_digit
     */
    public static function generatePseudo(Collection $collection, $data)
    {
        $temp = $data[0].''.explode(" ", $data[1])[0];
        
        $pseudo = $temp;

        while (1)
        {
            if (self::checkPseudo($collection, $pseudo) == false)
            {
                break;
            }
            $pseudo = self::randomReference($temp, 3);
        }

        return $pseudo;
    }
    /**
     * Generates a fake token
     * @param int $maximum
     */
    public static function fakeToken($maximum)
    {
        return substr(
            str_shuffle(
                str_repeat(
                    $x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
                    ceil($maximum/strlen($x))
                )
            ), 1, $maximum);
    }
    /**
     * Update view count for given model
     *
     * @param string $model
     * @param int $model_id
     * @return void
     */
    public static function updateViewCount ($model, $model_id, $data = null) 
    {
        if (in_array($model, ['agents', 'categories', 'properties']) && is_numeric($model_id)) {
            # Checking if view alredy exists
            $existingView = \App\Models\View::where('session', csrf_token())->where('model', $model)->where('model_id', $model_id)->first();
            if(\Auth::check()) {
                $existingView = \App\Models\View::where('user_id', auth()->user()->id)->where('model', $model)->where('model_id', $model_id)->first();
            }
            ## View already exists
            ### Updating view rank
            if (!is_null($existingView)) {
                $existingView->rank = $existingView->rank + 1;
                $existingView->save();
                if (!is_null($data)) {
                    $existingView->ip_address = $data['ip'];
                    $existingView->country_zip = $data['zip'];
                    $existingView->browser = $data['browser'];
                    $existingView->os = $data['os'];
                    $existingView->meta_data = $data['meta'];
                    $existingView->save();
                }
            } 
            ## View does not exists
            ### Creating and storing new one in db
            else {
                \App\Models\View::create([
                    "reference" => \App\Utils\Utils::generateReference(\App\Models\View::all(), 'VIEW', 10),
                    "session" => csrf_token(),
                    "model" => $model,
                    "model_id" => $model_id,
                    "rank" => 1,
                    "ip_address" => !is_null($data) ? $data['ip'] : null,
                    "country_zip" => !is_null($data) ? $data['zip'] : null,
                    "browser" => !is_null($data) ? $data['browser'] : null,
                    "os" => !is_null($data) ? $data['os'] : null,
                    "meta_data" => !is_null($data) ? $data['meta'] : null,
                    "user_id" => \Auth::check() ? auth()->user()->id : null,
                    "created_at" => now(),   
                    "updated_at" => now(),
                ]);
            }
            
        }
    }
    /**
     * Update rating for given model
     *
     * @param string $model
     * @param int $model_id
     * @return void
     */
    public static function updateRating ($model, $model_id)
    {
        if (in_array($model, ['agents','properties']) && is_numeric($model_id)) {
            $temp = null;
            if ($model == "agents") {
                $temp = \App\Models\Agent::find($model_id);
            } elseif ($model == "properties") {
                $temp = \App\Models\Property::find($model_id);
            }
            # Counting reviews star
            if (!is_null($temp)) {
                $temp->five_stars_count = \App\Models\Review::where('model', $model)->where('model_id', $temp->id)->where('star', 5)->count();
                $temp->four_stars_count = \App\Models\Review::where('model', $model)->where('model_id', $temp->id)->where('star', 4)->count();
                $temp->three_stars_count = \App\Models\Review::where('model', $model)->where('model_id', $temp->id)->where('star', 3)->count();
                $temp->two_stars_count = \App\Models\Review::where('model', $model)->where('model_id', $temp->id)->where('star', 2)->count();
                $temp->one_stars_count = \App\Models\Review::where('model', $model)->where('model_id', $temp->id)->where('star', 1)->count();
                $temp->save();
            }  
            # Updating temp current star
            if ($temp->five_stars_count > 0 || $temp->four_stars_count > 0 || $temp->three_stars_count > 0 || $temp->two_stars_count > 0 || $temp->one_stars_count > 0) {
                $array = [
                    "5"=>$temp->five_stars_count,
                    "4"=>$temp->four_stars_count,
                    "3"=>$temp->three_stars_count,
                    "2"=>$temp->two_stars_count,
                    "1"=>$temp->one_stars_count,
                ];
                $temp->current_star = array_search(max(array_values($array)), $array);
                $temp->save();
            }       
        }
    }
    /**
     * Getting all top categories
     * Regarding [related properties + likes + views + search results]
     *
     * @return array
     */
    public static function topCategories ($limit = null)
    {
        $array = [];
        $categories = [];
        $temp = \App\Models\Category::where('is_available', 1)->get();
        if (count($temp) > 0) {
            foreach ($temp as $category) {

                $point = count($category->properties) + count($category->users)  + count($category->views());
                
                array_push($array, [
                    "data" => $category,
                    "point" => $point, 
                ]);
            }
            # Sorting...
            usort($array, function($val1, $val2){
                # check if both the values are equal
                if ($val1['point'] == $val2['point']) return 0;
                # check if not equal, then compare values
                return ($val1['point'] < $val2['point']) ? 1 : -1;
            });
            # Getting categories
            foreach ($array as $trendingCategory) {
                array_push($categories, $trendingCategory['data']);
            }
        }
        return !is_null($limit) && $limit > 0 ? array_slice($categories, 0, $limit) : $categories;
    }
    /**
     * Getting all property top categories
     * Regarding [related properties + likes + views + search results]
     *
     * @return array
     */
    public static function topPropertyCategories ($limit = null)
    {
        $array = [];
        $categories = [];
        $temp = \App\Models\Category::where('is_available', 1)->where('target', 'property')->get();
        if (count($temp) > 0) {
            foreach ($temp as $category) {
                
                $point = count($category->properties) + count($category->users)  + count($category->views());
                
                array_push($array, [
                    "data" => $category,
                    "point" => $point, 
                ]);
            }
            # Sorting...
            usort($array, function($val1, $val2){
                # check if both the values are equal
                if ($val1['point'] == $val2['point']) return 0;
                # check if not equal, then compare values
                return ($val1['point'] < $val2['point']) ? 1 : -1;
            });
            # Getting categories
            foreach ($array as $trendingCategory) {
                array_push($categories, $trendingCategory['data']);
            }
        }
        return !is_null($limit) && $limit > 0 ? array_slice($categories, 0, $limit) : $categories;
    }
    /**
     * Getting all top properties
     * Regarding [related reviews + likes + views + search results + running sponsoring]
     *
     * @param int $limit
     * @param bool $sponsoringFirst
     * @return array
     */
    public static function topProperties ($limit = null, $sponsoringFirst = false)
    {
        $array = [];
        $properties = [];
        $clauses = [['is_available', 1]];

        $temp = \App\Models\Property::orderByDesc('has_sponsoring')->where($clauses)->get();
        
        if (count($temp) > 0) {
            foreach ($temp as $property) {
                array_push($array, [
                    "data" => $property,
                    "point" => count($property->users) + count($property->reviews())  + count($property->views()), 
                    "sponsoring" => $property->hasRunningSponsoring() ? 1 : 0,
                ]);
            }

            # Sorting on point...
            usort($array, function($val1, $val2){
                # check if both the values are equal
                if ($val1['point'] == $val2['point']) return 0;
                # check if not equal, then compare values
                return ($val1['point'] < $val2['point']) ? 1 : -1;
            });

            # Sorting on sponsoring
            if ($sponsoringFirst == true) {
                usort($array, function($val1, $val2) {
                    # check if both the values are equal
                    if ($val1['sponsoring'] == $val2['sponsoring']) return 0;
                    # check if not equal, then compare values
                    return ($val1['sponsoring'] < $val2['sponsoring']) ? 1 : -1;
                });
            }

            # Getting properties
            foreach ($array as $property) {
                array_push($properties, $property['data']);
            }
        }
        return !is_null($limit) && $limit > 0 ? array_slice($properties, 0, $limit) : $properties;
    }
    /**
     * Getting all top agents
     * Regarding [related properties + related reviews + followers + views + search results + running sponsoring]
     *
     * @param int $limit
     * @param bool $sponsoringFirst
     * @return array
     */
    public static function topAgents ($limit = null, $sponsoringFirst = false)
    {
        $array = [];
        $agents = [];
        
        $clauses = [['is_available', 1], ['is_blocked', 0]];

        $temp = \App\Models\Agent::orderByDesc('has_sponsoring')->where($clauses)->get();
        

        if (count($temp) > 0) {
            foreach ($temp as $agent) {
                array_push($array, [
                    "data" => $agent,
                    "point" => count($agent->properties) + count($agent->followers) + count($agent->reviews())  + count($agent->views()), 
                    "sponsoring" => $agent->hasRunningSponsoring() ? 1 : 0,
                ]);
            }

            # Sorting on point...
            usort($array, function($val1, $val2){
                # check if both the values are equal
                if ($val1['point'] == $val2['point']) return 0;
                # check if not equal, then compare values
                return ($val1['point'] < $val2['point']) ? 1 : -1;
            });

            # Sorting on sponsoring
            if ($sponsoringFirst) {
                usort($array, function($val1, $val2) {
                    # check if both the values are equal
                    if ($val1['sponsoring'] == $val2['sponsoring']) return 0;
                    # check if not equal, then compare values
                    return ($val1['sponsoring'] < $val2['sponsoring']) ? 1 : -1;
                });
            }

            # Getting agents
            foreach ($array as $agent) {
                array_push($agents, $agent['data']);
            }
        }
        return !is_null($limit) && $limit > 0 ? array_slice($agents, 0, $limit) : $agents;
    }
    /**
     * Get top $limit of user conversations that has more chats
     *
     * @param [type] $limit
     * @param \App\Models\User $user
     * @return void
     */
    public static function topConversations ($limit = null, \App\Models\User $user)
    {
        $array = [];
        $conversations = [];
        
        if (!is_null($user)) {

            $temp = \App\Models\Conversation::where('from', $user->id)->orWhere('to', $user->id)->get();

            if (count($temp) > 0) {
                foreach ($temp as $conversation) {
                    array_push($array, [
                        "data" => $conversation,
                        "point" => $conversation->chats->count()
                    ]);
                }

                # Sorting on point...
                usort($array, function($val1, $val2){
                    # check if both the values are equal
                    if ($val1['point'] == $val2['point']) return 0;
                    # check if not equal, then compare values
                    return ($val1['point'] < $val2['point']) ? 1 : -1;
                });

                # Getting conversations
                foreach ($array as $conversation) {
                    array_push($conversations, $conversation['data']);
                }
            }
        }
        
        return !is_null($limit) && $limit > 0 ? array_slice($conversations, 0, $limit) : $conversations;
    }
    /**
     * Get top $limit of all conversations that has more chats
     *
     * @param [type] $limit
     * @param \App\Models\User $user
     * @return void
     */
    public static function topAllConversations ($limit = null)
    {
        $array = [];
        $conversations = [];
        
        $temp = \App\Models\Conversation::withTrashed()->get();

        if (count($temp) > 0) {
            foreach ($temp as $conversation) {
                array_push($array, [
                    "data" => $conversation,
                    "point" =>\App\Models\Chat::withTrashed()->where('conversation_id', $conversation->id)->count()
                ]);
            }

            # Sorting on point...
            usort($array, function($val1, $val2){
                # check if both the values are equal
                if ($val1['point'] == $val2['point']) return 0;
                # check if not equal, then compare values
                return ($val1['point'] < $val2['point']) ? 1 : -1;
            });

            # Getting conversations
            foreach ($array as $conversation) {
                array_push($conversations, $conversation['data']);
            }
        }
        
        return !is_null($limit) && $limit > 0 ? array_slice($conversations, 0, $limit) : $conversations;
    }
    /**
     * Generate a random reference
     *
     * @param string $string
     * @param integer $max_digit
     *
     * @return string
     */
    public static function randomReference($string, $max_digit)
    {
        $temp = [];
        for ($i=0; $i <$max_digit ; $i++) {
            array_push($temp, rand(0, 9));
        }
        if (!is_null($string))
        {
            return $string.''.implode($temp);
        }
        return implode($temp);
    }
    /**
     * Check if the reference is used or not
     *
     * @param string $temp
     * @param Illuminate\Database\Eloquent\Collection $collection
     */
    public static function checkReference(Collection $collection, $temp)
    {
        foreach ($collection as $item) {
            if ($item->reference == $temp) {
                return true;
            }
        }
        return false;
    }
    /**
     * Check if the pseudo is used or not
     *
     * @param string $temp
     * @param Illuminate\Database\Eloquent\Collection $collection
     */
    public static function checkPseudo(Collection $collection, $temp)
    {
        foreach ($collection as $item) {
            if ($item->pseudo == $temp) {
                return true;
            }
        }
        return false;
    }
    /**
     * Generate an unique secret key user
     *
     * @return string $secret
     */
    public static function generateSecret()
    {
        return  self::fakeToken(8).'.'.self::generateReference(\App\User::all(), '', 5);
    }
    /**
     * Storing file to a specific disk
     * 
     * @param string $diskName
     * @param string $filename
     * @param Illuminate\Http\UploadedFile $content
     * 
     * @return boolean
     */
    public static function diskStoreFile($diskName, $filename, UploadedFile $content)
    {
        if (!\Storage::disk($diskName)->exists($filename)) {
            \Storage::disk($diskName)->put($filename, file_get_contents($content));
            return true;
        }
        return false;
    }
    /**
     * Deletes an existing file from specifi disk
     * 
     * @param string $diskName
     * @param string $filename
     * 
     * @return boolean
     */
    public static function diskDeleteFile($diskName, $filename)
    {
        if (\Storage::disk($diskName)->exists($filename)) {
            \Storage::disk($diskName)->delete($filename);
            return true;
        }
        return false;
    }
    /**
     * Converts file size from bytes to human readable unit
     * 
     * @param string $size , given file size in bytes
     * @param string $unit , the output unit
     * 
     * @return boolean
     */
    public static function humanReadableFileSize($size, $unit="") {
        // Convert bytes to Gigabytes
        if( (!$unit && $size >= 1<<30) || $unit == "GB") {
            return number_format($size/(1<<30),2)."GB";
        }
        // Convert bytes to Megabytes
        elseif( (!$unit && $size >= 1<<20) || $unit == "MB") {
            return number_format($size/(1<<20),2)."MB";
        }
        // Convert bytes to Kilobytes
        elseif( (!$unit && $size >= 1<<10) || $unit == "KB") {
            return number_format($size/(1<<10),2)."KB";
        }
        // Return to default
        else {
            return number_format($size)." bytes";
        }
    }
    /**
     * Return allowed image mime type
     *
     * @return array
     */
    public static function getAllowedImagesMimeTypes() 
    {
        return self::$IMAGE_MIMES;
    }
    /**
     * Return allowed video mime type
     *
     * @return array
     */
    public static function getAllowedVideosMimeTypes() 
    {
        return self::$VIDEO_MIMES;
    }
    /**
     * Return allowed image mime type
     *
     * @return array
     */
    public static function getAllSupportedLanguages() 
    {
        return self::$ALL_SUPPORTED_LANGUAGES;
    }
    /**
     * Get resolution of uploaded image file
     * 
     * @param  \Illuminate\Http\UploadedFile $file
     * @return array
     */
    public static function getUploadedImageResolution(\Illuminate\Http\UploadedFile $file): array
    {
        $size = getimagesize($file->getRealPath());

        return [
            'width'     => $size[0] ?? 0,
            'height'    => $size[1] ?? 0,
        ];
    }
    /**
     * Gets and formats difference between the given and current datetime
     *
     * @param String $date
     * @return String
     */
    public static function differenceFromNow(String $date)
    {
        $search = array("before", "year", "years", "months", "month", "weeks", "week", "days", "day", "hours", "hour", "minutes", "minute", "seconds", "second");
        $replace = array("", "y", "y", "m", "m", "w", "w", "d", "d", "h", "h", "min", "min", "s", "s");
        $duration = "";
        if (\Carbon\Carbon::parse($date)->month == now()->month) {
            $duration = str_replace($search, $replace, \Carbon\Carbon::parse($date)->diffForHumans(now()));
        } else {
            $month = \Carbon\Carbon::parse($date)->month > 9 ? \Carbon\Carbon::parse($date)->month : "0".\Carbon\Carbon::parse($date)->month;
            $day = \Carbon\Carbon::parse($date)->day > 9 ? \Carbon\Carbon::parse($date)->day : "0".\Carbon\Carbon::parse($date)->day;
            $duration = $day."-".$month.'-'.\Carbon\Carbon::parse($date)->year;
        }
        return $duration;
    }
    /**
     * Get all the days number and days name of given month and year
     *
     * @param string $month
     * @param string $year
     * @return void
     */
    public static function getMonthDates($year, $month)
    {
        $days = [];
        if (!is_null($month) && !is_null($year)) {
            try {
                $days = [];
                $number_of_days = cal_days_in_month(CAL_GREGORIAN,$month, $year);
                for ($x = 1; $x <= $number_of_days; $x++) {
                    array_push($days, $x.'-'.strtolower(substr(date("l", strtotime($x . "-$month-$year")), 0, 3)));
                }
            } catch (Exception $e) {}
        } 
        return $days;
    }
    /**
     * Get weeks count in of given month and year
     *
     * @param string $month
     * @param string $year
     * @return void
     */
    public static function getMonthWeeksCount($year, $month) {
        $monthDates = self::getMonthDates($year, $month);

        $monthWeeksCount = (count($monthDates)%7 == 0 ? 0 : 1) + intval(count($monthDates)/7);

        $monthEndingDay= date('N',strtotime($year.'-'.$month.'-'.count($monthDates)));
         
        $monthStartDay = date('N',strtotime($year.'-'.$month.'-01'));
         
        if($monthEndingDay < $monthStartDay){
             
            $monthWeeksCount++;
         
        }
        return $monthWeeksCount;
    }
    /**
     * Get days count in of given month and year
     *
     * @param string $month
     * @param string $year
     * @return void
     */
    public static function getMonthDaysCount($year, $month) {
        return date('t',strtotime($year.'-'.$month.'-01'));
    }
}
