<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('review_translations', function (Blueprint $table) {
            $table->id();
            $table->uuid('review_id');
            $table->string('locale', 5);
            $table->string('review')->nullable();
            $table->timestamps();

            $table->foreign('review_id')
                ->references('id')
                ->on('reviews')
                ->onDelete('cascade');

            $table->unique(['review_id', 'locale']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
