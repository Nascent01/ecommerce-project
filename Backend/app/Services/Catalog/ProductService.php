<?php

namespace App\Services\Catalog;

use App\Models\Catalog\Product;

class ProductService
{
    public function getProducts()
    {
        return Product::with('categories')->get();
    }

    public function getProductsFilterredByCategory($productCategory)
    {
        if (empty($productCategory)) {
            return $this->getProducts();
        }
        return Product::whereHas('categories', function ($query) use ($productCategory) {
            $query->where('id', $productCategory);
        })->with('categories')->get();
    }

    public function getProductBySlug($slug)
    {
        return Product::where('slug', $slug)->with('categories')->firstOrFail();
    }
}
