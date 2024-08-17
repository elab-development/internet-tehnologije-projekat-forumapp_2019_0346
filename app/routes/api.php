<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;

use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
 



Route::middleware('auth:sanctum')->group(function () {
 
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'userInfo']);
    
    // Ruta za ažuriranje korisnika
    Route::put('/user/update', [AuthController::class, 'update']);

    Route::get('/users', [UserController::class, 'index']);
    Route::put('/users/{id}/role', [UserController::class, 'updateRole']);
   // Route::get('/users/statistics', [UserController::class, 'userStatistics']); //za seminarski
    Route::get('/users/search', [UserController::class, 'search']);



    Route::apiResource('comments', CommentController::class);
    Route::apiResource('likes', LikeController::class);


    Route::apiResource('posts', PostController::class);
    Route::apiResource('topics', TopicController::class);
});



