<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\EducationRequest;
use App\Models\Education;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\SortOrderHelper;

class EducationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $educations = Education::orderBy('sort_order')
            ->orderByDesc('start_year')
            ->get();

        return response()->json([
            'success' => true,
            'data'    => $educations,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EducationRequest $request)
    {
        $education = DB::transaction(function () use ($request) {
            // Gunakan helper untuk menentukan sort_order dan geser data di bawahnya
            $order = SortOrderHelper::handleCreate(
                new Education(),
                $request->sort_order
            );

            return Education::create([
                ...$request->validated(),
                'sort_order' => $order,
            ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'Education berhasil ditambahkan',
            'data'    => $education,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Education $education)
    {
        return response()->json([
            'success' => true,
            'data'    => $education,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EducationRequest $request, Education $education)
    {
        DB::transaction(function () use ($request, $education) {

            $validated = $request->validated();

            $oldOrder = (int) $education->sort_order;
            $newOrder = isset($validated['sort_order'])
                ? (int) $validated['sort_order']
                : $oldOrder;

            // hanya geser data lain jika posisi berubah
            if ($oldOrder !== $newOrder) {
                SortOrderHelper::handleUpdate(
                    new Education(),
                    $oldOrder,
                    $newOrder,
                    [],
                    $education->id // exclude dirinya sendiri
                );
            }

            $education->update([
                ...$validated,
                'sort_order' => $newOrder,
            ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'Education berhasil diperbarui',
            'data' => $education->fresh(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Education $education)
    {
        DB::transaction(function () use ($education) {
            $deletedOrder = $education->sort_order;

            $education->delete();

            SortOrderHelper::handleDelete(
                new Education(),
                $deletedOrder
            );
        });

        return response()->json([
            'success' => true,
            'message' => 'Education berhasil dihapus',
        ]);
    }

    /**
     * Reorder multiple educations (drag & drop)
     */
    public function reorder(Request $request)
    {
        $request->validate([
            'orders' => 'required|array',
        ]);

        SortOrderHelper::handleBulkReorder(
            new Education(),
            $request->orders
        );

        return response()->json([
            'success' => true,
            'message' => 'Urutan Education berhasil diperbarui',
        ]);
    }
}
