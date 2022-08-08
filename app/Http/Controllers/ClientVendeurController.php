<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PHPUnit\Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Commune;
use App\Models\Compteur;

class ClientVendeurController extends Controller
{
    public function __construct()
    {
        $this->middleware(['api.admin']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $datas = User::orderBy('created_at', 'DESC')->get();
            $communes = Commune::all("nom_commune","id", "slug");
            $tabs = [];
            foreach($datas as $data){
                array_push($tabs,[
                    "id" => $data->id,
                    "nom" => $data->nom,
                    "email" => $data->email,
                    "numero" => $data->numero,
                    "type" => $data->type,
                    "commune" => $data->commune->nom_commune,
                    "image" => $data->image,
                ]);
            }
            return response()->json([
                'status' => 200,
                'response' => $tabs,
                'communes' => $communes
            ]);
         }catch (Exception $exception){
             return response()->json([
                 'status' => 404,
                 'response' => 'Un problème vous empêche de continuer'
             ]);
         }
    }

    public function getAcheteur()
    {
        try {
            $datas = User::where('type',0)->orderBy('created_at', 'DESC')->get();
            $communes = Commune::all("nom_commune","id", "slug");
            $tabs = [];
            foreach($datas as $data){
                array_push($tabs,[
                    "id" => $data->id,
                    "nom" => $data->nom,
                    "email" => $data->email,
                    "numero" => $data->numero,
                    "type" => $data->type,
                    "commune" => $data->commune->nom_commune,
                    "image" => $data->image,
                ]);
            }
            return response()->json([
                'status' => 200,
                'response' => $tabs,
                'communes' => $communes
            ]);
         }catch (Exception $exception){
             return response()->json([
                 'status' => 404,
                 'response' => 'Un problème vous empêche de continuer'
             ]);
         }
    }

    public function getVendeur()
    {
        try {
            $datas = User::where('type',1)->orderBy('created_at', 'DESC')->get();
            $communes = Commune::all("nom_commune","id", "slug");
            $tabs = [];
            foreach($datas as $data){
                array_push($tabs,[
                    "id" => $data->id,
                    "nom" => $data->nom,
                    "email" => $data->email,
                    "numero" => $data->numero,
                    "type" => $data->type,
                    "commune" => $data->commune->nom_commune,
                    "image" => $data->image,
                ]);
            }
            return response()->json([
                'status' => 200,
                'response' => $tabs,
                'communes' => $communes
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
        if($request['type'] == 2){
            $request['type'] = 0;
        }
       // $request['commune_id'] = (isset($commune)) ? $commune->id : null;

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
            $request['password']=Hash::make($request['password']);
            try {
                if(Auth::user()->type == 2){
                    $data = User::create($request->toArray());
                    $userCompteur = Compteur::get()->first();
                    if(isset($userCompteur)){
                        $userCompteur->nombre_user++;
                        if($data->type == 0){
                            $userCompteur->nombre_acheteur++;
                        }else{
                            $userCompteur->nombre_vendeur++;
                        }
                        $userCompteur->save();
                    }
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
            $data = User::where('slug',$slug)->get();
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
        //$request['slug'] = $this->generateRandomString();
        $commune = (isset($request['commune_id'])) ? Commune::where('nom_commune',$request['commune_id'])->first() : null;
        $request['commune_id'] = (isset($commune)) ? $commune->id : null;
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
                $data = User::where('id',$slug)->first();
                if(isset($data) && Auth::user()->type == 2 && ($data->type != 2)){
                    $prece = $data->type;
                    $data->nom = $request->get('nom');
                    //$data->image = $request->get('image');
                    $data->numero = $request->get('numero');
                    $data->email = $request->get('email');
                    $data->commune_id = $request->get('commune_id');
                    if($request['password']){
                        $data->password = Hash::make($request['password']);
                    }
                    $data->type = $request->get('type');
                    $data->update();
                    $actu = $data->type;
                    $this->setUserCompteur($prece, $actu);

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
            $data = User::where('id',$slug);
            $tmp = $data->first();
            if(isset($tmp) &&  (Auth::user()->type == 2) && (Auth::user()->id != $tmp->id) && ($tmp->type != 2)){
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
                'nom' => 'required|string|max:255',
                'numero' => 'required|string|max:8|min:8',
                'email' => 'required|string|email|max:255',
                'commune_id' => 'required|integer',
                'password' => 'nullable|string|min:8',
                'type' => 'required|integer',
                'image' => 'nullable|string|max:255',
            ];
        }
        return [
            'nom' => 'required|string|max:255',
            'numero' => 'required|string|unique:users|max:8|min:8',
            'email' => 'required|string|email|max:255|unique:users',
            'commune_id' => 'required|integer',
            'password' => 'nullable|string|min:8',
            'type' => 'required|integer',
            'image' => 'nullable|string|max:255',
        ];
    }
}