<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Card;
use App\Models\PaymentMethod;

class CardFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Card::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'card_number' => $this->faker->word(),
            'expiration_date' => $this->faker->word(),
            'security_code' => $this->faker->word(),
            'cardholder_name' => $this->faker->word(),
            'payment_method_id' => PaymentMethod::factory(),
        ];
    }
}
