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
        Schema::create('fusions', function (Blueprint $table) {
            $table->id()->autoIncrements();
            $table->bigInteger('user_id')->nullable(); # The user who created the fusion
            $table->bigInteger('don_id')->nullable(); # The related donation
            $table->bigInteger('reward_id')->nullable(); # Related reward
            $table->string('target')->nullable(); # donation [Fusion for don], reward [Fusion for Reward]
            $table->string('amount')->nullable(); # The amount to be send
            $table->bigInteger('sender')->nullable(); # The user who sends money
            $table->bigInteger('receiver')->nullable(); # The user who receives the money
            $table->boolean('is_sent')->default(false); # The sender has confirm
            $table->boolean('is_received')->default(false); # The receiver has confirm
            $table->timestamp('sent_at')->nullable(); # Sent date time
            $table->timestamp('received_at')->nullable(); # Received date time
            $table->string('status')->default("pending_send"); # 0- pending_send [Created and waiting sender to confirm], 1- pending_receipt [Waiting receiver to confirm], 2- completed [sent and received with success]
            $table->timestamp('status_at')->nullable(); # Last date of status change
            $table->text('status_comment')->nullable(); # Status stage comment
            $table->timestamp("deleted_at")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fusions');
    }
};
