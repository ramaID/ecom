<?php

use App\Models\Author;
use App\Models\User;

use function Pest\Laravel\get;

it('tidak bisa membuka halaman penulis tanpa login', function () {
    get('/authors')->assertRedirect('/login');
});

beforeEach(function () {
    $this->user = User::factory()->create(['email' => 'test@example.com']);
});

it('user bisa membuka halaman penulis', function () {
    $this->actingAs($this->user)->get('/authors')->assertOk();
});

it('user bisa menambahkan penulis baru', function () {
    $this->actingAs($this->user)->post('/authors', [
        'name' => 'John Doe',
    ])->assertRedirect('/');
});

beforeEach(function () {
    $this->author = Author::factory()->create();
});

it('user bisa memperbarui penulis', function () {
    $this->actingAs($this->user)->put('/authors/'.$this->author->id, [
        'name' => 'John Doe',
    ])->assertRedirect('/');
});

it('user bisa menghapus penulis', function () {
    $this->actingAs($this->user)->delete('/authors/'.$this->author->id)->assertRedirect('/');
});
