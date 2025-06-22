<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Don extends Model
{
    use SoftDeletes;
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
     * Related reward
     *
     * @return void
     */
    public function reward ()
    {
        return $this->hasOne(Reward::class, "don_id")->where('user_id', $this->user_id);
    }
    /**
     * Related pack
     *
     * @return void
     */
    public function pack ()
    {
        return $this->belongsTo(Pack::class, "pack_id");
    }
    /**
     * Checks if completely fusioned
     *
     * @return boolean
     */
    public function isFusioned ()
    {
        if (count($this->fusions) > 0 && !is_null($this->pack)) {
            $total = 0;
            foreach ($this->fusions as $fusion) {
                $total += $fusion->amount;
            }
            return $this->amount == $total;
        } 
        return false;
    }
    /**
     * Checks if don is completely sent
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
     * Checks if don is completely received
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
     * Checks if don is completed
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
     * Checks if at least one fusion
     *
     * @return boolean
     */
    public function hasFusions ()
    {
        return count($this->fusions) > 0;
    }
    /**
     * Related fusions
     *
     * @return void
     */
    public function fusions ()
    {
        return $this->hasMany(Fusion::class, "don_id");
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
    /**
     * Is first don for related user
     *
     * @return boolean
     */
    public function isFirst()
    {
        return $this->is_first == 1;
    }
    /**
     * Related dons
     *
     * @return void
     */
    public function dons ()
    {
        return $this->hasMany(Don::class, "don_id");
    }
    /**
     * Related don
     *
     * @return void
     */
    public function parent ()
    {
        return $this->belongsTo(Don::class, "don_id");
    }
    /**
     * Related second don
     *
     * @return void
     */
    public function secondDon ()
    {
        return Don::find($this->second);
    }
    /**
     * Related third don
     *
     * @return void
     */
    public function thirdDon ()
    {
        return Don::find($this->third);
    }
}
