<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Resources\PostResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the posts.
     */
    public function index()
    {
        $posts = Post::all();
        return PostResource::collection($posts);
    }

    /**
     * Store a newly created post in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
            'topic_id' => 'required|exists:topics,id',
            'images' => 'nullable|json',
            'other' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $post = Post::create([
            'content' => $request->content,
            'user_id' => Auth::id(), // Koristi ID ulogovanog korisnika
            'topic_id' => $request->topic_id,
            'images' => $request->images,
            'other' => $request->other,
        ]);

        return new PostResource($post);
    }

    /**
     * Display the specified post.
     */
    public function show($id)
    {
        $post = Post::findOrFail($id);
        return new PostResource($post);
    }

    /**
     * Update the specified post in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
            'topic_id' => 'required|exists:topics,id',
            'images' => 'nullable|json',
            'other' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $post = Post::findOrFail($id);

        $post->update([
            'content' => $request->content,
            'topic_id' => $request->topic_id,
            'images' => $request->images,
            'other' => $request->other,
        ]);

        return new PostResource($post);
    }

    /**
     * Remove the specified post from storage.
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return response()->json(['message' => 'Post deleted successfully.']);
    }
}
