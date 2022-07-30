<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PHPUnit\Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\Commande;
use App\Models\User;

class CommandeController extends Controller
{
    public function __construct()
    {
        $this->middleware(['api.admin'],['except' => ['index', 'show', 'userCommande']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $datas = Commande::orderBy('created_at', 'DESC')->get();
            $acheteurs = User::orderBy('created_at', 'DESC')->get();
            $tmp = [];
            foreach($datas as $data){
                array_push($tmp,[
                    "id" => $data->id,
                    "nom" => $data->user->nom,
                    "email" => $data->user->email,
                    "numero" => $data->user->numero,
                    "numero_commande" => $data->numero_commande,
                    "prix_total" => $data->prix_total,
                    "date" => $data->date,
                    "etat" => $data->etat,
                ]);
            }
            return response()->json([
                'status' => 200,
                'commandes' => $tmp,
                'acheteurs' => $acheteurs,
            ]);
         }catch (Exception $exception){
             return response()->json([
                 'status' => 404,
                 'response' => 'Un problème vous empêche de continuer'
             ]);
         }
    }

    public function userCommande($slug = "")
    {
        $user = User::where("slug",$slug)->first();
        $response = null;
        if(isset($user)){
            $response = [
                'type' => $user->type,
                'nom' => $user->nom,
                'email' => $user->email,
                'slug' => $user->slug,
                'numero' => $user->numero,
                'commune' => $user->commune->nom_commune,
                'date' => date('j/m/y'),
                'fact' =>  $this->getNumeroCommande(),
            ];  
        }
        return response()->json($response,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request['slug'] = $this->generateRandomString();
        $request['user_id'] = User::where('email', $request['email'])->first();
        
        if($request['user_id'] == null){
            return response()->json([
                'status' => 404,
                'response' => "Un problème vous empêche de continuer: l'utilisateur n'exist pas"
            ]);
        }
        
        $request['user_id'] = $request['user_id']->id;

        $validator = Validator::make($request->all(), $this->dataToValidate());
        if ($validator->fails()) {
            $message = $validator->messages();
            $message = reset($message);
            $message = reset($message);
            return response()->json([
                'status' => 900,
                'response' => $message[0]
            ]);
        } else {
            try {
                if(Auth::user()->type == 2){
                    $request['numero_commande'] = $this->getNumeroCommande();
                    $request['prix_total'] = "457";
                    $data = Commande::create($request->toArray());
                    return response()->json([
                        'status' => 200,
                        'response' => 'Création de données réussies'//$data
                    ]);
                }
                return response()->json([
                    'status' => 404,
                    'response' => 'Permission Refuser'
                ]);
                

            }catch (Exception $exception){
                return response()->json([
                    'status' => 404,
                    'response' => 'Un problème vous empêche de continuer'
                ]);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        try {
            $data = Commande::where('slug',$slug)->get();
            if(isset($data)){
                return response()->json([
                    'status' => 200,
                    'response' => $data
                ]);
            }
            return response()->json([
                'status' => 404,
                'response' => 'Donnée inexistante'
            ]);
        }catch (Exception $exception){
            return response()->json([
                'status' => 404,
                'response' => 'Un problème vous empêche de continuer'
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $slug)
    {
        $request['slug'] = $this->generateRandomString();
        $request['user_id'] = User::where('email', $request['email'])->first();
        
        if($request['user_id'] == null){
            return response()->json([
                'status' => 404,
                'response' => "Un problème vous empêche de continuer: l'utilisateur n'exist pas"
            ]);
        }
        
        $request['user_id'] = $request['user_id']->id;
        $validator = Validator::make($request->all(), $this->dataToValidate("update"));
        if ($validator->fails()) {
            $message = $validator->messages();
            $message = reset($message);
            $message = reset($message);
            return response()->json([
                'status' => 900,
                'response' => $message[0]
            ]);
        } else {
            try {
                $data = Commande::where('id',$slug)->first();
                if(isset($data) && Auth::user()->type == 2){
                    $data->user_id = $request->get('user_id');
                    $data->prix_total = 788;
                    $data->etat = $request->get('etat');
                    $data->update();

                    return response()->json([
                        'status' => 200,
                        'response' => 'Modification de données réussies'//$data
                    ]);
                }
                return response()->json([
                    'status' => 404,
                    'response' => isset($data) ? 'Permission Refuser' : 'Donnée inexistante'
                ]);

            }catch (Exception $exception){
                return response()->json([
                    'status' => 404,
                    'response' => 'Un problème vous empêche de continuer'
                ]);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($slug)
    {
        try {
            $data = Commande::where('id',$slug);
            $tmp = $data->first();
            if(isset($tmp) &&  Auth::user()->type == 2){
                $data->delete();
                return response()->json([
                    'status' => 200,
                    'response' => 'Suppression de données réussies'
                ]);
            }
            return response()->json([
                'status' => 404,
                'response' => isset($tmp) ? 'Permission Refuser' : 'Donnée inexistante'
            ]);
        }catch (Exception $exception){
            return response()->json([
                'status' => 404,
                'response' => 'Un problème vous empêche de continuer'
            ]);
        }
    }

    public function dataToValidate($type = ""){
        if($type == "update"){
            return [
                'user_id' => 'nullable|integer',
                'date' => 'nullable|date',
                'etat' => 'nullable|string|max:255',
                'slug' => 'nullable|string|max:255',
            ];
        }
        return [
            'user_id' => 'required|integer',
            'date' => 'required|date',
            'etat' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
        ];
    }

    public function getNumeroCommande(){
        return "SYM-".date("j")."".date("m")."".date("y")."".date("h")."".date("m")."".date("s");
    }
}