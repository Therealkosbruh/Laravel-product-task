<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(Order::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'total_price' => 'required|numeric', 
            'comment' => 'nullable|string',
        ]);

        $order = Order::create([
            'customer_name' => $validated['customer_name'],
            'product_id' => $validated['product_id'],
            'quantity' => $validated['quantity'],
            'total_price' => $request->total_price, 
            'comment' => $validated['comment'] ?? null,
            'status' => 'new',  
            'order_date' => now(), 
            'created_at' => now(),
        ]);
        

        return response()->json($order, 201);
    }

    public function show(Order $order)
    {
        return response()->json($order);
    }

    public function update(Request $request, Order $order)
    {
        $newStatus = $order->status === 'new' ? 'completed' : 'new';
        $order->update(['status' => $newStatus]);
        return response()->json($order);
    }


    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(null, 204);
    }
}
