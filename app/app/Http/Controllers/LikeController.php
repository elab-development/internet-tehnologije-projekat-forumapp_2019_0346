<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Http\Resources\LikeResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LikeController extends Controller
{
    /**
     * Display a listing of the likes.
     */
    public function index()
    {
        $likes = Like::all();
        return LikeResource::collection($likes);
    }

    /**
     * Store a newly created like in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'post_id' => 'required|exists:posts,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $like = Like::create([
            'user_id' => Auth::id(), // Koristi ID ulogovanog korisnika
            'post_id' => $request->post_id,
        ]);

        return new LikeResource($like);
    }

    /**
     * Display the specified like.
     */
    public function show($id)
    {
        $like = Like::findOrFail($id);
        return new LikeResource($like);
    }

    /**
     * Update the specified like in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'post_id' => 'required|exists:posts,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $like = Like::findOrFail($id);

        $like->update([
            'post_id' => $request->post_id,
        ]);

        return new LikeResource($like);
    }

    /**
     * Remove the specified like from storage.
     */
    public function destroy($id)
    {
        $like = Like::findOrFail($id);
        $like->delete();

        return response()->json(['message' => 'Like deleted successfully.']);
    }
}
