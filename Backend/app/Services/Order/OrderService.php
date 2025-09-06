<?php

namespace App\Services\Order;

use Illuminate\Support\Arr;
use App\Models\Order\Order;

class OrderService
{
    public function handleCreate($request): Order
    {
        $orderData = Arr::except($request, 'products');
        $order = Order::create($orderData);
        $products = collect($request['products'])
            ->mapWithKeys(function ($product) {
                return [
                    $product['id'] => [
                        'quantity' => $product['quantity'],
                        'price' => $product['price'] ?? 0,
                    ]
                ];
            });

        $order->products()->attach($products);

        return $order;
    }
}
