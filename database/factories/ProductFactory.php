<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->text(),
            'price' => $this->faker->randomFloat(0, 0, 9999999999.),
            'slug' => $this->faker->slug(),
            'sku' => $this->faker->word(),
            'category_id' => Category::factory(),
            'user_id' => User::factory(),
            'brand_id' => Brand::factory(),
        ];
    }
}
