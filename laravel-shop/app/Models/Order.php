<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Order extends Model
{
    use HasFactory;

    protected $fillable = ['customer_name', 'order_date', 'status', 'comment', 'product_id', 'quantity', 'total_price'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public static function rules($id = null)
    {
        return [
            'customer_name' => ['required', 'string', 'max:255'],
            'order_date' => ['required', 'date'],
            'status' => ['required', 'in:new,completed'],
            'comment' => ['nullable', 'string'],
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ];
    }
}
