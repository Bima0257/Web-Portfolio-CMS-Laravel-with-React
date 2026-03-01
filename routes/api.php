<?php

use App\Http\Controllers\Api\Admin\AboutController;
use App\Http\Controllers\Api\Admin\EducationController;
use App\Http\Controllers\Api\Admin\ExperienceController;
use App\Http\Controllers\Api\Admin\ProjectCategoriesController;
use App\Http\Controllers\Api\Admin\ProjectController;
use App\Http\Controllers\Api\Admin\SkillController;
use App\Http\Controllers\Api\Admin\SocialLinkController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
// ================= PUBLIC =================
use App\Http\Controllers\Api\Public\{
    AboutController as PublicAboutController,
    SkillController as PublicSkillController,
    ExperienceController as PublicExperienceController,
    EducationController as PublicEducationController,
    SocialLinkController as PublicSocialLinkController
};
use App\Http\Controllers\Api\Public\ProjectCategoryController;
use App\Http\Controllers\Api\Public\ProjectController as PublicProjectController;

use Illuminate\Http\Request;


/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/

Route::post('/auth/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('admin/projects-categories/reorder', [ProjectCategoriesController::class, 'reorder']);
    Route::apiResource(
        'admin/project-categories',
        ProjectCategoriesController::class
    );
    Route::post('admin/projects/reorder', [ProjectController::class, 'reorder']);
    Route::apiResource('admin/projects', ProjectController::class);
    Route::get('admin/abouts', [AboutController::class, 'index']);
    Route::put('admin/about/update', [AboutController::class, 'update']);
    Route::post('admin/skills/reorder', [SkillController::class, 'reorder']);
    Route::apiResource('admin/skills', SkillController::class);
    Route::post('admin/experiences/reorder', [ExperienceController::class, 'reorder']);
    Route::apiResource('admin/experiences', ExperienceController::class);
    Route::post('admin/educations/reorder', [EducationController::class, 'reorder']);
    Route::apiResource('admin/educations', EducationController::class);
    Route::post('admin/social-links/reorder', [SocialLinkController::class, 'reorder']);
    Route::apiResource('admin/social-links', SocialLinkController::class);
});



/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/

Route::prefix('projects')->group(function () {
    Route::get('/', [PublicProjectController::class, 'index']);
    Route::get('/{id}', [PublicProjectController::class, 'show']);
});

Route::get('/project-categories', [ProjectCategoryController::class, 'index']);
Route::get('/about', [PublicAboutController::class, 'index']);
Route::get('/skills', [PublicSkillController::class, 'index']);
Route::get('/experiences', [PublicExperienceController::class, 'index']);
Route::get('/educations', [PublicEducationController::class, 'index']);
Route::get('/social-links', [PublicSocialLinkController::class, 'index']);
