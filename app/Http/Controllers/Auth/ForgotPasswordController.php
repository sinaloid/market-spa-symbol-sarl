<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ForgotPasswordController extends Controller
{
    
    public function forgot(Request $request) {
        $credentials = request()->validate(['email' => 'required|email']);

        $status = Password::sendResetLink($credentials);

        return response()->json([
            'message' => 'Reset password link sent on your email id.',
            'status' => $status
        ],201);
        /***    return $status === Password::RESET_LINK_SENT
                ? back()->with(['status' => __($status)])
                : back()->withErrors(['email' => __($status)]); */
    }
    

    public function reset(Request $request) {

        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);
     
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'), function ($user, $password) {
                $user->forceFill(['password' => Hash::make($password)])->setRememberToken(Str::random(60));
     
                $user->save();
     
                event(new PasswordReset($user));
            }
        );
        if ($status == Password::INVALID_TOKEN) {
            return response()->json([
                'message' => 'Impossible de change le mots de passe veuillez reprendre le processus',
                'status' => $status
            ],255);
        }

        return response()->json([
            'message' => 'Password has been successfully changed',
            'status' => $status
        ],201);

        /**return $status === Password::PASSWORD_RESET
                    ? redirect()->route('login')->with('status', __($status))
                    : back()->withErrors(['email' => [__($status)]]);*/

    }
}