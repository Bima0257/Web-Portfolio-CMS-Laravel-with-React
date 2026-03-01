<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\ProjectCategories;

class ProjectCategoryController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => true,
            'data' => ProjectCategories::select('id', 'name', 'slug')->whereHas('projects')
                ->orderBy('sort_order')->get()
        ]);
    }
}
