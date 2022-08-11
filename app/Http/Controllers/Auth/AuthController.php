<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Compteur;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function register (Request $request) {
        $request['slug'] = $this->generateRandomString();
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'numero' => 'required|string|unique:users|max:8|min:8',
            'email' => 'required|string|email|max:255|unique:users',
            'commune_id' => 'required|integer',
            'password' => 'required|string|min:8',
            //'type' => 'integer',
        ]);
        if ($validator->fails())
        {
            return response()->json($validator->errors()->all(), 422);
        }
        $request['password']=Hash::make($request['password']);
        $request['remember_token'] = Str::random(10);
        //$request['type'] = $request['type'] ? $request['type']  : 0;
        $request['type'] = 0;
        $request['image'] = "";
        $user = User::create($request->toArray());//->sendEmailVerificationNotification();
        $userCompteur = Compteur::get()->first();
        if(isset($userCompteur)){
            $userCompteur->nombre_user++;
            $userCompteur->nombre_acheteur++;
            $userCompteur->save();
        }
        //$token = $user->createToken('Laravel Password Grant Client')->accessToken;
        $response = [
            'message' => 'Compte créer avec succès !'
            ];
        return response()->json($response, 201);
    }

    public function login (Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }
        $user = User::where('email', $request->email)->first();
        if ($user) {

            /*if($user->email_verified_at == null){
                $message = ["message" => "Votre email n'est pas verifier !"];
                return response()->json($message, 401);
            }*/
            if (Hash::check($request->password, $user->password)) {
                $tokenResult = $user->createToken('Laravel Password Grant Client');
                if ($request->remember_me){
                    $token = $tokenResult->token;
                    $token->expires_at = Carbon::now()->addWeeks(1);
                    $token->save();
                }
                $response = [
                    'type' => $user->type,
                    'name' => $user->name,
                    'email' => $user->email,
                    'access_token' => $tokenResult->accessToken,
                    'token_type' => 'Bearer',
                    'expires_at' => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString()
                ];
                return response()->json($response, 200);
            } else {
                $response = ["message" => "Mots de passe incorrect"];
                return response($response, 422);
            }
        } else {
            $response = ["message" =>'Adresse email incorrect'];
            return response($response, 422);
        }
    }

    public function user(Request $request)
    {
        //return response()->json($request->user());
        $user = 
        $response = [
            'type' => $request->user()->type,
            'nom' => $request->user()->nom,
            'email' => $request->user()->email,
            'slug' => $request->user()->slug,
            'numero' => $request->user()->numero,
            'commune' => $request->user()->commune->nom_commune
            //'access_token' => $request->user()->refresh(),
            //'token_type' => 'Bearer',
            //'expires_at' => Carbon::parse($request->user()->token()->expires_at)->toDateTimeString()
        ];

        return response()->json($response,200);
    }

    public function refresh() {
        return $this->respondWithToken(auth()->refresh());
    }

    public function logout (Request $request) {
        $token = $request->user()->token();
        $token->revoke();
        $response = ['message' => 'You have been successfully logged out!'];
        return response()->json($response, 200);
    }
}
