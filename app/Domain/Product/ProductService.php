<?php

namespace App\Domain\Product;

use App\Models\Product;
use Spatie\LaravelData\Optional;
use UnexpectedValueException;

final class ProductService
{
    public function __construct(
        private Product $model
    ) {}

    public function creating(ProductData $data): Product
    {
        $description = $data->description instanceof Optional
            ? null
            : $data->description;

        return $this->model->query()->create([
            'category_id' => $data->category_id,
            'name' => $data->name,
            'description' => $description,
            'price' => $data->price,
        ]);
    }

    public function updatingStock(string $id, int $quantity): void
    {
        $product = $this->model->query()->findOrFail($id);

        if ($product->quantity < $quantity) {
            throw new UnexpectedValueException('Insufficient stock', 400);
        }

        $product->quantity = $product->quantity - $quantity;
        $product->save();
    }
}
