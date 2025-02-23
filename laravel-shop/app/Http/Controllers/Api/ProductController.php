<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        $products = $query->get();

        return response()->json($products);
    }

    public function store(Request $request)
    {
        $validated = $request->validate(Product::rules());

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        return response()->json($product->load('category'), 200);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate(Product::rules($product->id));

        $product->update($validated);

        return response()->json($product, 200);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }
}
