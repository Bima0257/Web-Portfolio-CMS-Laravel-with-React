<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExperienceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'position'    => 'required|string|max:255',
            'company'     => 'required|string|max:255',
            'url'         => 'nullable|string|max:255',
            'start_date'  => 'required|date',
            'end_date'    => 'nullable|date|after_or_equal:start_date',
            'is_current'  => 'nullable|boolean',
            'description' => 'nullable|string',
            'sort_order' => ['nullable', 'integer', 'min:1'],
        ];
    }

    protected function prepareForValidation(): void
    {
        if ($this->is_current) {
            $this->merge([
                'end_date' => null,
            ]);
        }
    }
}
