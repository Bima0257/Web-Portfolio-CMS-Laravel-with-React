<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ExperienceRequest;
use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\SortOrderHelper;

class ExperienceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $experiences = Experience::query()
            ->orderByDesc('start_date')
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $experiences,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ExperienceRequest $request)
    {
        $experience = DB::transaction(function () use ($request) {
            // Gunakan helper untuk menentukan sort_order dan geser data di bawahnya
            $order = SortOrderHelper::handleCreate(
                new Experience(),
                $request->sort_order
            );

            return Experience::create([
                ...$request->validated(),
                'sort_order' => $order,
            ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'Experience berhasil ditambahkan',
            'data' => $experience,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Experience $experience)
    {
        return response()->json([
            'success' => true,
            'data' => $experience,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ExperienceRequest $request, Experience $experience)
    {
        DB::transaction(function () use ($request, $experience) {

            $validated = $request->validated();

            $oldOrder = (int) $experience->sort_order;
            $newOrder = isset($validated['sort_order'])
                ? (int) $validated['sort_order']
                : $oldOrder;

            // geser data lain hanya jika posisi berubah
            if ($oldOrder !== $newOrder) {
                SortOrderHelper::handleUpdate(
                    new Experience(),
                    $oldOrder,
                    $newOrder,
                    [],
                    $experience->id // exclude dirinya sendiri
                );
            }

            $experience->update([
                ...$validated,
                'sort_order' => $newOrder,
            ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'Experience berhasil diperbarui',
            'data' => $experience->fresh(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Experience $experience)
    {

        DB::transaction(function () use ($experience) {
            $deletedOrder = $experience->sort_order;

            $experience->delete();

            SortOrderHelper::handleDelete(
                new Experience(),
                $deletedOrder
            );
        });

        return response()->json([
            'success' => true,
            'message' => 'Experience berhasil dihapus',
        ]);
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'orders' => 'required|array',
        ]);

        SortOrderHelper::handleBulkReorder(
            new Experience(),
            $request->orders
        );

        return response()->json([
            'success' => true,
            'message' => 'Urutan Experience berhasil diperbarui',
        ]);
    }
}
