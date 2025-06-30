<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $dates = ['email_verified_at', 'created_at', 'updated_at', 'deleted_at'];
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Init setting
     *
     * @return void
     */
    public function initSetting ()
    {
        if (is_null($this->setting)) {
            return Setting::create([
                "reference" => \App\Utils\Utils::generateReference(Setting::all(), \App\Utils\Utils::fakeToken(20), 1),
                "user_id" => $this->id,
                "created_at" => now(),
                "updated_at" => now(),
            ]);
        }
    }

    /**
     * Related setting
     *
     * @return void
     */
    public function setting ()
    {
        return $this->hasOne(Setting::class, "user_id");
    }

    /**
     * Related roles
     */
    public function role()
    {
        return $this->belongsTo(Role::class, "role_id");
    }

    /**
     * Related support message
     */
    public function message ()
    {
        return $this->hasOne(Message::class, "from");
    }
    /**
     * Undocumented function
     *
     * @return boolean
     */
    public function isBlocked () 
    {
        return $this->is_blocked && !is_null($this->blocked_at);
    }
    /**
     * Check if user
     *
     * @return boolean
     */
    public function isUser ()
    {
        if (!is_null($this->role)) {
            return $this->role->reference == "user";
        } return false;
    }
    /**
     * Checks if part of admin team
     *
     * @return boolean
     */
    public function isPartOfAdmin ()
    {
        return auth()->user()->isAdmin() || auth()->user()->isManager() || auth()->user()->isRoot();
    }
    /**
     * Checks if part of top manager team
     *
     * @return boolean
     */
    public function isTopManager ()
    {
        return auth()->user()->isManager() || auth()->user()->isRoot();
    }
    /**
     * Check if admin
     *
     * @return boolean
     */
    public function isAdmin ()
    {
        if (!is_null($this->role)) {
            return $this->role->reference == "admin";
        } return false;
    }
    /**
     * Check if manager
     *
     * @return boolean
     */
    public function isManager ()
    {
        if (!is_null($this->role)) {
            return $this->role->reference == "manager";
        } return false;
    }
    /**
     * Check if root
     *
     * @return boolean
     */
    public function isRoot ()
    {
        if (!is_null($this->role)) {
            return $this->role->reference == "root";
        } return false;
    }
    /**
     * Confirm fusion sender
     */
    public function confirmSender (Fusion $fusion)
    {
        if (!is_null($fusion)) {
            if (!is_null($fusion->don)) {
                if ($this->id == $fusion->sender && is_null($fusion->send_at) && $fusion->is_sent == 0) {
                    $fusion->sent_at = now();
                    $fusion->is_sent = 1;
                    $fusion->status = "pending_receiver";
                    $fusion->status_at = now();
                    $fusion->status_comment = "Sender has confirmed";
                    $fusion->save();
                }
            }
        }
    }
    /**
     * Confirm fusion receiver
     */
    public function confirmReceiver (Fusion $fusion)
    {
        if (!is_null($fusion)) {
            if (!is_null($fusion->don)) {
                if ($this->id != $fusion->sender && $this->id == $fusion->receiver && $fusion->is_sent == 1 && is_null($fusion->received_at) && $fusion->is_received == 0) {
                    $fusion->received_at = now();
                    $fusion->is_received = 1;
                    $fusion->status = "completed";
                    $fusion->status_at = now();
                    $fusion->status_comment = "Sender and receiver have confirmed";
                    $fusion->save();

                    # Check if related don is completed
                    # Create reward
                    if (!is_null($fusion->don->user)) {
                        $this->createReward($fusion->don, $fusion->don->user, false);
                    }
                }
            }
        }
    }
    /**
     * Create don
     *
     * @param Pack $pack
     * @param [type] $data
     * @return void
     */
    public function createDon (Pack $pack, $data)
    {
        if (!is_null($pack)) {
            return Don::create([
                "reference" => \App\Utils\Utils::generateReference(Don::all(), \App\Utils\Utils::fakeToken(20), 1),
                "user_id" => $this->id,
                "pack_id" => $pack->id,
                "is_usd" => $data["is_usd"],
                "amount" => $data["is_usd"] ? $pack->amount_usd : $pack->amount,
                "is_first" => $data["is_first"],
                "don_id" => $data["don_id"],
                "position" => $data["position"],
                "remaining_amount" => 0,
                "status" => "pending_fusion",
                "is_sent" => 0,
                "created_at" => now(),
                "updated_at" => now(),
            ]);
        } 
    }
    /**
     * Create a reward
     *
     * @param Don $don
     * @param User $receiver
     * @param boolean $isReady
     * @return void
     */
    public function createReward (Don $don, User $receiver, $isReady)
    {
        if (!is_null($don) && !is_null($receiver)) {
            return Reward::create([
                "reference" => \App\Utils\Utils::generateReference(Reward::all(), \App\Utils\Utils::fakeToken(20), 1),
                "don_id" => $don->id, 
                "source" => "don",
                "user_id" => $receiver->id,
                "status" => "pending_fusion",
                "amount" => $don->isFirst() ? $don->pack->amount : \App\Utils\Utils::appSettings()->reward_don_factor * $don->pack->amount,
                "created_at" => $isReady ? \Carbon\Carbon::parse(now())->subDays(\App\Utils\Utils::appSettings()->reward_don_delay + 1) : now(),
                "updated_at" => now(),
            ]);
        }
    }
    /**
     * List of affiliates
     *
     * @return void
     */
    public function affiliates ()
    {
        return $this->hasMany(User::class, "user_id")->orderByDesc("created_at");
    }
    /**
     * Check if user is affiliate to given user
     *
     * @param User $user
     * @return boolean
     */
    public function hasAffiliate (User $user) 
    {
        if (!is_null($user)) {
            if (count($this->affiliates) > 0) {
                foreach ($this->affiliates as $a) {
                    if ($user->id == $a->id) {
                        return true;
                    }
                }
            }
        }   
        return false;
    }
    /**
     * Related godfather
     *
     * @return void
     */
    public function parent ()
    {
        return $this->belongsTo(User::class, "user_id");
    }
    /**
     * Related country
     *
     * @return void
     */
    public function country ()
    {
        return $this->belongsTo(Country::class, "country_id");
    }

    /**
     * Royalties produced for parent
     *
     * @return void
     */
    public function royalties ()
    {
        return $this->hasMany(Royalty::class, "user_id");
    }

    /**
     * Check if user has gained royalties
     *
     * @param Royalty $royalty
     * @return boolean
     */
    public function hasGainedRoyalty (Royalty $royalty)
    {
        if(count($this->gainedRoyalties)) {
            foreach ($this->gainedRoyalties as $r) {
                if ($r->target == $this->id) {
                    return true;
                }
            }
        }
        return false;
    }
    
    /**
     * Completed royalties
     *
     * @return void
     */
    public function royaltiesAmount ()
    {
        $amount = 0;
        if (count($this->gainedRoyalties)) {
            foreach ($this->gainedRoyalties as $r) {
                $amount += $r->value;
            }
        }
        return $amount;
    }

    /**
     * Completed royalties
     *
     * @return void
     */
    public function completedRoyalties ()
    {
        $array = [];
        if (count($this->gainedRoyalties)) {
            foreach ($this->gainedRoyalties as $r) {
                if ($r->isCompleted()) {
                    array_push($array, $r);
                }
            }
        }
        return $array;
    }

    /**
     * Completed royalties USD
     *
     * @return void
     */
    public function completedRoyaltiesUSD ()
    {
        $array = [];
        if (count($this->gainedRoyalties)) {
            foreach ($this->gainedRoyalties as $r) {
                if ($r->isCompleted()) {
                    if ($r->is_usd) {
                        array_push($array, $r);
                    }
                }
            }
        }
        return $array;
    }

    /**
     * Completed royalties XOF
     *
     * @return void
     */
    public function completedRoyaltiesXOF ()
    {
        $array = [];
        if (count($this->gainedRoyalties)) {
            foreach ($this->gainedRoyalties as $r) {
                if ($r->isCompleted()) {
                    if ($r->is_usd == 0) {
                        array_push($array, $r);
                    }
                }
            }
        }
        return $array;
    }

    /**
     * Completed royalties
     *
     * @return void
     */
    public function completedRoyaltiesAmount ()
    {
        $amount = 0;
        if (count($this->completedRoyalties())) {
            foreach ($this->completedRoyalties() as $r) {
                $amount += $r->value;
            }
        }
        return $amount;
    }

    /**
     * Completed USD royalties
     *
     * @return void
     */
    public function completedRoyaltiesAmountUSD ()
    {
        $amount = 0;
        if (count($this->completedRoyalties())) {
            foreach ($this->completedRoyalties() as $r) {
                if ($r->is_usd) {
                    $amount += $r->value;
                }
            }
        }
        return $amount;
    }

    /**
     * Completed XOF royalties
     *
     * @return void
     */
    public function completedRoyaltiesAmountXOF ()
    {
        $amount = 0;
        if (count($this->completedRoyalties())) {
            foreach ($this->completedRoyalties() as $r) {
                if ($r->is_usd == 0) {
                    $amount += $r->value;
                }
            }
        }
        return $amount;
    }

    /**
     * Completed royalties
     *
     * @return void
     */
    public function claimedRoyaltiesAmount ()
    {
        $amount = 0;
        if (count($this->claimedRoyalties())) {
            foreach ($this->claimedRoyalties() as $r) {
                $amount += $r->value;
            }
        }
        return $amount;
    }

    /**
     * Claimed royalties
     *
     * @return void
     */
    public function claimedRoyalties ()
    {
        $array = [];
        if (count($this->gainedRoyalties)) {
            foreach ($this->gainedRoyalties as $r) {
                if ($r->isClaimed() && $r->isReceived() == false) {
                    array_push($array, $r);
                }
            }
        }
        return $array;
    }

    /**
     * Elligible royalties for reward
     *
     * @return void
     */
    public function elligibleRoyalties ()
    {
        $array = [];
        $amount = 0;
        if (count($this->gainedRoyalties) > 0) {
            foreach ($this->gainedRoyalties as $r) {
                if ($r->isClaimed() == false && $r->isReceived() == false && $r->value > 0 && !is_null($r->value)) {
                    $amount += $r->value;
                    array_push($array, $r);
                }
            }
        }
        return $amount >= \App\Utils\Utils::appSettings()->royalties_threshold ? $array : [];
    }

    /**
     * Return the count of all elligible XOF royalties
     *
     * @return void
     */
    public function elligibleRoyaltiesXOF ()
    {
        $array = [];
        if (count($this->elligibleRoyalties())) {
            foreach ($this->elligibleRoyalties() as $e) {
                if ($e->is_usd == 0) {
                    array_push($array, $e);
                }
            }
        }
        return $array;
    }

    /**
     * Return the count of all elligible USD royalties
     *
     * @return void
     */
    public function elligibleRoyaltiesUSD ()
    {
        $array = [];
        if (count($this->elligibleRoyalties())) {
            foreach ($this->elligibleRoyalties() as $e) {
                if ($e->is_usd) {
                    array_push($array, $e);
                }
            }
        }
        return $array;
    }

    /**
     * Return the total amount of all elligible XOF royalties
     *
     * @return void
     */
    public function elligibleRoyaltiesXOFAmount ()
    {
        $amount = 0;
        if (count($this->elligibleRoyalties())) {
            foreach ($this->elligibleRoyalties() as $e) {
                if ($e->is_usd == 0) {
                    $amount += $e->value;
                }
            }
        }
        return $amount;
    }

    /**
     * Return the total amount of all elligible USD royalties
     *
     * @return void
     */
    public function elligibleRoyaltiesUSDAmount ()
    {
        $amount = 0;
        if (count($this->elligibleRoyalties())) {
            foreach ($this->elligibleRoyalties() as $e) {
                if ($e->is_usd) {
                    $amount += $e->value;
                }
            }
        }
        return $amount;
    }

    /**
     * Royalties created from affiliate rewards
     *
     * @return void
     */
    public function gainedRoyalties ()
    {
        return $this->hasMany(Royalty::class, "target");
    }

    /**
     * USD Royalties created from affiliate rewards
     *
     * @return void
     */
    public function gainedRoyaltiesUSD ()
    {
        $array = [];
        if (count($this->gainedRoyalties) > 0) {
            foreach ($this->gainedRoyalties as $r) {
                if ($r->is_usd) {
                    array_push($array, $r);
                }
            }
        }
        return $array;
    }

    /**
     * XOF Royalties created from affiliate rewards
     *
     * @return void
     */
    public function gainedRoyaltiesXOF ()
    {
        $array = [];
        if (count($this->gainedRoyalties) > 0) {
            foreach ($this->gainedRoyalties as $r) {
                if ($r->is_usd == 0) {
                    array_push($array, $r);
                }
            }
        }
        return $array;
    }

    /**
     * USD total Amount for Royalties created from affiliate rewards
     *
     * @return void
     */
    public function gainedRoyaltiesUSDAmount ()
    {
        $amount = 0;
        if (count($this->gainedRoyaltiesUSD()) > 0) {
            foreach ($this->gainedRoyaltiesUSD() as $r) {
                if ($r->is_usd) {
                    $amount += $r->value;
                }
            }
        }
        return $amount;
    }

    /**
     * XOF total Amount for Royalties created from affiliate rewards
     *
     * @return void
     */
    public function gainedRoyaltiesXOFAmount ()
    {
        $amount = 0;
        if (count($this->gainedRoyaltiesXOF()) > 0) {
            foreach ($this->gainedRoyaltiesXOF() as $r) {
                if ($r->is_usd == 0) {
                    $amount += $r->value;
                }
            }
        }
        return $amount;
    }

    /**
     * Related dons
     *
     * @return void
     */
    public function dons ()
    {
        return $this->hasMany(Don::class, "user_id")->orderByDesc("created_at");
    }
    /**
     * Related dons USD
     *
     * @return void
     */
    public function donsUSD ()
    {
        $array = [];
        if (count($this->dons) > 0) {
            foreach ($this->dons as $don) {
                if ($don->is_usd) {
                    array_push($array, $don);
                }
            }
        }
        return $array;
    }
    /**
     * Related dons XOF
     *
     * @return void
     */
    public function donsXOF ()
    {
        $array = [];
        if (count($this->dons) > 0) {
            foreach ($this->dons as $don) {
                if ($don->is_usd == 0) {
                    array_push($array, $don);
                }
            }
        }
        return $array;
    }
    /**
     * Related dons USD amount
     *
     * @return void
     */
    public function donsUSDAmount ()
    {
        $amount = 0;
        if (count($this->donsUSD()) > 0) {
            foreach ($this->donsUSD() as $don) {
                if ($don->is_usd) {
                    $amount += $don->amount;
                }
            }
        }
        return $amount;
    }
    /**
     * Related dons XOF amount
     *
     * @return void
     */
    public function donsXOFAmount ()
    {
        $amount = 0;
        if (count($this->donsXOF()) > 0) {
            foreach ($this->donsXOF() as $don) {
                if ($don->is_usd == 0) {
                    $amount += $don->amount;
                }
            }
        }
        return $amount;
    }
    /**
     * Check if user has don
     *
     * @param Don $don
     * @return boolean
     */
    public function hasDon (Don $don)
    {
        if (count($this->dons) > 0) {
            foreach ($this->dons as $d) {
                if ($d->id == $don->id) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Check if user has once donated the given pack
     *
     * @param Pack $pack
     * @return boolean
     */
    public function hasDonated (Pack $pack)
    {
        if (!is_null($pack)) {
            if (count($this->donsCompleted()) > 0) {
                foreach ($this->donsCompleted() as $d) {
                    if ($pack->id == $d->pack_id) {
                        return true;
                    }
                }
            }
        } return false;
    }
    /**
     * Check if user has once initiated a donation for the given pack
     *
     * @param Pack $pack
     * @return boolean
     */
    public function hasDonation (Pack $pack)
    {
        if (!is_null($pack)) {
            if (count($this->dons) > 0) {
                foreach ($this->dons as $d) {
                    if ($pack->id == $d->pack_id) {
                        return true;
                    }
                }
            }
        } return false;
    }
    /**
     * Check if user has a pending don for given pack
     *
     * @param Pack $pack
     * @return boolean
     */
    public function hasPendingDonsFor (Pack $pack)
    {
        return count($this->pendingDonsFor($pack)) > 0;
    }
    /**
     * Check if user has a pending don for given pack
     *
     * @param Pack $pack
     * @return boolean
     */
    public function pendingDonsFor (Pack $pack)
    {
        $array = [];
        if (!is_null($pack)) {
            if (count($this->dons) > 0) {
                foreach ($this->dons as $d) {
                    if ($pack->id == $d->pack_id && $d->isCompleted() == false) {
                        array_push($array, $d);
                    }
                }
            }
        } return $array;
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
    /**
     * Related completed dons USD
     *
     * @return void
     */
    public function donsCompletedUSD ()
    {
        $array = [];
        if (count($this->donsCompleted()) > 0) {
            foreach ($this->donsCompleted() as $don) {
                if ($don->is_usd) {
                    array_push($array, $don);
                }
            }
        }
        return $array;
    }
    /**
     * Related completed dons XOF
     *
     * @return void
     */
    public function donsCompletedXOF ()
    {
        $array = [];
        if (count($this->donsCompleted()) > 0) {
            foreach ($this->donsCompleted() as $don) {
                if ($don->is_usd == 0) {
                    array_push($array, $don);
                }
            }
        }
        return $array;
    }
    /**
     * Related completed dons USD Amount
     *
     * @return void
     */
    public function donsCompletedUSDAmount ()
    {
        $amount = 0;
        if (count($this->donsCompletedUSD()) > 0) {
            foreach ($this->donsCompletedUSD() as $don) {
                if ($don->is_usd) {
                    $amount += $don->amount;
                }
            }
        }
        return $amount;
    }
    /**
     * Related completed dons XOF Amount
     *
     * @return void
     */
    public function donsCompletedXOFAmount ()
    {
        $amount = 0;
        if (count($this->donsCompletedXOF()) > 0) {
            foreach ($this->donsCompletedXOF() as $don) {
                if ($don->is_usd == 0) {
                    $amount += $don->amount;
                }
            }
        }
        return $amount;
    }
    /**
     * Related completed dons amount
     *
     * @return void
     */
    public function donsCompletedAmount ()
    {
        $amount = 0;
        if (count($this->donsCompleted()) > 0) {
            foreach ($this->donsCompleted() as $don) {
                $amount += $don->amount;
            }
        }
        return $amount;
    }
    /**
     * Related first don for given pack
     *
     * @param Pack $pack
     * @return void
     */
    public function firstDon (Pack $pack)
    {
        return Don::where('user_id', $this->id)->where('pack_id', $pack->id)->where('is_first', 1)->first();
    }
    /**
     * Checks if given don is the first don for given pack
     *
     * @param Don $don
     * @param Pack $pack
     * @return boolean
     */
    public function isFirstDon (Don $don, Pack $pack)
    {
        if (!is_null($don) && !is_null($pack)) {
            if (!is_null($this->firstDon($pack))){
                return $don->id == $this->firstDon($pack)->id;
            }
        } return false;
    }
    /**
     * Related rewards
     *
     * @return void
     */
    public function rewards ()
    {
        return $this->hasMany(Reward::class, "user_id")->orderByDesc("created_at");
    }
    /**
     * Related completed rewards
     *
     * @return void
     */
    public function rewardsCompleted ()
    {
        $array = [];
        if (count($this->rewards) > 0) {
            foreach ($this->rewards as $r) {
                if ($r->isCompleted()) {
                    array_push($array, $r);
                }
            }
        }
        return $array;
    }
    /**
     * Related completed rewards USD
     *
     * @return void
     */
    public function rewardsCompletedUSD ()
    {
        $array = [];
        if (count($this->rewardsCompleted()) > 0) {
            foreach ($this->rewardsCompleted() as $r) {
                if ($r->is_usd) {
                    array_push($array, $r);
                }
            }
        }
        return $array;
    }
    /**
     * Related completed rewards XOF
     *
     * @return void
     */
    public function rewardsCompletedXOF ()
    {
        $array = [];
        if (count($this->rewardsCompleted()) > 0) {
            foreach ($this->rewardsCompleted() as $r) {
                if ($r->is_usd == 0) {
                    array_push($array, $r);
                }
            }
        }
        return $array;
    }
    /**
     * Related completed rewards amount
     *
     * @return void
     */
    public function rewardsCompletedAmount ()
    {
        $amount = 0;
        if (count($this->rewardsCompleted()) > 0) {
            foreach ($this->rewardsCompleted() as $r) {
                $amount += $r->amount;
            }
        }
        return $amount;
    }
    /**
     * Related completed rewards amount USD
     *
     * @return void
     */
    public function rewardsCompletedAmountUSD ()
    {
        $amount = 0;
        if (count($this->rewardsCompleted()) > 0) {
            foreach ($this->rewardsCompleted() as $r) {
                if ($r->is_usd) {
                    $amount += $r->amount;
                }
            }
        }
        return $amount;
    }
    /**
     * Related completed rewards amount XOF
     *
     * @return void
     */
    public function rewardsCompletedAmountXOF ()
    {
        $amount = 0;
        if (count($this->rewardsCompleted()) > 0) {
            foreach ($this->rewardsCompleted() as $r) {
                if ($r->is_usd == 0) {
                    $amount += $r->amount;
                }
            }
        }
        return $amount;
    }
    /**
     * Related rewards USD
     *
     * @return void
     */
    public function rewardsUSD ()
    {
        $array = [];
        if (count($this->rewards) > 0) {
            foreach ($this->rewards as $r) {
                if ($r->is_usd) {
                    array_push($array, $r);
                }
            }
        }
        return $array; 
    }
    /**
     * Related rewards XOF
     *
     * @return void
     */
    public function rewardsXOF ()
    {
        $array = [];
        if (count($this->rewards) > 0) {
            foreach ($this->rewards as $r) {
                if ($r->is_usd == 0) {
                    array_push($array, $r);
                }
            }
        }
        return $array; 
    }
    /**
     * Related rewards USD amount
     *
     * @return void
     */
    public function rewardsUSDAmount ()
    {
        $amount = 0;
        if (count($this->rewardsUSD()) > 0) {
            foreach ($this->rewardsUSD() as $r) {
                if ($r->is_usd) {
                    $amount += $r->amount;
                }
            }
        }
        return $amount; 
    }
    /**
     * Related rewards XOF amount
     *
     * @return void
     */
    public function rewardsXOFAmount ()
    {
        $amount = 0;
        if (count($this->rewardsUSD()) > 0) {
            foreach ($this->rewardsUSD() as $r) {
                if ($r->is_usd == 0) {
                    $amount += $r->amount;
                }
            }
        }
        return $amount; 
    }
    /**
     * Check if user has reward
     *
     * @param Don $don
     * @return boolean
     */
    public function hasReward (Reward $reward)
    {
        if (count($this->rewards) > 0) {
            foreach ($this->rewards as $r) {
                if ($r->id == $reward->id) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Check if user has fusion
     *
     * @param Fusion $fusion
     * @return boolean
     */
    public function hasFusion (Fusion $fusion)
    {
        if (count($this->relatedFusions()) > 0) {
            foreach ($this->relatedFusions() as $f) {
                if ($f->id == $fusion->id) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Related completed don reward
     *
     * @return void
     */
    public function rewardsDonCompleted ()
    {
        $array = [];
        if (count($this->rewards) > 0) {
            foreach ($this->rewards as $reward) {
                if ($reward->source == "don" && $reward->isCompleted()) {
                    array_push($array, $reward);
                }
            }
        }
        return $array;
    }
    /**
     * Related completed don rewards amount
     *
     * @return void
     */
    public function rewardsDonCompletedAmount ()
    {
        $amount = 0;
        if (count($this->rewardsDonCompleted()) > 0) {
            foreach ($this->rewardsDonCompleted() as $reward) {
                $amount += $reward->amount;
            }
        }
        return $amount;
    }
    /**
     * Related fusions
     */
    public function relatedFusions ()
    {
        return Fusion::orderByDesc('created_at')->where('sender', $this->id)->orWhere('receiver', $this->id)->get();
    }
    /**
     * Related fusions USD
     */
    public function relatedFusionsUSD ()
    {
        $array = [];
        if (count($this->relatedFusions()) > 0) {
            foreach ($this->relatedFusions() as $f) {
                if ($f->is_usd) {
                    array_push($array, $f);
                }
            }
        }
        return $array; 
    }
    /**
     * Related fusions XOF
     */
    public function relatedFusionsXOF ()
    {
        $array = [];
        if (count($this->relatedFusions()) > 0) {
            foreach ($this->relatedFusions() as $f) {
                if ($f->is_usd == 0) {
                    array_push($array, $f);
                }
            }
        }
        return $array; 
    }
    /**
     * Related fusions amount
     *
     * @return void
     */
    public function relatedFusionsAmount ()
    {
        $amount = 0;
        if (count($this->relatedFusions()) > 0) {
            foreach ($this->relatedFusions() as $f) {
                $amount += $f->amount;
            }
        }
        return $amount;
    }
    /**
     * Related fusions amount USD
     *
     * @return void
     */
    public function relatedFusionsAmountUSD ()
    {
        $amount = 0;
        if (count($this->relatedFusions()) > 0) {
            foreach ($this->relatedFusions() as $f) {
                if ($f->is_usd) {
                    $amount += $f->amount;
                }
            }
        }
        return $amount;
    }
    /**
     * Related fusions amount XOF
     *
     * @return void
     */
    public function relatedFusionsAmountXOF ()
    {
        $amount = 0;
        if (count($this->relatedFusions()) > 0) {
            foreach ($this->relatedFusions() as $f) {
                if ($f->is_usd == 0) {
                    $amount += $f->amount;
                }
            }
        }
        return $amount;
    }
    /**
     * Related fusions
     */
    public function fusions ()
    {
        return $this->hasMany(Fusion::class, "user_id")->orderByDesc("created_at");
    } 
    /**
     * Pending related fusion
     *
     * @return void
     */
    public function pendingRelatedFusions()
    {
        $array = [];
        if (count($this->relatedFusions()) > 0) {
            foreach ($this->relatedFusions() as $fusion) {
                if ($fusion->isSent() == false && $fusion->isReceived() == false) {
                    array_push($array, $fusion);
                } else if ($fusion->isSent() && $fusion->isReceived() == false) {
                    array_push($array, $fusion);
                }
            }
        }
        return $array;
    }
    /**
     * Related pending fusions amount
     *
     * @return void
     */
    public function pendingRelatedFusionsAmount ()
    {
        $amount = 0;
        if (count($this->pendingRelatedFusions()) > 0) {
            foreach ($this->pendingRelatedFusions() as $f) {
                $amount += $f->amount;
            }
        }
        return $amount;
    }
    /**
     * Pending related fusion
     *
     * @return void
     */
    public function completedRelatedFusions()
    {
        $array = [];
        if (count($this->relatedFusions()) > 0) {
            foreach ($this->relatedFusions() as $fusion) {
                if ($fusion->isCompleted()) {
                    array_push($array, $fusion);
                }
            }
        }
        return $array;
    }
    /**
     * Pending related fusion USD
     *
     * @return void
     */
    public function completedRelatedFusionsUSD()
    {
        $array = [];
        if (count($this->relatedFusions()) > 0) {
            foreach ($this->relatedFusions() as $fusion) {
                if ($fusion->isCompleted()) {
                    if ($fusion->is_usd) {
                        array_push($array, $fusion);
                    }
                }
            }
        }
        return $array;
    }
    /**
     * Pending related fusion XOF
     *
     * @return void
     */
    public function completedRelatedFusionsXOF()
    {
        $array = [];
        if (count($this->relatedFusions()) > 0) {
            foreach ($this->relatedFusions() as $fusion) {
                if ($fusion->isCompleted()) {
                    if ($fusion->is_usd == 0) {
                        array_push($array, $fusion);
                    }
                }
            }
        }
        return $array;
    }
    /**
     * Related completed fusions amount
     *
     * @return void
     */
    public function completedRelatedFusionsAmount ()
    {
        $amount = 0;
        if (count($this->completedRelatedFusions()) > 0) {
            foreach ($this->completedRelatedFusions() as $f) {
                $amount += $f->amount;
            }
        }
        return $amount;
    }
    /**
     * Related completed fusions amount USD
     *
     * @return void
     */
    public function completedRelatedFusionsAmountUSD ()
    {
        $amount = 0;
        if (count($this->completedRelatedFusions()) > 0) {
            foreach ($this->completedRelatedFusions() as $f) {
                if ($f->is_usd) {
                    $amount += $f->amount;
                }
            }
        }
        return $amount;
    }
    /**
     * Related completed fusions amount XOF
     *
     * @return void
     */
    public function completedRelatedFusionsAmountXOF ()
    {
        $amount = 0;
        if (count($this->completedRelatedFusions()) > 0) {
            foreach ($this->completedRelatedFusions() as $f) {
                if ($f->is_usd == 0) {
                    $amount += $f->amount;
                }
            }
        }
        return $amount;
    }    
}
