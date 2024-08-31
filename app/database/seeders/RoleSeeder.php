<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Kreiranje uloga
        Role::create(['name' => 'korisnik']);
        Role::create(['name' => 'moderator']);
        Role::create(['name' => 'admin']);
    }
}
