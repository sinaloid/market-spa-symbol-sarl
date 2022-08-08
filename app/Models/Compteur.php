<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compteur extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_user',
        'nombre_commande',
        'nombre_livraison_teminer',
        'nombre_livraison_en_cours',
        'nombre_categorie',
        'nombre_produit',
        'nombre_acheteur',
        'nombre_vendeur',
        'nombre_administrateur',
        'total_vente',
        'total_depense'
    ];
}
