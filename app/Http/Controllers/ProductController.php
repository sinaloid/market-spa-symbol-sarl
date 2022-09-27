<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PHPUnit\Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\Categorie;
use App\Models\Product;
use App\Models\Marque;
use App\Models\Image;
use App\Models\Compteur;
use Illuminate\Support\Facades\File;


class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware(['api.can.edite'],['except' => ['index', 'show', 'getProduitAndCategorie', 'all']]);
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
                    "categorie_slug" => $product->categorie->slug,
                    "libelle" => $product->libelle,
                    "sku" => $product->sku,
                    "stock" => $product->stock,
                    "prix" => $product->prix,
                    "image" => $product->images()->get('nom_image'),
                    "slug" => $product->slug,
                    "description" => $product->description,
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
        //dd($request->all());
        $request['slug'] = $this->generateRandomString();
        $request['user_id'] = Auth::id();
        $request['image'] = "mmm"; //a supprimer
        $request['categorie_id'] = Categorie::where('slug', $request['categorie_id'])->first();
        
        if($request['categorie_id'] == null){
            return response()->json([
                'status' => 404,
                'response' => "Un problème vous empêche de continuer: la categorie n'exist pas"
            ]);
        }
        
        $request['categorie_id'] = $request['categorie_id']->id;
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
                if(Auth::user()->type == 1 || Auth::user()->type == 2){
                    $data = Product::create($request->toArray());
                    foreach($request->file('images') as $image) {
                        $filename = time().rand(1,900). '.'.$image->getClientOriginalExtension();
                        $image->move('uploads/', $filename);
        
                        Image::create([
                            'nom_image' => $filename,
                            'product_id' => $data->id
                        ]);
                    }
                    $cmpt = Compteur::get()->first();
                    if(isset($cmpt)){
                        $cmpt->nombre_produit++;
                        $cmpt->save();
                        $categorie = Categorie::find($data->categorie_id);
                        $categorie->nombre_produit++;
                        $categorie->save();
                    }
                    return response()->json([
                        'status' => 200,
                        'response' => 'Création de données réussies'
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
        //dd($request->all());

        $request['slug'] = $this->generateRandomString();
        $request['user_id'] = Auth::id();
        $request['categorie_id'] = Categorie::where('slug', $request['categorie_id'])->first();

        if($request['categorie_id'] == null){
            return response()->json([
                'status' => 404,
                'response' => "Un problème vous empêche de continuer: la categorie n'exist pas"
            ]);
        }
        $request['categorie_id'] = $request['categorie_id']->id;
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
                $data = Product::where('slug',$slug)->first();
                if(isset($data) && (Auth::id() == $data->user_id || Auth::user()->type == 2)){
                    $data->libelle = $request->get('libelle');
                    $data->sku = $request->get('sku');
                    $data->stock = $request->get('stock');
                    $data->prix = $request->get('prix');
                    $data->description = $request->get('description');
                    $data->categorie_id = $request->get('categorie_id');
                    $data->update();
                    foreach($request->file('images') as $image) {
                        $filename = time().rand(1,900). '.'.$image->getClientOriginalExtension();
                        $image->move('uploads/', $filename);
        
                        Image::create([
                            'nom_image' => $filename,
                            'product_id' => $data->id
                        ]);
                    }

                    return response()->json([
                        'status' => 200,
                        'response' => 'Modification de données réussies'
                    ]);
                }
                return response()->json([
                    'status' => 404,
                    'response' => 'Donnée inexistante ou problème de droit'
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
            $data = Product::where('slug',$slug);
            $tmp = $data->first();
            if(isset($tmp) &&  (Auth::id() == $tmp->user_id || Auth::user()->type == 2)){
                $cmpt = Compteur::get()->first();
                if(isset($cmpt)){
                    $cmpt->nombre_produit--;
                    $cmpt->nombre_produit = ($cmpt->nombre_produit < 0) ? 0 : $cmpt->nombre_produit;
                    $cmpt->save();
                    $categorie = Categorie::find($tmp->categorie_id);
                    $categorie->nombre_produit++;
                    $categorie->save();

                }

                $reduc = $tmp->reduction();
                $imgsTodelete = $tmp->images();
                $imgs = $tmp->images()->get();
                
                foreach($imgs as $img){
                    $image_path = "uploads/".$img->nom_image;  // Value is not URL but directory file path
                    if(File::exists($image_path)) {
                        File::delete($image_path);
                    }
                }
                $reduc->delete();
                $imgsTodelete->delete();
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

    public function deleteProductImage($img)
    {
        try {
            $data = Image::where('nom_image',$img);
            $tmp = $data->first();
            if(isset($tmp) &&  (Auth::id() == $tmp->user_id || Auth::user()->type == 2)){
                
                $image_path = "uploads/".$tmp->nom_image;  // Value is not URL but directory file path
                    if(File::exists($image_path)) {
                        File::delete($image_path);
                    }
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
                'libelle' => 'required|string|max:255',
                'sku' => 'required|string|max:255',
                'stock' => 'required|string|max:255',
                'prix' => 'required|string|max:255',
                'description' => 'nullable|min:3|max:1000',
                'slug' => 'required|string|max:255',
                'categorie_id' => 'required|integer',
                'user_id' => 'required|integer',
                'images' => 'nullable',
                'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
            ];
        }
        return [
            'libelle' => 'required|string|unique:products|max:255',
            'sku' => 'required|string|unique:products|max:255',
            'stock' => 'required|string|max:255',
            'prix' => 'required|string|max:255',
            'description' => 'nullable|min:3|max:1000',
            'slug' => 'required|string|max:255',
            'categorie_id' => 'required|integer',
            'user_id' => 'required|integer',
            'images' => 'nullable',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ];
    }
}