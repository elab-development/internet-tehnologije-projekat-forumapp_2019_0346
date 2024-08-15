<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Update the role of a specific user.
     */
    public function updateRole(Request $request, $id)
    {
        // Validacija role_id parametra
        $validator = Validator::make($request->all(), [
            'role_id' => 'required|integer|exists:roles,id',  
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Pronalaženje korisnika po ID-u
        $user = User::findOrFail($id);

        // Ažuriranje role_id
        $user->role_id = $request->role_id;
        $user->save();

        return response()->json(['message' => 'User role updated successfully.']);
    }

    /**
     * Get the statistics of each user (total likes, comments, posts).
     */
    public function userStatistics()
    {
        $users = User::withCount(['likes', 'comments', 'posts'])->get();

        // Transformacija podataka za bolji prikaz
        $statistics = $users->map(function ($user) {
            return [
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'total_likes' => $user->likes_count,
                'total_comments' => $user->comments_count,
                'total_posts' => $user->posts_count,
            ];
        });

        return response()->json($statistics);
    }


    public function search(Request $request)
    {
        $query = User::query();

        // Pretraga na osnovu imena
        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        // Pretraga na osnovu email-a
        if ($request->has('email')) {
            $query->where('email', 'like', '%' . $request->email . '%');
        }

        // Pretraga na osnovu role_id
        if ($request->has('role_id')) {
            $query->where('role_id', $request->role_id);
        }

        // Pretraga na osnovu interesovanja
        if ($request->has('interests')) {
            $query->whereJsonContains('interests', $request->interests);
        }

        // Vraćanje rezultata pretrage
        $users = $query->get();

        return response()->json($users);
    }
}
