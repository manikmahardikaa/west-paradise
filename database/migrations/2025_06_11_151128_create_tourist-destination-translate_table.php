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
        Schema::create('tourist_destination_translations', function (Blueprint $table) {
            $table->id();
            $table->uuid('tourist_destination_id');
            $table->string('locale', 5);
            $table->string('name')->nullable();
            $table->text('description')->nullable();
            $table->string('facilities')->nullable();
            $table->timestamps();

            $table->foreign('tourist_destination_id')
                ->references('id')
                ->on('tourist_destinations')
                ->onDelete('cascade');

            // Perbaiki nama unik index
            $table->unique(['tourist_destination_id', 'locale'], 'td_id_locale_unique');
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
