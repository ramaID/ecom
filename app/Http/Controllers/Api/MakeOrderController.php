<?php

namespace App\Http\Controllers\Api;

use App\Domain\Order\OrderData;
use App\Domain\Order\OrderService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MakeOrderController extends Controller
{
    public function __construct(
        private OrderService $service
    ) {}

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['required', 'numeric', 'min:1'],
            'total_price' => ['required', 'numeric'],
        ]);

        $dto = OrderData::fromRequest($request);

        $this->service->creating($dto);

        return response()->json(['message' => 'Order created successfully'], 201);
    }
}
