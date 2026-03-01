<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AboutRequest;
use App\Models\About;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function index()
    {
        $about = About::first();

        if (!$about) {
            $about = About::create([
                'name'        => 'Your Name',
                'age'         => 0,
                'expertise'   => 'Your Expertise',
                'experience'  => 0,
                'description' => 'Silakan perbarui deskripsi profil Anda.',
                'photo'       => null,
                'cv_url'      => null,
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => [
                ...$about->toArray(),
                'photo_url' => $about->photo
                    ? asset('storage/' . $about->photo)
                    : null,
                'cv_url_full' => $about->cv_url
                    ? asset('storage/' . $about->cv_url)
                    : null,
            ],
        ]);
    }

    public function update(AboutRequest $request)
    {
        $about = About::firstOrFail();

        $data = $request->validated();

        /**
         * Upload CV
         */
        if ($request->hasFile('cv_file')) {

            if ($about->cv_url && Storage::disk('public')->exists($about->cv_url)) {
                Storage::disk('public')->delete($about->cv_url);
            }

            $data['cv_url'] = $request->file('cv_file')
                ->store('cv', 'public');
        }

        /**
         * Upload Photo
         */
        if ($request->hasFile('photo')) {

            if ($about->photo && Storage::disk('public')->exists($about->photo)) {
                Storage::disk('public')->delete($about->photo);
            }

            $data['photo'] = $request->file('photo')
                ->store('about', 'public');
        }

        $about->update($data);

        return response()->json([
            'success' => true,
            'message' => 'About berhasil diperbarui',
            'data'    => $about,
        ]);
    }
}
