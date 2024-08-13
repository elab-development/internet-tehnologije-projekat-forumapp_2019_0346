<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('comments', function (Blueprint $table) {
           // Dodavanje kolona i spoljnjih ključeva
           $table->foreignId('user_id')->constrained()->onDelete('cascade')->after('content'); // Korisnik koji je kreirao komentar
           $table->foreignId('post_id')->constrained()->onDelete('cascade')->after('user_id'); // Post kojem komentar pripada
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('comments', function (Blueprint $table) {
             // Brisanje spoljnjih ključeva i kolona
             $table->dropForeign(['user_id']);
             $table->dropColumn('user_id');
             $table->dropForeign(['post_id']);
             $table->dropColumn('post_id');
        });
    }
};
