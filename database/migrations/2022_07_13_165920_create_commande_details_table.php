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
        Schema::create('commande_details', function (Blueprint $table) {
            $table->id();
            $table->string('prix');
            $table->integer("reduction");
            $table->integer("quantite");
            $table->timestamps();

            $table->unsignedBigInteger('commande_id');
            $table->foreign('commande_id')
                    ->references('id')
                    ->on('commandes')
                    ->onDelete('restrict')
                    ->onUpdate('restrict');

            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')
                    ->references('id')
                    ->on('products')
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
        Schema::dropIfExists('commande_details');
    }
};
