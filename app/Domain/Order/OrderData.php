<?php

namespace App\Domain\Order;

use Spatie\LaravelData\Optional;

#[\Spatie\TypeScriptTransformer\Attributes\TypeScript]
class OrderData extends \Spatie\LaravelData\Data
{
    public function __construct(
        public string|Optional $id,
        public string $product_id,
        public int $quantity,
        public int $total_price,
    ) {}

    public static function fromRequest(\Illuminate\Http\Request $request)
    {
        return new self(
            id: $request->input('id') ?? new Optional,
            product_id: $request->input('product_id'),
            quantity: $request->input('quantity'),
            total_price: $request->input('total_price'),
        );
    }
}
