<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable =[
        'libelle',
        'sku',
        'stock',
        'prix',
        'description',
        'categorie_id',
        'user_id',
        'slug'
    ];

    public function categorie() {

        return $this->belongsTo(Categorie::class);
    }

    public function user() {

        return $this->belongsTo(User::class);
    }

    public function reduction() {

        return $this->hasOne(Reduction::class);
    }
    public function venteRecommandation() {

        return $this->hasOne(VenteRecommandation::class);
    }

    public function images() {
        return $this->hasMany(Image::class);
    }

    public function commandeDetails() {
        return $this->hasMany(CommandeDetail::class);
    }

    public function commentaires() {
        return $this->hasMany(Commentaire::class);
    }
}
