<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ProductController;

Route::post('refresh', [AuthController::class, 'refresh']);
Route::post('/logout', [AuthController::class,'logout'])->name('logout.api');

Route::get('/user', [AuthController::class, 'user'])->name('user');
Route::get('/userInfos/{slug}', [AuthController::class, 'getUser']);
Route::get('productAndCategorie', [ProductController::class, 'getProduitAndCategorie']);