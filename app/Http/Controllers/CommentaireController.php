<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PHPUnit\Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\Commentaire;
use App\Models\Product;

class CommentaireController extends Controller
{
    public function __construct()
    {
        //$this->middleware(['api.admin'],['except' => ['index', 'show']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $datas = Commentaire::orderBy('created_at', 'DESC')->get();
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request['slug'] = $this->generateRandomString();
        $request['user_id'] = Auth::user()->id;
        $prdt = Product::where('slug',$request['produitSlug'])->first();
        $request['product_id'] = isset($prdt) ? $prdt->id : $prdt;
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
                //dd($request->toArray());
                $data = Commentaire::create($request->toArray());
                    return response()->json([
                        'status' => 200,
                        'response' => 'Création de données réussies'//$data
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
            $data = Commentaire::where('slug',$slug)->get();
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
                $data = Commentaire::where('slug',$slug)->first();
                if(isset($data) && Auth::user()->type == 2){
                    $data->question = $request->get('question');
                    $data->response = $request->get('response');
                    $data->slug = $request->get('slug');
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
            $data = Commentaire::where('slug',$slug);
            $tmp = $data->first();
            if(isset($tmp) &&  Auth::user()->type == 2 || Auth::user()->id == $tmp->user()->id){
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

    public function dataToValidate($type =""){
        if($type == "update"){
            return [
                'commentaire' => 'required|min:3|max:1000',
                'slug' => 'required|string|max:255',
            ];
        };
        return [
            'commentaire' => 'required|min:3|max:1000',
            'slug' => 'required|string|max:255',
            'user_id' => 'required|integer',
            'product_id' => 'required|integer',
        ];
    }
}
