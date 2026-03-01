<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class SortOrderHelper
{
    /**
     * CREATE
     */
    public static function handleCreate(
        Model $model,
        ?int $newOrder,
        array $conditions = []
    ): int {
        $query = $model->newQuery();

        foreach ($conditions as $field => $value) {
            $query->where($field, $value);
        }

        if (!$newOrder) {
            return ($query->max('sort_order') ?? 0) + 1;
        }

        $query->where('sort_order', '>=', $newOrder)
            ->increment('sort_order');

        return $newOrder;
    }

    /**
     * UPDATE (single item)
     */
    public static function handleUpdate(
        Model $model,
        int $oldOrder,
        int $newOrder,
        array $conditions = [],
        ?int $excludeId = null
    ): void {
        if ($oldOrder === $newOrder) {
            return;
        }

        $query = $model->newQuery();

        // scope condition
        foreach ($conditions as $field => $value) {
            $query->where($field, $value);
        }

        // jangan ikut geser dirinya sendiri
        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        if ($newOrder < $oldOrder) {
            // pindah ke atas
            $query->whereBetween('sort_order', [$newOrder, $oldOrder - 1])
                ->increment('sort_order');
        } else {
            // pindah ke bawah
            $query->whereBetween('sort_order', [$oldOrder + 1, $newOrder])
                ->decrement('sort_order');
        }
    }

    /**
     * DELETE
     */
    public static function handleDelete(
        Model $model,
        int $deletedOrder,
        array $conditions = []
    ): void {
        $query = $model->newQuery();

        foreach ($conditions as $field => $value) {
            $query->where($field, $value);
        }

        $query->where('sort_order', '>', $deletedOrder)
            ->decrement('sort_order');
    }

    /**
     * BULK REORDER (Drag & Drop)
     */
    public static function handleBulkReorder(
        Model $model,
        array $orders,
        array $conditions = []
    ): void {
        DB::transaction(function () use ($model, $orders, $conditions) {
            foreach ($orders as $item) {
                $query = $model->newQuery()->where('id', $item['id']);

                foreach ($conditions as $field => $value) {
                    $query->where($field, $value);
                }

                $query->update([
                    'sort_order' => (int) $item['sort_order']
                ]);
            }
        });
    }
}
