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
        Schema::create('accomodation_translations', function (Blueprint $table) {
            $table->id();
            $table->uuid('accomodation_id');
            $table->string('locale', 5);
            $table->text('description')->nullable();
            $table->string('facilities')->nullable();
            $table->timestamps();

            $table->foreign('accomodation_id')
                ->references('id')
                ->on('accomodations')
                ->onDelete('cascade');

            $table->unique(['accomodation_id', 'locale']);
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
