<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommandeDetail extends Model
{
    use HasFactory;
    protected $fillable =[
        'prix',
        'reduction',
        'quantite',
        'commande_id',
        'product_id',
    ];

    public function commande() {

        return $this->hasOne(Commande::class);
    }

    public function product() {

        return $this->belongsTo(Product::class);
    }

}
