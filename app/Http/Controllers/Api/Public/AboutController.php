<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function index()
    {
        $about = About::first();

        if ($about) {
            $about->photo = asset('storage/' . $about->photo);
            $about->cv_url = asset('storage/' . $about->cv_url);
        }

        return response()->json([
            'success' => true,
            'data' => $about,
        ]);
    }
}
