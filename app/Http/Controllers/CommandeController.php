<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PHPUnit\Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\Commande;
use App\Models\CommandeDetail;
use App\Models\Product;
use App\Models\User;
use App\Models\Compteur;
use App\Models\Paiement;
use Carbon\Carbon;

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
            $datas = Commande::where("etat_commande","enregistrer")->orderBy('created_at', 'DESC')->get();
            //$datas = Commande::orderBy('created_at', 'DESC')->get();
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
                    "etat" => $data->etat_livraison,
                    "slug" => $data->slug,
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

    public function userCommande()
    {
        $user = Auth::user();
        $response = null;
        if(isset($user)){
            $response = [
                'type' => $user->type,
                'nom' => $user->nom,
                'email' => $user->email,
                'slug' => $user->slug,
                'numero' => $user->numero,
                'commune' => $user->commune->nom_commune,
                'date' => "",//$data->date, //date('j/m/y'),
                'fact' =>  ""//$data->numero_commande //$this->getNumeroCommande(),
            ]; 
        }
        
        return response()->json([
            'status' => 200,
            'user' => $response,
        ],200);
    }
    public function paiement(Request $request){
        
        $etat_commande = $request->get("etat_commande");
        $produits = $request->get("produit");
        $produits = json_decode($produits);
        $cmdSlug = $request->get("commandSlug");
        $cmdId = '';
        $cmd = [
            'numero_commande'=> $this->getNumeroCommande(),
            'prix_total' => 0,
            'date' => Carbon::now(),
            'etat_commande' => $etat_commande,
            'etat_livraison' => "En cours",
            'slug' => $this->generateRandomString(),
            'user_id' => Auth::user()->id,
        ];
        //dd($request->all());
        if($cmdSlug === "undefined"){
            $cmdSave = Commande::create($cmd);
            //$cmdId = $cmdSave->id;
            $total = $this->createCommandeDetail($produits, $cmdSave->id);
            //dd($total);
            $cmdSave->prix_total = $total*1.18;
            $cmdSave->update();
            return response()->json([
                'status' => 200,
                'message' => "Votre commande a bien été enregistrer",
                'commandSlug' => $cmdSave->slug,
                'response' => $cmdSave->prix_total 
            ],200);
        }else{
            $cmd = Commande::where('slug',$cmdSlug)->first();
            if(isset($cmd)){
                $cmdDetail = $cmd->commandeDetails()->first();
                $cmdId = $cmd->id;
                //dd($cmdDetail);
                if(!isset($cmdDetail)){
                    $total = $this->createCommandeDetail($produits, $cmdId);  
                    $cmd->prix_total = $total*1.18;
                    $cmd->update();
                    return response()->json([
                        'status' => 200,
                        'message' => "Votre commande a bien été enregistrer",
                        'commandSlug' => $cmd->slug,
                        'response' => $cmd->prix_total
                    ],200);
                }
                return response()->json([
                    'status' => 200,
                    'message' => "Votre commande existe déjà",
                    'commandSlug' => $cmd->slug,
                    'response' => $cmd->prix_total
                ],200);
            }
            return 'La commande ne peut pas être restaurée';  
        }
    }

    public function createCommandeDetail($produits, $cmdId){

        $total = 0;

        foreach($produits as $produit){
            $prod  = Product::where('slug',$produit->id)->first();
            //dd($prod);
            $cmdDetail = [
                'prix'=> $prod->prix,
                'reduction'=> (isset($prod->reduction)) ? $prod->reduction()->first()->pourcentage : 0,
                'quantite'=> $produit->quantite,
                'commande_id'=> $cmdId,
                'product_id'=> $prod->id,
            ];
            $tmp = CommandeDetail::create($cmdDetail);
            $prix_unitaire = $tmp->prix * (1 - $tmp->reduction/100);
            $total = ($prix_unitaire * $tmp->quantite) + $total;
        }

        return $total;
    }

    public function paiementList(){
        try {
                $type = Auth::user()->type;
                $cmpteur = Compteur::first();
                if($type == 2){
                    $datas = Paiement::orderBy('created_at', 'DESC')->get();
                    $tmp = [];
                    foreach($datas as $data){
                        array_push($tmp,[
                            "nom" => $data->commande->user->nom,
                            "email" => $data->commande->user->email,
                            "numero" => $data->commande->user->numero,
                            "numero_commande" => $data->commande->numero_commande,
                            "prix_total" => $data->commande->prix_total,
                            "date" => $data->date,
                            "slug" => $data->slug,
                        ]);
                    }
                    return response()->json([
                        'status' => 200,
                        'response' => $tmp,
                        'compteur' => $cmpteur
                    ],200);              
            }
            
         }catch (Exception $exception){
             return response()->json([
                 'status' => 404,
                 'response' => 'Un problème vous empêche de continuer'
             ]);
         }
    }

    public function paiementDetele($slug){
        try {
            $data = Paiement::where('slug',$slug);
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
        $request['etat_commande'] = "enregistrer";
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
                    $request['prix_total'] = "0";
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
            //$cmd = Commande::where('slug',$slug);
            $data = Commande::where('slug',$slug)->first();
            if(isset($data)){
                $user = [
                    'type' => $data->user->type,
                    'nom' => $data->user->nom,
                    'email' => $data->user->email,
                    'slug' => $data->user->slug,
                    'numero' => $data->user->numero,
                    'commune' => $data->user->commune->nom_commune,
                    'date' => $data->date, //date('j/m/y'),
                    'fact' =>  $data->numero_commande //$this->getNumeroCommande(),
                ];
                //dd($user);
                return response()->json([
                    'status' => 200,
                    'user' => $user,
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
        $request['etat_commande'] = "enregistrer";
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
                'etat_livraison' => 'nullable|string|max:255',
                'slug' => 'nullable|string|max:255',
            ];
        }
        return [
            'user_id' => 'required|integer',
            'date' => 'required|date',
            'etat_livraison' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
        ];
    }

    public function getNumeroCommande(){
        return "SYM-".date("j")."".date("m")."".date("y")."".date("h")."".date("m")."".date("s");
    }
}