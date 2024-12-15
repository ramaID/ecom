<?php

namespace App\Listeners;

use App\Domain\Product\ProductService;
use App\Events\OrderCreated;

class UpdatingQuantityProduct
{
    public function __construct(
        private ProductService $service,
    ) {}

    /**
     * Handle the event.
     */
    public function handle(OrderCreated $event): void
    {
        $order = $event->order;

        $this->service->updatingStock(
            $order->product_id,
            $order->quantity,
        );
    }
}
