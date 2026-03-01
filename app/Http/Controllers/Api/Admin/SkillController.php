<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SkillRequest;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\SortOrderHelper;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(SkillRequest $request)
    {

        $skill = DB::transaction(function () use ($request) {
            $order = SortOrderHelper::handleCreate(
                new Skill(),
                $request->sort_order
            );

            return Skill::create([
                ...$request->validated(),
                'sort_order' => $order,
            ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'Skill berhasil ditambahkan',
            'data' => $skill,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Skill $skill)
    {
        return response()->json([
            'success' => true,
            'data' => $skill,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SkillRequest  $request, Skill $skill)
    {
        DB::transaction(function () use ($request, $skill) {
            SortOrderHelper::handleUpdate(
                new Skill(),
                $skill->sort_order,
                (int) $request->sort_order
            );

            $skill->update([
                ...$request->validated(),
                'sort_order' => (int) $request->sort_order,
            ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'Skill berhasil diperbarui',
            'data' => $skill,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Skill $skill)
    {
        DB::transaction(function () use ($skill) {
            $deletedOrder = $skill->sort_order;

            $skill->delete();

            SortOrderHelper::handleDelete(
                new Skill(),
                $deletedOrder
            );
        });

        return response()->json([
            'success' => true,
            'message' => 'Skill berhasil dihapus',
        ]);
    }
    public function reorder(Request $request)
    {
        $request->validate([
            'orders' => 'required|array',
        ]);

        SortOrderHelper::handleBulkReorder(
            new skill(),
            $request->orders
        );

        return response()->json([
            'success' => true,
            'message' => 'Urutan skill berhasil diperbarui',
        ]);
    }
}
