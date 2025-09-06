<?php

namespace App\Http\Controllers\Api\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Catalog\ProductCategory;

class ProductCategoryController extends Controller
{
    public function index()
    {
        return response()->json(ProductCategory::all(), 200, [], JSON_PRETTY_PRINT);
    }
}
