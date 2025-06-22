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
        Schema::create('dons', function (Blueprint $table) {
            $table->id()->autoIncrements();
            $table->string('reference')->unique()->nullable();
            $table->bigInteger('user_id')->nullable(); # The person who makes a don
            $table->bigInteger('pack_id')->nullable(); # The related pack or null if it's reward
            $table->string('amount')->nullable(); # The related pack amount
            $table->string('remaining_amount')->nullable(); # The remaining amount to be fusioned [Don's amount - Related fusions amount]
            $table->string('status')->nullable("pending_fusion"); # 0 - pending_send [Waiting for fusion], 1 - fusion_completed [All fusions created]
            $table->boolean('is_sent')->default(false); # The amount has been sent to all fusion receivers
            $table->timestamp('last_sent_at')->nullable(); # The sent_at of the last related fusion
            $table->timestamp("deleted_at")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dons');
    }
};
