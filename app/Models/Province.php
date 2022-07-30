<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;
    protected $fillable = [
        'region_id',
        'nom_province',
        'slug',
    ];
    
    public function region() {

        return $this->belongsTo(Region::class);
    }

    public function communes() {

        return $this->hasMany(Commune::class);
    }
}
