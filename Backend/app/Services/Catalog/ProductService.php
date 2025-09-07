<?php

namespace App\Services\Catalog;

use App\Models\Catalog\Product;
use Illuminate\Support\Arr;

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

    public function handleStore($request)
    {
        $categories = Arr::pull($request, 'category');

        $product = Product::create($request);

        if ($categories !== null) {
            $product->categories()->sync($categories);
        }

        $product->load('categories');

        return $product;
    }

    public function handleUpdate($product, $request)
    {
        $categories = Arr::pull($request, 'category');

        $product->update($request);

        if ($categories !== null) {
            $product->categories()->sync($categories);
        }

        $product->load('categories');

        return $product;
    }
}
