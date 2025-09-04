<?php

namespace App\Console\Commands\Catalog;

use Illuminate\Console\Command;
use App\Traits\CommandTrait;
use Illuminate\Support\Facades\Artisan;

class ImportProducts extends Command
{
    use CommandTrait;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:import-products';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import products from json file';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $scriptTimeStart =  $this->displayCommandStart('Importing products has started...');

        $this->truncateTables([
            'products',
            'product_categories',
            'product_product_category',
        ], true);

        Artisan::call('db:seed', ['class' => 'Database\Seeders\Product\ProductCategorySeeder']);

        $productsPath = storage_path('app/private/Products.json');
        $products = json_decode(file_get_contents($productsPath), true);


        $this->displayExecutionTime($scriptTimeStart);
    }
}
