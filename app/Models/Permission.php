<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];
    protected $guarded = [];

    /**
     * Related dons
     *
     * @return void
     */
    public function roles ()
    {
        return $this->hasMany(Role::class, "user_id")->orderByDesc("created_at");
    }
}
