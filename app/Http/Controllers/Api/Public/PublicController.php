<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => true,
            'data' => Project::orderBy('sort_order', 'asc')->get()
        ]);
    }
}
