<?php

namespace App\Http\Requests;

class UpdateAuthorRequest extends StoreAuthorRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        /** @var User */
        $user = $this->user();

        return $user->can('update', $this->author);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:2|max:255|unique:authors,name,'.$this->author->id,
        ];
    }
}
