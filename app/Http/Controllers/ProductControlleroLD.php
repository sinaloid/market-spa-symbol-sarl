<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PHPUnit\Exception;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Models\Categorie;
use App\Models\Product;

class ProductController1 extends Controller
{
    public function __construct()
    {
        $this->middleware(['api.can.edite'],['except' => ['index', 'show', 'getProduitAndCategorie']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $products = Product::orderBy('created_at', 'DESC')->get();
            $datas = [];
            foreach($products as $product){
                array_push($datas,[
                    "vendeur" => $product->user->nom,
                    "categorie" => $product->categorie->nom_categorie,
                    "libelle" => $product->libelle,
                    "stock" => $product->stock,
                    "prix" => $product->prix,
                    "image" => $product->image,
                    "slug" => $product->slug,
                ]);
            }
            return response()->json([
                'status' => 200,
                'response' => $datas
            ]);
         }catch (Exception $exception){
             return response()->json([
                 'status' => 404,
                 'response' => 'Un problème vous empêche de continuer'
             ]);
         }
    }

    public function getProduitAndCategorie()
    {
        try {
            $products = Product::orderBy('created_at', 'DESC')->get();
            $categories = Categorie::orderBy('created_at', 'DESC')->get(["nom_categorie","slug"]);
            $datas = [];
            foreach($products as $product){
                array_push($datas,[
                    "vendeur" => $product->user->nom,
                    "categorie" => $product->categorie->nom_categorie,
                    "libelle" => $product->libelle,
                    "stock" => $product->stock,
                    "prix" => $product->prix,
                    "image" => $product->image,
                    "slug" => $product->slug,
                ]);
            }
            //dd($datas);

            return response()->json([
                'status' => 200,
                'product' => $datas,
                'categorie' => $categories
            ]);
         }catch (Exception $exception){
             return response()->json([
                 'status' => 404,
                 'response' => 'Un probleme vous empeche de continuer'
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
        $request['user_id'] = Auth::id();
        //dd($request->all());
        $validator = Validator::make($request->all(), $this->dataToValidate());

        if ($validator->fails()) {
            return response()->json([
                'status' => 900,
                'response' => $validator->messages()
            ]);
        } else {
            try {
                $data = Product::create($request->toArray());
                return response()->json([
                    'status' => 200,
                    'response' => $data
                ]);

            }catch (Exception $exception){
                return response()->json([
                    'status' => 404,
                    'response' => $exception
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
            $data = Product::where('slug',$slug)->get();
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
                'response' => 'Un probleme vous empeche de continuer'
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
        $request['user_id'] = Auth::id();
        $validator = Validator::make($request->all(), $this->dataToValidate());
        if ($validator->fails()) {
            return response()->json([
                'status' => 900,
                'response' => $validator->messages()
            ]);
        } else {
            try {
                $data = Product::where('slug',$slug)->first();
                if(isset($data) && (Auth::id() == $data->id || Auth::user()->type == 2)){
                    $data->nom_Product = $request->get('nom_Product');
                    $data->slug = $this->generateRandomString();
                    $data->update();

                    return response()->json([
                        'status' => 200,
                        'response' => $data
                    ]);
                }
                return response()->json([
                    'status' => 404,
                    'response' => 'Donnée inexistante ou problème de droit'
                ]);

            }catch (Exception $exception){
                return response()->json([
                    'status' => 404,
                    'response' => 'Un probleme vous empeche de continuer'
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
            $data = Product::where('slug',$slug);
            $tmp = $data->first();
            if(isset($tmp) &&  (Auth::id() == $data->id || Auth::user()->type == 2)){
                $data->delete();
                return response()->json([
                    'status' => 200,
                    'response' => 'Donnée supprimer avec succes'
                ]);
            }
            return response()->json([
                'status' => 404,
                'response' => 'Donnée inexistante ou problème de droit'
            ]);
        }catch (Exception $exception){
            return response()->json([
                'status' => 404,
                'response' => 'Un probleme vous empeche de continuer'
            ]);
        }
    }

    public function dataToValidate(){
        return [
            'libelle' => 'required|string|unique:products|max:255',
            'sku' => 'required|string|unique:products|max:255',
            'Stock' => 'required|string|max:255',
            'Prix' => 'required|string|max:255',
            'image' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'categorie_id' => 'required|integer',
            'user_id' => 'required|integer',
        ];
    }
}