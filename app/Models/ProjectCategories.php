<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectCategories extends Model
{
    protected $guarded = ['id'];


    public function projects()
    {
        return $this->hasMany(Project::class, 'project_category_id');
    }
}
