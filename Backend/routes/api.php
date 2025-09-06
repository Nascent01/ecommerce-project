<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/products', [\App\Http\Controllers\Api\Catalog\ProductController::class, 'index']);
Route::get('/products/{productCategory}', [\App\Http\Controllers\Api\Catalog\ProductController::class, 'showProductsByCategory']);
Route::get('/products/{product}', [\App\Http\Controllers\Api\Catalog\ProductController::class, 'show']);
Route::post('/products', [\App\Http\Controllers\Api\Catalog\ProductController::class, 'store']);

Route::put('/products/{product}', [\App\Http\Controllers\Api\Catalog\ProductController::class, 'update']);
Route::delete('/products/{product}', [\App\Http\Controllers\Api\Catalog\ProductController::class, 'destroy']);

Route::post('/orders', [\App\Http\Controllers\Api\Order\OrderController::class, 'store']);

Route::get('/categories', [\App\Http\Controllers\Api\Catalog\ProductCategoryController::class, 'index']);
