<?php

namespace Database\Seeders\Catalog;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Catalog\ProductCategory;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categoryNames = [
            'Phone Category 1',
            'Phone Category 2',
            'Phone Category 3',
            'Phone Category 4',
            'Phone Category 5',
            'Phone Category 6',
            'Phone Category 7',
            'Phone Category 8',
            'Phone Category 9',
            'Phone Category 10',
        ];

        foreach ($categoryNames as $categoryName) {
            ProductCategory::create([
                'name' => $categoryName,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
