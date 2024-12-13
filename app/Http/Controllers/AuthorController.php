<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use App\Models\Author;
use App\Models\User;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = QueryBuilder::for(Author::class)
            ->latest('id')
            ->allowedFilters('name')
            ->allowedSorts('name')
            ->paginate(request()->get('limit', 15));

        return Inertia::render('authors/index', compact('items'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAuthorRequest $request)
    {
        Author::query()->create($request->toDto()->toArray());

        return redirect()->back()->withSuccess('Author created.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAuthorRequest $request, Author $author)
    {
        $author->update($request->toDto()->toArray());

        return redirect()->back()->withSuccess('Author updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Author $author)
    {
        /** @var User */
        $user = request()->user();

        $user->can('delete', $author) ?: abort(403);

        $author->delete();

        return redirect()->back()->withSuccess('Author deleted.');
    }
}
