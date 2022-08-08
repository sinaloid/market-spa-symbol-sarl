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
        Schema::create('stat_regions', function (Blueprint $table) {
            $table->id();
            $table->integer('boucle_mouhoun');
            $table->integer('cascade');
            $table->integer('centre');
            $table->integer('centre_est');
            $table->integer('centre_nord');
            $table->integer('centre_ouest');
            $table->integer('centre_sud');
            $table->integer('est');
            $table->integer('haut_bassin');
            $table->integer('nord');
            $table->integer('plateau_centrale');
            $table->integer('sahel');
            $table->integer('sud_ouest');
            $table->timestamps();

            $table->unsignedBigInteger('statistique_id')->unique();
            $table->foreign('statistique_id')
                    ->references('id')
                    ->on('statistiques')
                    ->onDelete('restrict')
                    ->onUpdate('restrict');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stat_regions');
    }
};
