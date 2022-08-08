<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;
    protected $fillable = [
        'numero_commande',
        'date',
        'prix_total',
        'etat_livraison',
        'etat_commande',
        'slug',
        'user_id',
    ];
    
    public function user() {

        return $this->belongsTo(User::class);
    }

    public function commandeDetails() {

        return $this->hasMany(CommandeDetail::class);
    }

    public function paiement() {

        return $this->hasOne(Paiement::class);
    }
}
