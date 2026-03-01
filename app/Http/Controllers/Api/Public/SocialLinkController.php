<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\SocialLink;
use Illuminate\Http\Request;

class SocialLinkController extends Controller
{
    public function index()
    {
        $socialLinks = SocialLink::query()
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $socialLinks,
        ]);
    }
}
