<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = QueryBuilder::for(Book::class)
            ->latest('id')
            ->allowedFilters('title')
            ->allowedSorts('title')
            ->paginate(request()->get('limit', 15));

        return Inertia::render('books/index', compact('items'));
    }
}
