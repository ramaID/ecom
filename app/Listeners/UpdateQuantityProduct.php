<?php

namespace App\Listeners;

use App\Events\CustomOrderCreated;
use App\Models\Product;

class UpdateQuantityProduct
{
    /**
     * Handle the event.
     */
    public function handle(CustomOrderCreated $event): void
    {
        $order = $event->order;

        /** @var Product */
        $product = Product::query()->find($order->product_id);

        $product->quantity = $product->quantity - $order->quantity;
        $product->save();
    }
}
