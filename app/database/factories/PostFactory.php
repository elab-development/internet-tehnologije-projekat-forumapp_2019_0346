<?php

namespace Database\Factories;

use App\Models\Topic;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'content' => $this->faker->paragraph, // Nasumičan sadržaj
            'user_id' => User::inRandomOrder()->first()->id, // Nasumičan korisnik
            'topic_id' => Topic::inRandomOrder()->first()->id, // Nasumična tema
            'images' => json_encode([$this->faker->imageUrl(), $this->faker->imageUrl()]), // Nasumičan niz URL-ova slika
            'other' => $this->faker->sentence, // Nasumičan tekst za polje "other"
        ];
    }
}
