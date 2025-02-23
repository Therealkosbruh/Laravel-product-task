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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name'); 
            $table->date('order_date'); 
            $table->enum('status', ['new', 'completed'])->default('new'); 
            $table->text('comment')->nullable(); 
            $table->foreignId('product_id')->constrained()->onDelete('cascade'); 
            $table->unsignedInteger('quantity')->default(1); 
            $table->unsignedInteger('total_price'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
