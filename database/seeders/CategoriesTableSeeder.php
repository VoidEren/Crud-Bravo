<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Str;

class CategoriesTableSeeder extends Seeder
{
    public function run()
    {
        Category::create([
        'name' => 'Electrónica',
        'slug' => Str::slug('Electrónica'), // Genera el slug
    ]);

    Category::create([
        'name' => 'Ropa y Accesorios',
        'slug' => Str::slug('Ropa y Accesorios'),
    ]);

    Category::create([
        'name' => 'Hogar y Muebles',
        'slug' => Str::slug('Hogar y Muebles'),
    ]);

    Category::create([
        'name' => 'Salud y Belleza',
        'slug' => Str::slug('Salud y Belleza'),
    ]);

    Category::create([
        'name' => 'Juguetes y Niños',
        'slug' => Str::slug('Juguetes y Niños')
    ]);

    Category::create([
        'name' => 'Alimentos y Bebidas',
        'slug' => Str::slug('Alimentos y Bebidas')
    ]);

    Category::create([
        'name' => 'Deportes y Aire Libre',
        'slug' => Str::slug('Deportes y Aire Libre')
    ]);

    Category::create([
        'name' => 'Libros y Entretenimiento',
        'slug' => Str::slug('Libros y Entretenimiento')
    ]);
        
        }
}
