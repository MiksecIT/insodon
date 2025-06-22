<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pack extends Model
{
    use HasFactory, SoftDeletes;
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];
    protected $guarded = [];
    /**
     * Related dons
     *
     * @return void
     */
    public function dons ()
    {
        return $this->hasMany(Don::class, "pack_id")->orderByDesc("created_at");
    }
    /**
     * Related completed dons
     *
     * @return void
     */
    public function donsCompleted ()
    {
        $array = [];
        if (count($this->dons) > 0) {
            foreach ($this->dons as $don) {
                if ($don->isCompleted()) {
                    array_push($array, $don);
                }
            }
        }
        return $array;
    }   
}
