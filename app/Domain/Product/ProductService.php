<?php

namespace App\Domain\Product;

use App\Models\Product;
use Spatie\LaravelData\Optional;

final class ProductService
{
    public function creating(ProductData $data): void
    {
        $description = $data->description instanceof Optional
            ? null
            : $data->description;

        Product::query()->create([
            'category_id' => $data->category_id,
            'name' => $data->name,
            'description' => $description,
            'price' => $data->price,
        ]);
    }
}
