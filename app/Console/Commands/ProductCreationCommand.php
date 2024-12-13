<?php

namespace App\Console\Commands;

use App\Domain\Product\ProductData;
use App\Domain\Product\ProductService;
use App\Models\Category;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Spatie\LaravelData\Optional;

class ProductCreationCommand extends Command
{
    public function __construct(
        private ProductService $service
    ) {
        parent::__construct();
    }

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:product-creation';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $category = $this->ask('What is the category of the product?');
        $name = $this->ask('What is the name of the product?');
        $desc = $this->ask('What is the description of the product?');
        $price = $this->ask('What is the price of the product?');

        if (! $desc) {
            $desc = new Optional;
        }

        DB::beginTransaction();

        try {
            $category = Category::query()->firstOrCreate(['name' => $category], ['name' => $category]);
            $dto = new ProductData(
                id: new Optional,
                name: $name,
                description: $desc,
                price: $price,
                category_id: $category->id,
            );
            $this->service->creating($dto);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();

            report($th);

            $this->warn('Product creation failed!');

            return self::FAILURE;
        }

        $this->info('Product created successfully!');

        return self::SUCCESS;
    }
}
