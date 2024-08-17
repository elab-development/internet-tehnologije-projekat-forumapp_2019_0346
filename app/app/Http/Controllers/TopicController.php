<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Http\Resources\TopicResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        // Proveravamo da li je trenutni korisnik vlasnik teme
        if ($topic->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $topic->delete();

        return response()->json(['message' => 'Topic deleted successfully.']);
    }
}
