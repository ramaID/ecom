<?php

namespace App\Domain\Order;

use App\Events\CustomOrderCreated;
use App\Models\Order;

final class OrderService
{
    public function __construct(
        private Order $model
    ) {}

    public function creating(OrderData $data): Order|bool
    {
        try {
            $result = $this->model->query()->create([
                'product_id' => $data->product_id,
                'quantity' => $data->quantity,
                'total_price' => $data->total_price,
            ]);

            CustomOrderCreated::dispatch($result);

            return $result;
        } catch (\Exception $th) {
            report($th);

            return false;
        }
    }
}
