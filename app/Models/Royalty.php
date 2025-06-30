<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Royalty extends Model
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
     * The user who benefit
     *
     * @return void
     */
    public function targeted ()
    {
        return $this->belongsTo(User::class, "target");
    }

    /**
     * Parent withdraw
     *
     * @return void
     */
    public function reward ()
    {
        return $this->belongsTo(Reward::class, "reward_id");
    }

    /**
     * Withdrawn reward
     *
     * @return void
     */
    public function withdrawReward ()
    {
        return $this->belongsTo(Reward::class, "withdraw_reward"); 
    }

    /**
     * Checks if royalty is approuved for withdraw
     *
     * @return boolean
     */
    public function isApprouved ()
    {
        if (!is_null($this->withdrawReward)) {
            return  $this->withdrawReward->isApprouvedForBonus();
        } return false;
    }

    /**
     * Checks if claimed
     *
     * @return boolean
     */
    public function isClaimed ()
    {
        return $this->is_claimed && !is_null($this->claimed_at);
    }

    /**
     * Checks if received
     *
     * @return boolean
     */
    public function isReceived ()
    {
        return $this->is_received && !is_null($this->received_at);
    }

    /**
     * Checks if completed
     *
     * @return boolean
     */
    public function isCompleted ()
    {
        return $this->isClaimed() && $this->isReceived();
    }
}
