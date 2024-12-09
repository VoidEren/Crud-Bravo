<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Cart;
use App\Models\Product;
use App\Models\Shopping;

class CartFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Cart::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'shopping_id' => Shopping::factory(),
            'product_id' => Product::factory(),
            'quantity' => $this->faker->numberBetween(-10000, 10000),
        ];
    }
}
