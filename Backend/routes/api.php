<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Catalog\ProductController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{productCategory}', [ProductController::class, 'showProductsByCategory']);
Route::get('/product/{slug}', [ProductController::class, 'show']);

Route::get('/categories', [\App\Http\Controllers\Api\Catalog\ProductCategoryController::class, 'index']);

Route::post('/orders', [\App\Http\Controllers\Api\Order\OrderController::class, 'store']);
