<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

//ounoid
use Illuminate\Support\Facades\Auth;

class VerifyEmail
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
        //if (Auth::guard('api')->check() && isset($request->user()->email_verified_at)) {
        if (Auth::guard('api')->check()) {
            return $next($request);
        }
        $message = ["message" => "Votre email n'est pas verifier !"];
        return response($message, 401);
    }
}
