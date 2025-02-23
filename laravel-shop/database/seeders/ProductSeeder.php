<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'name' => 'Футболка',
                'category_id' => 1, 
                'description' => 'Самая удобная футболка',
                'price' => 1200, 
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ноутбук',
                'category_id' => 2, 
                'description' => 'Самый мощный ноутбук',
                'price' => 12000, 
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Гантели 10 кг',
                'category_id' => 3, 
                'description' => 'Металлические гантели для тренировок',
                'price' => 5000, 
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
