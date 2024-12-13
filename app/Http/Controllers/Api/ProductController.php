<?php

namespace App\Http\Controllers\Api;

use App\Domain\Product\ProductData;
use App\Domain\Product\ProductService;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductStoreRequest;

class ProductController extends Controller
{
    public function __construct(
        private ProductService $productService
    ) {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductStoreRequest $request)
    {
        $dto = ProductData::fromRequest($request);

        $this->productService->creating($dto);

        return response()->json(['message' => 'Product created successfully'], 201);
    }
}
