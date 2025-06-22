<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id()->autoIncrements();
            $table->string('firstname')->nullable();
            $table->string('lastname')->nullable();
            $table->string('pseudo')->unique()->nullable();
            $table->string('name')->unique();
            
            $table->string('email')->unique();
            $table->string('phone_number')->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            
            $table->string('profile_image_url')->nullable();

            $table->boolean('is_blocked')->default(false);
            $table->boolean('is_activated')->default(false);
            $table->timestamp("blocked_at")->nullable();
            $table->timestamp("activated_at")->nullable();
            $table->timestamp("blocked_until")->nullable();
            
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
