<?php

namespace App\Models\Order;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Catalog\Product;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'address',
        'email',
        'phone',
        'total_amount',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'order_products');
    }
}
