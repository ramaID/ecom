<?php

namespace App\Domain\Product;

use Spatie\LaravelData\Optional;

#[\Spatie\TypeScriptTransformer\Attributes\TypeScript]
class ProductData extends \Spatie\LaravelData\Data
{
    public function __construct(
        public string|Optional $id,
        public string $category_id,
        public string $name,
        public string|Optional $description,
        public float|Optional $price,
    ) {}

    public static function fromRequest(\Illuminate\Http\Request $request)
    {
        return new self(
            id: $request->input('id') ?? new Optional,
            category_id: $request->input('category_id'),
            name: $request->input('name'),
            description: $request->input('description'),
            price: $request->input('price'),
        );
    }
}
