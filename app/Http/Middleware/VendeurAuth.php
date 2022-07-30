<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

//ounoid
use Illuminate\Support\Facades\Auth;

class VendeurAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::guard('api')->check() && $request->user()->type >= 1) {
            return $next($request);
        }
        $message = ["message" => "Permission Refuser"];
        return response($message, 401);
    }
}
