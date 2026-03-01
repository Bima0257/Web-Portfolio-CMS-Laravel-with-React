<?php

namespace App\Http\Controllers\Api\Admin;

use App\Helpers\SortOrderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\SocialLinkRequest;
use App\Models\SocialLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SocialLinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $socialLinks = SocialLink::query()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $socialLinks,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SocialLinkRequest $request)
    {
        $socialLink = DB::transaction(function () use ($request) {
            $order = SortOrderHelper::handleCreate(
                new SocialLink(),
                $request->sort_order
            );

            return SocialLink::create([
                ...$request->validated(),
                'sort_order' => $order,
            ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'Social link berhasil ditambahkan',
            'data' => $socialLink,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(SocialLink $socialLink)
    {
        return response()->json([
            'success' => true,
            'data' => $socialLink,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SocialLinkRequest $request, SocialLink $socialLink)
    {
        DB::transaction(function () use ($request, $socialLink) {

            $validated = $request->validated();

            $oldOrder = (int) $socialLink->sort_order;
            $newOrder = isset($validated['sort_order'])
                ? (int) $validated['sort_order']
                : $oldOrder;

            // hanya jalankan reorder jika berubah
            if ($oldOrder !== $newOrder) {
                SortOrderHelper::handleUpdate(
                    new SocialLink(),
                    $oldOrder,
                    $newOrder,
                    [],
                    $socialLink->id
                );
            }

            $socialLink->update([
                ...$validated,
                'sort_order' => $newOrder,
            ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'Social link berhasil diperbarui',
            'data' => $socialLink->fresh(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SocialLink $socialLink)
    {
        DB::transaction(function () use ($socialLink) {
            $deletedOrder = $socialLink->sort_order;

            $socialLink->delete();

            SortOrderHelper::handleDelete(
                new SocialLink(),
                $deletedOrder
            );
        });

        return response()->json([
            'success' => true,
            'message' => 'Social link berhasil dihapus',
        ]);
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'orders' => 'required|array',
        ]);

        SortOrderHelper::handleBulkReorder(
            new SocialLink(),
            $request->orders
        );

        return response()->json([
            'success' => true,
            'message' => 'Urutan skill berhasil diperbarui',
        ]);
    }
}
