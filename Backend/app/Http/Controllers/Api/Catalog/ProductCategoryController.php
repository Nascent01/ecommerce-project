<?php

namespace App\Http\Controllers\Api\Catalog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\StoreProductCategoryRequest;
use App\Http\Requests\Catalog\UpdateProductCategoryRequest;
use App\Models\Catalog\ProductCategory;

class ProductCategoryController extends Controller
{
    public function index()
    {
        return response()->json(ProductCategory::all(), 200, [], JSON_PRETTY_PRINT);
    }

    public function show(ProductCategory $productCategory)
    {
        return response()->json($productCategory, 200, [], JSON_PRETTY_PRINT);
    }

    public function store(StoreProductCategoryRequest $request)
    {
        $productCategory = ProductCategory::create($request->validated());
        return response()->json($productCategory, 200, [], JSON_PRETTY_PRINT);
    }

    public function update(UpdateProductCategoryRequest $request, ProductCategory $productCategory)
    {
        $productCategory->update($request->validated());
        return response()->json($productCategory, 200, [], JSON_PRETTY_PRINT);
    }

    public function delete(ProductCategory $productCategory)
    {
        $productCategory->delete();
        return response()->json(null, 204);
    }
}
