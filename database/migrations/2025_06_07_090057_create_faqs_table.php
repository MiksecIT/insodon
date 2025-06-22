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
        Schema::create('faqs', function (Blueprint $table) {
            $table->id()->autoIncrements();
            $table->string('reference')->unique()->nullable();
            $table->bigInteger('user_id')->nullable(); # The user who created the notification
            $table->bigInteger('faq_id')->nullable();
            $table->string('title')->nullable();
            $table->longText('content')->nullable();
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
        Schema::dropIfExists('faqs');
    }
};
