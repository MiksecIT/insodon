<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Setting extends Model
{
    use HasFactory, SoftDeletes;
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
     * Update orange money wallet
     *
     * @return void
     */
    public function updateOrangeWallet ($address)
    {
        if (is_null($this->payment_orange_money)) {
            $this->payment_orange_money = $address;
            $this->save();
        }
    }
    /**
     * Update mtn money wallet
     *
     * @return void
     */
    public function updateMTNWallet ($address)
    {
        if (is_null($this->payment_mtn_money)) {
            $this->payment_mtn_money = $address;
            $this->save();
        }
    }
    /**
     * Update moov money wallet
     *
     * @return void
     */
    public function updateMoovWallet ($address)
    {
        if (is_null($this->payment_moov_money)) {
            $this->payment_moov_money = $address;
            $this->save();
        }
    }
    /**
     * Update wave money wallet
     *
     * @return void
     */
    public function updateWaveWallet ($address)
    {
        if (is_null($this->payment_wave_money)) {
            $this->payment_wave_money = $address;
            $this->save();
        }
    }
    /**
     * Update usdt wallet
     *
     * @return void
     */
    public function updateUsdtWallet ($address)
    {
        if (is_null($this->payment_crypto_usdt)) {
            $this->payment_crypto_usdt = $address;
            $this->save();
        }
    }
    /**
     * Update bnb wallet
     *
     * @return void
     */
    public function updateBnbWallet ($address)
    {
        if (is_null($this->payment_crypto_bnb)) {
            $this->payment_crypto_bnb = $address;
            $this->save();
        }
    }
    /**
     * Update eth wallet
     *
     * @return void
     */
    public function updateEthWallet ($address)
    {
        if (is_null($this->payment_crypto_eth)) {
            $this->payment_crypto_eth = $address;
            $this->save();
        }
    }
}
