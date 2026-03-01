<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Helpers\SortOrderHelper;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with([
            'category',
            'skills:id,name'
        ])
            ->orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => true,
            'data' => $projects
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'               => 'required|string|max:255',
            'description'         => 'required',
            'thumbnail'           => 'nullable|image|mimes:jpg,jpeg,png,svg|max:2048',
            'demo_url'            => 'nullable|url',
            'project_category_id' => 'nullable|exists:project_categories,id',
            'sort_order'          => 'nullable|integer|min:1',
            'skill_ids' => 'nullable|array',
            'skill_ids.*' => 'exists:skills,id',
        ]);

        $project = DB::transaction(function () use ($request) {

            $order = SortOrderHelper::handleCreate(
                new Project(),
                $request->sort_order
            );

            $data = $request->only([
                'project_category_id',
                'title',
                'description',
                'demo_url',
            ]);

            $data['sort_order'] = $order;

            if ($request->hasFile('thumbnail')) {
                $data['thumbnail'] = $request->file('thumbnail')
                    ->store('projects', 'public');
            }

            $project =  Project::create($data);

            $project->skills()->sync($request->skill_ids ?? []);

            return $project;
        });


        return response()->json([
            'status'  => true,
            'message' => 'Project berhasil ditambahkan',
            'data'    => $project->load('skills:id,name,icon'),
        ], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            'status' => true,
            'data' => Project::with([
                'category',
                'skills:id,name,icon'
            ])->findOrFail($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $project = Project::findOrFail($id);

        $request->validate([
            'title'               => 'required|string|max:255',
            'description'         => 'required',
            'thumbnail'           => 'nullable|image|mimes:jpg,jpeg,png,svg|max:2048',
            'demo_url'            => 'nullable|url',
            'project_category_id' => 'nullable|exists:project_categories,id',
            'sort_order'          => 'nullable|integer|min:1',
            'skill_ids' => 'nullable|array',
            'skill_ids.*' => 'exists:skills,id',
        ]);

        DB::transaction(function () use ($request, $project) {

            SortOrderHelper::handleUpdate(
                new Project(),
                $project->sort_order,
                (int) $request->sort_order
            );

            $data = $request->only([
                'project_category_id',
                'title',
                'description',
                'demo_url',
            ]);

            $data['sort_order'] = (int) $request->sort_order;

            if ($request->hasFile('thumbnail')) {
                if ($project->thumbnail) {
                    Storage::disk('public')->delete($project->thumbnail);
                }

                $data['thumbnail'] = $request->file('thumbnail')
                    ->store('projects', 'public');
            }

            $project->update($data);
            $project->skills()->sync($request->skill_ids ?? []);
        });


        return response()->json([
            'status'  => true,
            'message' => 'Project berhasil diperbarui',
            'data' => $project->fresh()->load('skills:id,name,icon'),
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $project = Project::findOrFail($id);

        DB::transaction(function () use ($project) {

            $order = $project->sort_order;

            if ($project->thumbnail) {
                Storage::disk('public')->delete($project->thumbnail);
            }

            $project->delete();

            SortOrderHelper::handleDelete(
                new Project(),
                $order
            );
        });

        return response()->json([
            'status' => true,
            'message' => 'Project berhasil dihapus'
        ]);
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'orders' => 'required|array',
        ]);

        SortOrderHelper::handleBulkReorder(
            new Project(),
            $request->orders
        );

        return response()->json(['status' => true]);
    }
}
