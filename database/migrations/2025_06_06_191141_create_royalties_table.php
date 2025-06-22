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
        Schema::create('royalties', function (Blueprint $table) {
            $table->id()->autoIncrements();
            $table->string('reference')->unique()->nullable();
            $table->bigInteger('user_id')->nullable(); # The user who generated this royalty for its parent user
            $table->bigInteger('don_id')->nullable(); # Refered user don
            $table->bigInteger('reward_id')->nullable(); # Refered user reward
            $table->bigInteger('target')->nullable(); # Parent user
            $table->string('value')->nullable(); # Value
            $table->timestamp("deleted_at")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('royalties');
    }
};
