<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
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
        return $this->belongsTo(User::class, "from");
    }
    /**
     * Related chats
     *
     * @return void
     */
    public function chats ()
    {
        return $this->hasMany(Chat::class, "message_id");
    }
}
