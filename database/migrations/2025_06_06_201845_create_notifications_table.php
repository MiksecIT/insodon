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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id()->autoIncrements();
            $table->string('reference')->unique()->nullable();
            $table->bigInteger('user_id')->nullable(); # The user who created the notification
            $table->string('title')->nullable();
            $table->string('image_url')->nullable();
            $table->longText('content')->nullable();
            $table->longText('target')->nullable(); # all [To all users], IDs [ID of specific users]
            $table->longText('readers')->nullable(); # IDS of those who have read this notifications
            $table->boolean('is_available')->default(false);
            $table->timestamp('available_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
