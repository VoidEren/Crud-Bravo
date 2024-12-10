<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Product name
            $table->string('description')->nullable(); // Optional description
            $table->decimal('price', 10, 2); // Price with precision
            $table->string('slug')->unique(); // Unique slug
            $table->string('sku')->unique(); // Unique SKU
            $table->integer('stock')->default(0); // Stock quantity
            $table->string('images')->nullable(); // Image paths (optional)

            // Foreign keys
            $table->foreignId('category_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('brand_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();

            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
