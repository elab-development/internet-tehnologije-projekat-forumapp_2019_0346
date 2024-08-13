<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Topic>
 */
class TopicFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence, // Nasumičan naslov
            'description' => $this->faker->paragraph, // Nasumičan opis
            'user_id' => User::inRandomOrder()->first()->id, // Nasumičan korisnik
        ];
    }
}
