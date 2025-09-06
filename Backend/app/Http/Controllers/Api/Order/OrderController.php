<?php

namespace App\Http\Controllers\Api\Order;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\StoreOrderRequest;
use App\Services\Order\OrderService;

class OrderController extends Controller
{
    public function __construct(
        private OrderService $orderService
    ) {}

    /**
     * Store a newly created order.
     */
    public function store(StoreOrderRequest $request): \Illuminate\Http\JsonResponse
    {
        $order = $this->orderService->handleCreate($request->validated());

        return response()->json($order->load('products'), 201);
    }
}
