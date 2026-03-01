<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProjectCategories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use App\Helpers\SortOrderHelper;

class ProjectCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = ProjectCategories::orderBy('sort_order')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => true,
            'message' => 'Data Kategori Berhasil diambil',
            'title' => 'Project Catgeories',
            'data' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'       => 'required|string|max:255',
            'slug'       => 'required|string|max:255|unique:project_categories,slug',
            'sort_order' => 'nullable|integer|min:1',
        ]);

        $category = DB::transaction(function () use ($request) {

            $order = SortOrderHelper::handleCreate(
                new ProjectCategories(),
                $request->sort_order
            );

            $data = $request->only([
                'name',
                'slug',
            ]);

            $data['sort_order'] = $order;

            return ProjectCategories::create($data);
        });


        return response()->json([
            'status'  => true,
            'message' => 'Kategori berhasil ditambahkan',
            'data'    => $category,
        ], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = ProjectCategories::findOrFail($id);

        return response()->json([
            'status' => true,
            'data' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = ProjectCategories::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('project_categories', 'slug')->ignore($id),
            ],
            'sort_order' => 'nullable|integer|min:1',
        ]);

        DB::transaction(function () use ($validated, $category) {

            $oldOrder = (int) $category->sort_order;
            $newOrder = isset($validated['sort_order'])
                ? (int) $validated['sort_order']
                : $oldOrder;

            // geser item lain hanya jika posisi berubah
            if ($oldOrder !== $newOrder) {
                SortOrderHelper::handleUpdate(
                    new ProjectCategories(),
                    $oldOrder,
                    $newOrder,
                    [],
                    $category->id // exclude dirinya sendiri
                );
            }

            $category->update([
                'name' => $validated['name'],
                'slug' => $validated['slug'],
                'sort_order' => $newOrder,
            ]);
        });

        return response()->json([
            'status'  => true,
            'message' => 'Kategori berhasil diperbarui',
            'data'    => $category->fresh(),
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = ProjectCategories::findOrFail($id);

        DB::transaction(function () use ($category) {

            $order = $category->sort_order;

            $category->delete();

            SortOrderHelper::handleDelete(
                new ProjectCategories(),
                $order
            );
        });

        return response()->json([
            'status' => true,
            'message' => 'Kategori berhasil dihapus'
        ]);
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'orders' => 'required|array',
        ]);

        SortOrderHelper::handleBulkReorder(
            new ProjectCategories(),
            $request->orders
        );

        return response()->json(['status' => true]);
    }
}
