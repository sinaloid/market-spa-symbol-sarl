<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;



Route::get('/all/users', [AuthController::class, 'user'])->middleware('api.admin')->name('all.users');
