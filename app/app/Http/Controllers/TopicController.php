<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Http\Resources\TopicResource;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TopicController extends Controller
{
    /**
     * Display a listing of the topics.
     */
    public function index()
    {
        $topics = Topic::all();
        return TopicResource::collection($topics);
    }

    /**
     * Store a newly created topic in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $topic = Topic::create([
            'title' => $request->title,
            'description' => $request->description,
            'user_id' => Auth::id(), // Koristimo ID ulogovanog korisnika
        ]);

        return new TopicResource($topic);
    }

    /**
     * Display the specified topic.
     */
    public function show($id)
    {
        $topic = Topic::findOrFail($id);
        return new TopicResource($topic);
    }

    /**
     * Update the specified topic in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $topic = Topic::findOrFail($id);

        // Proveravamo da li je trenutni korisnik vlasnik teme
        if ($topic->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $topic->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return new TopicResource($topic);
    }

    /**
     * Remove the specified topic from storage.
     */
    public function destroy($id)
    {
        $topic = Topic::findOrFail($id);

        DB::transaction(function () use ($topic) {
            // Prvo obrišemo sve postove povezane sa ovim topic-om
            $posts = Post::where('topic_id', $topic->id)->get();

            foreach ($posts as $post) {
                // Brisemo sve komentare povezane sa postom
                Comment::where('post_id', $post->id)->delete();

                // Brisemo sve lajkove povezane sa postom
                Like::where('post_id', $post->id)->delete();

                // Na kraju brisemo post
                $post->delete();
            }

            // Na kraju obrišemo i sam topic
            $topic->delete();
        });

        return response()->json(['message' => 'Topic and related posts, comments, and likes deleted successfully.']);
    }
}
