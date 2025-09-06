<?php

namespace App\Http\Controllers\Api\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Catalog\Product;
use \Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        $products = Product::with('categories')
            ->orderByDesc('created_at')
            ->get();

        return response()->json($products, 200, [], JSON_PRETTY_PRINT);
    }

    public function showProductsByCategory($productCategory): JsonResponse
    {
        $products = Product::whereHas('categories', function ($query) use ($productCategory) {
            $query->where('id', $productCategory);
        })->with('categories')->get();

        return response()->json($products, 200, [], JSON_PRETTY_PRINT);
    }
}
