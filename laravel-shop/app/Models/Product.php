<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Validation\Rule;



class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'category_id', 'description', 'price'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public static function rules($id = null)
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'category_id' => ['required', 'exists:categories,id'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'integer', 'min:0'], 
        ];
    }
}
