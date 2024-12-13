<?php

namespace Database\Seeders;

class AuthorSeeder extends \Illuminate\Database\Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Author::factory(10000)->create();
    }
}
