<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    /**
     * Get statistical data for the admin dashboard.
     */
    public function getStatistics()
    {
        // Ukupan broj korisnika
        $totalUsers = User::count();

        // Broj novih korisnika u poslednjih 30 dana
        $newUsersLast30Days = User::where('created_at', '>=', now()->subDays(30))->count();

        // Ukupan broj postova
        $totalPosts = Post::count();

        // Broj novih postova u poslednjih 30 dana
        $newPostsLast30Days = Post::where('created_at', '>=', now()->subDays(30))->count();

        // Ukupan broj komentara
        $totalComments = Comment::count();

        // Broj novih komentara u poslednjih 30 dana
        $newCommentsLast30Days = Comment::where('created_at', '>=', now()->subDays(30))->count();

        // Ukupan broj lajkova
        $totalLikes = Like::count();

        // Broj novih lajkova u poslednjih 30 dana
        $newLikesLast30Days = Like::where('created_at', '>=', now()->subDays(30))->count();

        // Najaktivniji korisnici po broju postova
        $mostActiveUsersByPosts = User::withCount('posts')
            ->orderBy('posts_count', 'desc')
            ->take(5)
            ->get(['id', 'name', 'posts_count']);

        // Najaktivniji korisnici po broju komentara
        $mostActiveUsersByComments = User::withCount('comments')
            ->orderBy('comments_count', 'desc')
            ->take(5)
            ->get(['id', 'name', 'comments_count']);

        // Najpopularniji postovi po broju lajkova
        $mostLikedPosts = Post::withCount('likes')
            ->orderBy('likes_count', 'desc')
            ->take(5)
            ->get(['id', 'content', 'likes_count']);

        return response()->json([
            'total_users' => $totalUsers,
            'new_users_last_30_days' => $newUsersLast30Days,
            'total_posts' => $totalPosts,
            'new_posts_last_30_days' => $newPostsLast30Days,
            'total_comments' => $totalComments,
            'new_comments_last_30_days' => $newCommentsLast30Days,
            'total_likes' => $totalLikes,
            'new_likes_last_30_days' => $newLikesLast30Days,
            'most_active_users_by_posts' => $mostActiveUsersByPosts,
            'most_active_users_by_comments' => $mostActiveUsersByComments,
            'most_liked_posts' => $mostLikedPosts,
        ]);
    }
}
