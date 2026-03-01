<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::with([
            'category',
            'skills:id,name,icon'
        ])
            ->orderBy('sort_order')
            ->orderBy('created_at', 'desc');

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        return response()->json([
            'status' => true,
            'data' => $query->get()
        ]);
    }


    /**
     * GET /api/projects/{id}
     */
    public function show($id)
    {
        return response()->json([
            'status' => true,
            'data' => Project::with('category')->findOrFail($id)
        ]);
    }
}
