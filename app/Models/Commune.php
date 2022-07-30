<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commune extends Model
{
    use HasFactory;
    protected $fillable = [
        'province_id',
        'nom_commune',
        'slug',
    ];
    
    public function province() {

        return $this->belongsTo(Province::class);
    }

    public function users() {

        return $this->hasMany(User::class);
    }
}
