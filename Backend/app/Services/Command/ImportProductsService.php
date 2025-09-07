<?php

namespace App\Services\Command;

use App\Models\Catalog\Product;
use App\Models\Catalog\ProductCategory;
use App\Traits\CommandTrait;

class ImportProductsService
{
    use CommandTrait;

    public function handleProducts($products)
    {
        $productsData = [];
        $existingProductSlugs = [];
        $maxProducts = 50;

        foreach ($products as $product) {
            if (count($productsData) >= $maxProducts) {
                break;
            }

            $productData = $this->handleProductArrayForInsert($product, $existingProductSlugs);

            if ($productData !== null) {
                $productsData[] = $productData;
            }
        }

        $this->bulkInsert(Product::class, $productsData);
    }

    public function handleProductArrayForInsert($product, &$existingProductSlugs)
    {
        if (empty($product['Model'])) {
            return null;
        }

        $productModelWithoutSymbols = str_replace('_', '', $product['Model']);
        $productName = $product['Brand'] . ' ' . $productModelWithoutSymbols;

        $slug = str_slug($productName);
        $counter = 1;

        while (in_array($slug, $existingProductSlugs)) {
            $slug = str_slug($productName) . '-' . $counter;
            $counter++;
        }

        $existingProductSlugs[] = $slug;

        return [
            'sku' => $product['objectId'],
            'name' => $productName,
            'description' => fake()->paragraphs(3, true),
            'slug' => $slug,
            'price' => fake()->randomFloat(2, 100, 1000),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    public function handleProductProductCategoryInsert()
    {
        $productCategories = ProductCategory::pluck('id')->toArray();
        $products = Product::pluck('id');

        $productProductCategoryData = [];

        foreach ($products as $productId) {
            $randomCategoryIds = collect($productCategories)
                ->random(rand(1, 10))
                ->toArray();

            foreach ($randomCategoryIds as $categoryId) {
                $productProductCategoryData[] = [
                    'product_id' => $productId,
                    'product_category_id' => $categoryId,
                ];
            }
        }

        $this->bulkInsertPivot('product_product_category', $productProductCategoryData);
    }
}
