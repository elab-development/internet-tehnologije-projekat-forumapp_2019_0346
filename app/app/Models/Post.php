<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{ 
    use HasFactory;

    protected $fillable = [
        'content',
        'user_id',
        'topic_id',
        'images',
        'other'
    ];
 
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
 
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
 
    public function user()
    {
        return $this->belongsTo(User::class);
    }
 
    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }
}
