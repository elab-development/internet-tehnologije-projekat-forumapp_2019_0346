<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user.
     */
    public function register(Request $request)
    {
        // Validacija ulaznih podataka
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role_id' => 'required|integer',
            'interests' => 'nullable|array',       // Niz interesovanja
            'profile_photo' => 'nullable|string',  // Putanja do profilne slike
            'bio' => 'nullable|string|max:500',    // Kratka biografija
            'birthdate' => 'nullable|date',        // Datum rođenja
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Kreiranje novog korisnika
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id,
            'interests' => $request->interests,
            'profile_photo' => $request->profile_photo,
            'bio' => $request->bio,
            'birthdate' => $request->birthdate,
        ]);

        // Kreiranje tokena za novog korisnika
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    /**
     * Log in an existing user.
     */
    public function login(Request $request)
    {
        // Validacija ulaznih podataka
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Pronalaženje korisnika po email-u
        $user = User::where('email', $request->email)->first();

        // Provera da li postoji korisnik i da li je lozinka ispravna
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Kreiranje tokena za prijavljenog korisnika
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    /**
     * Log out the user (revoke the token).
     */
    public function logout(Request $request)
    {
        // Brisanje trenutnog tokena korisnika
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    /**
     * Get authenticated user info.
     */
    public function userInfo(Request $request)
    {
        return response()->json($request->user());
    }
}
