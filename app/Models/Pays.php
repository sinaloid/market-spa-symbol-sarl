<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pays extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_pays',
        'slug',
    ];

    public function regions() {

        return $this->hasMany(Region::class);
    }
}
