<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AboutRequest extends FormRequest
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
            'name'        => 'sometimes|string|max:255',
            'age'         => 'sometimes|integer|min:0',
            'expertise'   => 'sometimes|string|max:255',
            'experience'  => 'sometimes|integer|min:0',
            'description' => 'sometimes|string',

            'photo'   => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'cv_file' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
        ];
    }
}
