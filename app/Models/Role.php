<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];
    protected $guarded = [];

    /**
     * Related dons
     *
     * @return void
     */
    public function users ()
    {
        return $this->hasMany(User::class, "role_id")->orderByDesc("created_at");
    }

    /**
     * Related permissions
     *
     * @return void
     */
    public function permissions ()
    {
        return $this->belongsToMany(Permission::class);
    }
}
