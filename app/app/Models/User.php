<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'interests',       // Interesovanja korisnika
        'profile_photo',   // Putanja do profilne slike
        'bio',             // Kratka biografija korisnika
        'posts_count',     // Broj postova koje je korisnik kreirao
        'birthdate',       // Datum rođenja korisnika
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'interests' => 'array',    // Kastovanje interesovanja u niz (ako se koristi JSON format)
        'birthdate' => 'date',     // Kastovanje datuma rođenja u date format
    ];

 
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
 
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
 
    public function likes()
    {
        return $this->hasMany(Like::class);
    }

 
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
