<?php

namespace App\Utils;

use Carbon\Carbon;

/**
 * This class allows to perform some specifis operations on Datetime objects
 */
class Date
{
	// Days in french
	const DAYS_FR = [
		0 => "Lundi",
		1 => "Mardi",
		2 => "Mercredi",
		3 => "Jeudi",
		4 => "Vendredi",
		5 => "Samedi",
		6 => "Dimanche"
    ];
    // Days in english
    const DAYS_EN = [
		0 => "Monday",
		1 => "Tuesday",
		2 => "Wednesday",
		3 => "Thursday",
		4 => "Friday",
		5 => "Saturnday",
		6 => "Sunday"
	];
	// Months in french
	const MONTHS_FR = [
		0 => "Janvier",
		1 => "Février",
		2 => "Mars",
		3 => "Avril",
		4 => "Mai",
		5 => "Juin",
		6 => "Juillet",
		7 => "Août",
		8 => "Septembre",
		9 => "Octobre",
		10 => "Novembre",
		11 => "Décembre"
	];
	// Months in english
	const MONTHS_EN = [
		0 => "January",
		1 => "February",
		2 => "March",
		3 => "April",
		4 => "May",
		5 => "June",
		6 => "July",
		7 => "August",
		8 => "September",
		9 => "October",
		10 => "November",
		11 => "December"
	];

	function __construct()
	{
		$this->carbon = new Carbon();
	}

	/**
	 * Adds a '0' if the given param is a single digit
	 *
	 * @param string temp like '2'
	 *
	 * @return string temp like '02
	 */
	static function ajust($temp){
		if(strlen($temp) == 1){
			return "0".$temp;
		}return $temp;
	}

	public static function get_hour($temp)
	{
		return self::ajust(self::get_date($temp)->hour);
	}

	public static function get_minute($temp)
	{
		return self::ajust(self::get_date($temp)->minute);
	}

	public static function get_second($temp)
	{
		return self::ajust(self::get_date($temp)->second);
	}

	public static function get_day($temp, $lang)
	{
		if($lang == 'en')
		{
			return self::DAYS_EN[ self::get_date($temp)->dayOfWeek == 0 ? 6 : self::get_date($temp)->dayOfWeek-1 ];
		}
		elseif($lang == 'fr')
		{
			return self::DAYS_FR[ self::get_date($temp)->dayOfWeek == 0 ? 6 : self::get_date($temp)->dayOfWeek-1 ];
		}
	}

	public static function date_locale($temp, $lang)
	{
		if ($lang == "fr") {
			return self::get_day($temp, "fr")." ".self::get_day_number($temp)." ".self::get_month($temp, "fr")." ".self::get_year($temp);
		} else {
			return self::get_month($temp, "en")." ".self::get_day_number($temp).", ".self::get_year($temp);
		}
	}

	public static function datetime_locale($temp, $lang)
	{
		$indic = "at";
		if ($lang == "fr") {
			$indic = "à";
		}
		return self::date_locale($temp, $lang)." ".$indic." ".self::get_hour($temp).":".self::get_minute($temp).":".self::get_second($temp);
	}

	public static function getTodayForOpenHours()
	{
		return self::date_locale(now(), locale()->current());
	}

	public static function get_day_number($temp)
	{
		return self::get_date($temp)->day;
	}

	public static function get_month($temp, $lang)
	{
		if($lang == 'en')
		{
			return self::MONTHS_EN[ self::get_date($temp)->month-1 ];
		}
		elseif($lang == 'fr')
		{
			return self::MONTHS_FR[ self::get_date($temp)->month-1 ];
		}

	}

	public static function get_year($temp)
	{
		return self::get_date($temp)->year;
	}

	public static function get_date($temp)
	{
		return new Carbon($temp);
	}

}
