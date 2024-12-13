<?php

use App\Domain\Product\ProductData;
use App\Domain\Product\ProductService;
use App\Models\Product;
use Spatie\LaravelData\Optional;

it('creates a product', function () {
    // Arrange
    /** @var Product $productMock */
    $productMock = Mockery::mock('App\Models\Product');
    $productMock->shouldReceive('getAttribute')->with('category_id')->andReturn(1);
    $productMock->shouldReceive('getAttribute')->with('name')->andReturn('Test Product');
    $productMock->shouldReceive('getAttribute')->with('description')->andReturn('Test Description');
    $productMock->shouldReceive('getAttribute')->with('price')->andReturn(99.99);
    $productMock->shouldReceive('query')->once()->andReturn($productMock);
    $productMock->shouldReceive('create')
        ->once()
        ->with([
            'category_id' => 1,
            'name' => 'Test Product',
            'description' => 'Test Description',
            'price' => 99.99,
        ])
        ->andReturn($productMock);

    $productData = new ProductData(
        id: new Optional,
        category_id: 1,
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99
    );

    $service = new ProductService($productMock);

    // Act
    $result = $service->creating($productData);

    // Assert
    expect($result->category_id)->toBe(1);
    expect($result->name)->toBe('Test Product');
    expect($result->description)->toBe('Test Description');
    expect($result->price)->toBe(99.99);
});
