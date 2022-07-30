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
        'etat',
        'user_id',
    ];
    
    public function user() {

        return $this->belongsTo(User::class);
    }

    public function commandeDetails() {

        return $this->hasMany(User::class);
    }
}
