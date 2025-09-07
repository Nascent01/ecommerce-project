<?php

namespace App\Http\Controllers\Api\Catalog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\StoreProductRequest;
use App\Http\Requests\Catalog\UpdateProductRequest;
use \Illuminate\Http\JsonResponse;
use App\Services\Catalog\ProductService;
use App\Models\Catalog\Product;

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

    public function show($slug): JsonResponse
    {
        $product = $this->productService->getProductBySlug($slug);
        return response()->json($product, 200, [], JSON_PRETTY_PRINT);
    }

    public function store(StoreProductRequest $request)
    {
        $product = $this->productService->handleStore($request->validated());
        return response()->json($product, 200, [], JSON_PRETTY_PRINT);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $product = $this->productService->handleUpdate($product, $request->validated());
        return response()->json($product, 200, [], JSON_PRETTY_PRINT);
    }

    public function delete(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }
}
