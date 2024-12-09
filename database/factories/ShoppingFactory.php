<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\PaymentMethod;
use App\Models\Shopping;
use App\Models\User;

class ShoppingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Shopping::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'total' => $this->faker->randomFloat(0, 0, 9999999999.),
            'status' => $this->faker->word(),
            'payment_method_id' => PaymentMethod::factory(),
            'user_id' => User::factory(),
        ];
    }
}
