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
        Schema::create('settings', function (Blueprint $table) {
            $table->id()->autoIncrements();
            $table->string('reference')->unique()->nullable();
            $table->bigInteger('user_id')->nullable();
            $table->string('payment_orange_money')->unique()->nullable();
            $table->string('payment_mtn_mooney')->unique()->nullable();
            $table->string('payment_moov_money')->unique()->nullable();
            $table->string('payment_wave_money')->unique()->nullable();
            $table->string('payment_crypto_usdt')->unique()->nullable();
            $table->string('payment_crypto_bnb')->unique()->nullable();
            $table->string('payment_crypto_eth')->unique()->nullable();
            $table->string('payment_crypto_sol')->unique()->nullable();
            $table->timestamp("deleted_at")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
