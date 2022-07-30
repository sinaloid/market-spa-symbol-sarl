<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ProductController;


Route::get('/vendeur/products', [ProductController::class, 'index'])->middleware('api.vendeur')->name('vendeur.products');
