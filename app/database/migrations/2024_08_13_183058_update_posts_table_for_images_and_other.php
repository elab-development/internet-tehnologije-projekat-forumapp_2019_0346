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
        Schema::table('posts', function (Blueprint $table) {
            $table->json('images')->nullable()->after('topic_id'); // Čuva niz slika kao JSON
            $table->text('other')->nullable()->after('images'); // Polje other postaje nullable
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn('images'); // Brisanje kolone images
            $table->dropColumn('other');  // Brisanje kolone other
        });
    }
};
