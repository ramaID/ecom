<?php

use App\Domain\Product\ProductData;
use App\Domain\Product\ProductService;
use App\Http\Requests\ProductStoreRequest;
use App\Models\Category;
use App\Models\Product;
use Spatie\LaravelData\Optional;

it('creates a product', function () {
    $category = Category::factory()->create();

    $productData = new ProductData(
        id: new Optional,
        category_id: $category->id,
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99
    );
    $service = new ProductService(new Product);
    $result = $service->creating($productData);

    expect($result->category_id)->toBe($category->id);
    expect($result->name)->toBe('Test Product');
    expect($result->description)->toBe('Test Description');
    expect($result->price)->toBe(99.99);
});

it('cli product creation', function () {
    $request = new ProductStoreRequest([
        'category' => 'Test Category',
        'name' => 'Test Product',
        'description' => 'Test Description',
        'price' => 99.99,
    ]);
    dd($request->validated());
});

// validasi CLI sama dengan POST request
