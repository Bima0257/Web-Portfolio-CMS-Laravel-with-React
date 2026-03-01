<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index()
    {
        $experiences = Experience::query()
            ->orderByDesc('start_date')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $experiences,
        ]);
    }
}
