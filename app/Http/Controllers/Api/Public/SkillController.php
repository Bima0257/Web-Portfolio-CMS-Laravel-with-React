<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        $skills = Skill::query()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $skills,
        ]);
    }
}
