<?php

namespace App\Data;

#[\Spatie\TypeScriptTransformer\Attributes\TypeScript]
class AuthorData extends \Spatie\LaravelData\Data
{
    public function __construct(
        public string|\Spatie\LaravelData\Optional $id,
        public string $name,
    ) {}
}
