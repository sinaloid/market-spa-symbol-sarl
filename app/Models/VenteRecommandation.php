<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VenteRecommandation extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'type'
    ];

    public function product() {

        return $this->belongsTo(Product::class);
    }
}
