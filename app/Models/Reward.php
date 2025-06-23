<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reward extends Model
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
     * Produced reward
     *
     * @return void
     */
    public function royalty ()
    {
        return $this->hasOne(Royalty::class, "reward_id");
    }

    /**
     * Related royalties
     *
     * @return void
     */
    public function royalties ()
    {
        return $this->hasMany(Royalty::class, "withdraw_reward");
    }

    /**
     * Mark all related royalties as received
     *
     * @return void
     */
    public function completeRoyalties () 
    {
        if (count($this->royalties) > 0 && $this->isCompleted()) {
            foreach ($this->royalties as $r) {
                if ($r->isClaimed() && $r->isReceived() == false) {
                    $r->is_received = $this->is_received;
                    $r->received_at = $this->received_at;
                    $r->save();
                }
            }
        }
    }

    /**
     * Add a royalty for withdraw
     *
     * @param Royalty $royalty
     * @return void
     */
    public function addRoyalty (Royalty $royalty)
    {
        if (!is_null($royalty)) {
            if (!is_null($royalty->value) && $royalty->value > 0 && $royalty->isClaimed() == false) {
                $royalty->withdraw_reward = $this->id;
                $royalty->is_claimed = 1;
                $royalty->claimed_at = now();
                $royalty->save();
            }
        }
    }   

    /**
     * Checks if ready to be redeemed
     *
     * @return boolean
     */
    public function isReady ()
    {
        if (!is_null($this->created_at)) {
            if ($this->source == "don") {
                if (!is_null(\App\Utils\Utils::appSettings()->reward_don_delay) && \App\Utils\Utils::appSettings()->reward_don_delay > 0) {
                    if (\Carbon\Carbon::parse($this->created_at)->addDays(\App\Utils\Utils::appSettings()->reward_don_delay) < now()) {
                        return true;
                    }
                }
            } else if ($this->source == "bonus") {
                return true;
            } 
        } 
        return false;
    }
    
    /**
     * Checks if reward is approuved for bonus withdraw
     *
     * @return boolean
     */
    public function isApprouvedForBonus ()
    {
        return $this->source == "bonus" && count($this->royalties) > 0 && $this->is_royalties_withdraw_enabled && !is_null($this->royalties_withdraw_enabled_at);
    }

    /**
     * Check if reward if initiale or created by an admin
     *
     * @return boolean
     */
    public function isInitiale ()
    {
        if (is_null($this->don_id)) {
            return $this->source == "don";
        } else {
            if (!is_null($this->user) && !is_null($this->don)) {
                if ($this->don->user_id != $this->user->id) {
                    return true;
                }
            }
            return false;
        }
    }
    /**
     * Checks if at least one fusion
     *
     * @return boolean
     */
    public function hasFusions ()
    {
        return count($this->fusions) > 0;
    }
    /**
     * Checks if completely fusioned
     *
     * @return boolean
     */
    public function isFusioned ()
    {
        if (count($this->fusions) > 0) {            
            $fusionsAmount = 0;
            foreach ($this->fusions as $fusion) {
                $fusionsAmount += $fusion->amount;
            }
            return $this->amount == $fusionsAmount;
        }
        return false;
    }
    /**
     * Checks if sent
     *
     * @return boolean
     */
    public function isSent ()
    {
        if ($this->isFusioned()) {
            return count($this->fusions) == count($this->fusionsSent());
        }
    }
    /**
     * Checks if received
     *
     * @return boolean
     */
    public function isReceived ()
    {
        if ($this->isFusioned()) {
            return count($this->fusions) == count($this->fusionsReceived());
        }
    }
    /**
     * Checks if completed
     *
     * @return boolean
     */
    public function isCompleted ()
    {
        if ($this->isFusioned()) {
            return count($this->fusions) == count($this->fusionsCompleted());
        }
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
     * Related fusions
     *
     * @return void
     */
    public function fusions ()
    {
        return $this->hasMany(Fusion::class, "reward_id");
    }
    /**
     * Related sent fusions
     *
     * @return void
     */
    public function fusionsSent ()
    {
        $array = [];
        if (count($this->fusions) > 0) {
            foreach ($this->fusions as $fusion) {
                if ($fusion->isSent()) {
                    array_push($array, $fusion);
                }
            }
        }
        return $array;
    }
    /**
     * Related received fusions
     *
     * @return void
     */
    public function fusionsReceived ()
    {
        $array = [];
        if (count($this->fusions) > 0) {
            foreach ($this->fusions as $fusion) {
                if ($fusion->isReceived()) {
                    array_push($array, $fusion);
                }
            }
        }
        return $array;
    }
    /**
     * Related completed fusions
     *
     * @return void
     */
    public function fusionsCompleted ()
    {
        $array = [];
        if (count($this->fusions) > 0) {
            foreach ($this->fusions as $fusion) {
                if ($fusion->isCompleted()) {
                    array_push($array, $fusion);
                }
            }
        }
        return $array;
    }
    /**
     * Related receivers
     *
     * @return void
     */
    public function receivers ()
    {
        $array = [];
        if (count($this->fusions) > 0) {
            foreach ($this->fusions as $fusion) {
                if (!is_null($fusion->receiver())) {
                    array_push($array, $fusion->receiver());
                }
            }
        }
        return $array;
    }
    /**
     * Related receivers
     *
     * @return void
     */
    public function senders ()
    {
        $array = [];
        if (count($this->fusions) > 0) {
            foreach ($this->fusions as $fusion) {
                if (!is_null($fusion->sender())) {
                    array_push($array, $fusion->sender());
                }
            }
        }
        return $array;
    }
}
