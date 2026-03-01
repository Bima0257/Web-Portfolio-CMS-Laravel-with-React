<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $guarded = ['id'];
    protected $appends = ['thumbnail_url'];

    public function category()
    {
        return $this->belongsTo(ProjectCategories::class, 'project_category_id');
    }

    public function getThumbnailUrlAttribute()
    {
        return $this->thumbnail
            ? asset('storage/' . $this->thumbnail)
            : null;
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class);
    }
}
