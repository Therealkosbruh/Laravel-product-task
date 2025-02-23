<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;


Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);      
    Route::post('/', [ProductController::class, 'store']);     
    Route::get('/{product}', [ProductController::class, 'show']); 
    Route::put('/{product}', [ProductController::class, 'update']); 
    Route::delete('/{product}', [ProductController::class, 'destroy']); 
});


Route::prefix('orders')->group(function () {
    Route::get('/', [OrderController::class, 'index']);      
    Route::post('/', [OrderController::class, 'store']);     
    Route::get('/{order}', [OrderController::class, 'show']); 
    Route::put('/{order}', [OrderController::class, 'update']); 
    Route::delete('/{order}', [OrderController::class, 'destroy']); 
});