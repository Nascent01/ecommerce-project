<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Catalog\ProductController;
use App\Http\Controllers\Api\Auth\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{productCategory}', [ProductController::class, 'showProductsByCategory']);
Route::get('/product/{slug}', [ProductController::class, 'show']);

Route::get('/categories', [\App\Http\Controllers\Api\Catalog\ProductCategoryController::class, 'index']);
Route::get('/category/{productCategory:id}', [\App\Http\Controllers\Api\Catalog\ProductCategoryController::class, 'show']);

Route::post('/orders', [\App\Http\Controllers\Api\Order\OrderController::class, 'store']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/products/store', [ProductController::class, 'store']);
    Route::put('/products/update/{product:slug}', [ProductController::class, 'update']);
    Route::delete('/products/delete/{product}', [ProductController::class, 'delete']);

    Route::post('/categories/store', [\App\Http\Controllers\Api\Catalog\ProductCategoryController::class, 'store']);
    Route::put('/categories/update/{productCategory:id}', [\App\Http\Controllers\Api\Catalog\ProductCategoryController::class, 'update']);
    Route::delete('/categories/delete/{productCategory:id}', [\App\Http\Controllers\Api\Catalog\ProductCategoryController::class, 'delete']);
});
