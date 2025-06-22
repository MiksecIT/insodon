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
        Schema::create('app_settings', function (Blueprint $table) {
            $table->id();

            $table->boolean('enable_payment_orange_money')->default(false);
            $table->boolean('enable_payment_mtn_money')->default(false);
            $table->boolean('enable_payment_moov_money')->default(false);
            $table->boolean('enable_payment_wave_money')->default(false);
            $table->boolean('enable_payment_crypto_usdt')->default(false);
            $table->boolean('enable_payment_crypto_bnb')->default(false);
            $table->boolean('enable_payment_crypto_eth')->default(false);
            $table->boolean('enable_payment_crypto_sol')->default(false);

            $table->string('app_wallet_orange')->nullable();
            $table->string('app_wallet_mtn')->nullable();
            $table->string('app_wallet_moov')->nullable();
            $table->string('app_wallet_wave')->nullable();
            $table->string('app_wallet_usdt')->nullable();
            $table->string('app_wallet_bnb')->nullable();
            $table->string('app_wallet_eth')->nullable();
            $table->string('app_wallet_sol')->nullable();

            $table->boolean('enable_first_reward_lock')->default(false); # Block 50% of the first reward if the don is the first of current month
            $table->boolean('enable_reward_fees')->default(false);
            $table->string('reward_fees')->nullable();

            $table->boolean('enable_royalties')->default(false); # Bonus per referal users
            $table->string('royalties_percent')->nullable();

            $table->boolean('enable_suspension')->default(false);
            $table->string('suspension_delay')->nullable(); # Delay in days
            $table->text('suspension_message')->nullable(); # # Activation message

            $table->boolean('enable_activation')->default(false); # Activate an account before it uses the app
            $table->text('activation_message')->nullable(); # Activation message

            $table->boolean('enable_notifications')->default(false);
            $table->boolean('enable_messages')->default(false);
            $table->boolean('enable_profile_edit')->default(false);
            $table->boolean('allow_profile_image')->default(false);
            $table->boolean('enable_id_card_upload')->default(false);
            $table->boolean('enable_upload')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('app_settings');
    }
};
