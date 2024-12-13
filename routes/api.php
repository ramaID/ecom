<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

Route::post('product', [ProductController::class, 'store'])->name('api.product.store');
