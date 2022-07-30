<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    use HasFactory;
    protected $fillable = [
        'pays_id',
        'nom_region',
        'slug',
    ];
    
    public function pays() {

        return $this->belongsTo(Pays::class);
    }

    public function provinces() {

        return $this->hasMany(Province::class);
    }
}
