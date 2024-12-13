<?php

namespace App\Http\Requests;

use App\Data\AuthorData;
use App\Models\Author;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class StoreAuthorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        /** @var User */
        $user = $this->user();

        return $user->can('create', Author::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:2|max:255|unique:authors,name',
        ];
    }

    public function toDto(): AuthorData
    {
        return AuthorData::from($this->validated());
    }
}
