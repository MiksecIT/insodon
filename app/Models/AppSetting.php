<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppSetting extends Model
{
    use HasFactory;
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];
    protected $guarded = [];
}
