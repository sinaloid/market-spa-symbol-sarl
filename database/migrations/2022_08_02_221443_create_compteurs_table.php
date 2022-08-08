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
        Schema::create('compteurs', function (Blueprint $table) {
            $table->id();
            $table->integer("nombre_user")->default('0');
            $table->integer("nombre_commande")->default('0');
            $table->integer("nombre_livraison_teminer")->default('0');
            $table->integer("nombre_livraison_en_cours")->default('0');
            $table->integer("nombre_categorie")->default('0');
            $table->integer("nombre_produit")->default('0');
            $table->integer("nombre_acheteur")->default('0');
            $table->integer("nombre_vendeur")->default('0');
            $table->integer("nombre_administrateur")->default('0');
            $table->integer("total_vente")->default('0');
            $table->integer("total_depense")->default('0');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('compteurs');
    }
};
