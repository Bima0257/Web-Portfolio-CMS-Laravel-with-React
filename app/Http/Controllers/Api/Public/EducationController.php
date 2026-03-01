<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    public function index()
    {
        $educations = Education::query()
            ->orderByDesc('start_year')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $educations,
        ]);
    }
}
