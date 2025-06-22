<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Faq extends Model
{
    use HasFactory, SoftDeletes;
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];
    protected $guarded = [];

    /**
     * Related faqs
     *
     * @return void
     */
    public function faqs ()
    {
        return $this->hasMany(Faq::class)->orderByDesc("created_at");
    } 

    /**
     * Related dons
     *
     * @return void
     */
    public function faq ()
    {
        return $this->belongsTo(Faq::class, "faq_id")->orderByDesc("created_at");
    } 
}
