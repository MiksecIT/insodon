<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];
    protected $guarded = [];

    /**
     * Related user
     *
     * @return void
     */
    public function user ()
    {
        return $this->belongsTo(User::class, "user_id");
    }

    /**
     * Related message
     *
     * @return void
     */
    public function message ()
    {
        return $this->belongsTo(User::class, "message_id");
    }
}
