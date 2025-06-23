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
        Schema::create('creative_economy_translations', function (Blueprint $table) {
            $table->id();
            $table->uuid('creative_economy_id');
            $table->string('locale', 5); // 'en', 'id', 'jp', etc.
            $table->text('description')->nullable();
            $table->string('facilities')->nullable();
            $table->timestamps();

            $table->foreign('creative_economy_id')
                ->references('id')
                ->on('creative_economy')
                ->onDelete('cascade');

            $table->unique(['creative_economy_id', 'locale']); // tidak duplikat per bahasa
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
