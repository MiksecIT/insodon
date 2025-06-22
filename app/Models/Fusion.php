<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Fusion extends Model
{
    use HasFactory;
    use SoftDeletes;
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
     * Related don
     *
     * @return void
     */
    public function don ()
    {
        return $this->belongsTo(Don::class, "don_id");
    }
    /**
     * Related reward
     *
     * @return void
     */
    public function reward ()
    {
        return $this->belongsTo(Reward::class, "reward_id");
    }
    /**
     * Related sender
     *
     * @return void
     */
    public function sender ()
    {
        return User::find($this->sender);
    }
    /**
     * Related receiver
     *
     * @return void
     */
    public function receiver ()
    {
        return User::find($this->receiver);
    }
    /**
     * Checks if sent
     *
     * @return boolean
     */
    public function isSent ()
    {
        return $this->is_sent == 1 && !is_null($this->sent_at);
    }
    /**
     * Checks if received
     *
     * @return boolean
     */
    public function isReceived ()
    {
        return $this->is_received == 1 && !is_null($this->received_at);
    }
    /**
     * Checks if completed
     *
     * @return boolean
     */
    public function isCompleted ()
    {
        return $this->isSent() && $this->isReceived();
    }
}
