<?php

use App\Http\Controllers\Api\MakeOrderController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

Route::post('product', [ProductController::class, 'store'])->name('api.product.store');
Route::post('order', MakeOrderController::class)->name('api.order.store');
