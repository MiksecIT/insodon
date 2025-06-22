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
        Schema::create('rewards', function (Blueprint $table) {
            $table->id()->autoIncrements();
            $table->bigInteger('don_id')->nullable();
            $table->bigInteger('user_id')->nullable(); # Don user
            $table->string('amount')->nullable(); # The reward amount to received
            $table->string('remaining_amount')->nullable(); # The remaining amount to be fusioned [Reward's amount - Related fusions amount]
            $table->string('status')->nullable("pending_fusion"); # 0 - pending_send [Waiting for fusion], 1 - fusion_completed [All fusions created]
            $table->boolean('is_received')->default(false); # The amount has been sent by all fusion sender
            $table->timestamp('last_received_at')->nullable(); # The received_at of the last related fusion
            $table->timestamp("deleted_at")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rewards');
    }
};
