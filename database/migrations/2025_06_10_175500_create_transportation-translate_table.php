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
        Schema::create('transportation_translations', function (Blueprint $table) {
            $table->id();
            $table->uuid('transportation_id');
            $table->string('locale', 5); // 'en', 'id', 'jp', etc.
            $table->text('description')->nullable();
            $table->string('facilities')->nullable();
            $table->timestamps();

            $table->foreign('transportation_id')
                ->references('id')
                ->on('transportations')
                ->onDelete('cascade');

            $table->unique(['transportation_id', 'locale']); // tidak duplikat per bahasa
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
