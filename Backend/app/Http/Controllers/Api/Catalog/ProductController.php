<?php

namespace App\Http\Controllers\Api\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Catalog\Product;
use \Illuminate\Http\JsonResponse;
use App\Services\Catalog\ProductService;

class ProductController extends Controller
{
    public function __construct(
        private ProductService $productService
    ) {}

    public function index(): JsonResponse
    {
        $products = $this->productService->getProducts();
        return response()->json($products, 200, [], JSON_PRETTY_PRINT);
    }

    public function showProductsByCategory($productCategory): JsonResponse
    {
        $products = $this->productService->getProductsFilterredByCategory($productCategory);
        return response()->json($products, 200, [], JSON_PRETTY_PRINT);
    }
}
