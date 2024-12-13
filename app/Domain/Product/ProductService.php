<?php

namespace App\Domain\Product;

use App\Models\Product;

final class ProductService
{
    public function creating(ProductData $data): void
    {
        Product::query()->create([
            'category_id' => $data->category_id,
            'name' => $data->name,
            'description' => $data->description,
            'price' => $data->price,
        ]);
    }
}
