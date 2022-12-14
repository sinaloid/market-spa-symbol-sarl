<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reduction extends Model
{
    use HasFactory;
    protected $fillable = [
        'pourcentage',
        'date',
        'product_id',
    ];
    
    public function product() {

        return $this->belongsTo(Product::class);
    }

    
}
