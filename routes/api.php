<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ClientVendeurController;
use App\Http\Controllers\ReductionController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\VenteRecommadationController;
use App\Http\Controllers\MarqueController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\Auth\VerificationController;
use App\Http\Controllers\Auth\ForgotPasswordController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['cors', 'json.response']], function () {

    Route::get('infoPays', [Controller::class, 'infoPays']);
    Route::get('init', [Controller::class, 'init']);
    Route::get('autocompleteCommune',[Controller::class, 'autocompleteCommune'])->name('autocompleteCommune');

    // ...
    // creation de compte et connection
    Route::post('/register',[AuthController::class,'register'])->name('register.api');
    Route::post('/login', [AuthController::class,'login'])->name('login.api');

    //Verification de compte et envoi de lien
    Route::get('email/verify/{id}', [VerificationController::class, 'verify'])->name('verification.verify'); // Make sure to keep this as your route name
    Route::get('email/resend', [VerificationController::class, 'resend'])->name('verification.resend');
    
    // Formulaire et route d'envoi lien de renitialisation mdp
    Route::get('password/email', function () {
        //todo formulaire de demande email pour renitialisation de mot de passe
        return redirect()->to('/connexion'); })->name('password.email'); 
    Route::post('password/email', [ForgotPasswordController::class, 'forgot']);

    //Formulaire recuperation et renitialisation de mdp
    Route::get('password/reset/{token}', function ($token) {
        //todo
        return redirect()->to('/connexion'); })->name('password.reset'); 
    Route::post('password/reset', [ForgotPasswordController::class, 'reset']);


    Route::post('user/role', [Controller::class, 'userRole']);
    Route::get('productAll', [Controller::class, 'productAll']);
    Route::get('prod/{slug}', [Controller::class, 'get']);
    Route::get('detailcommandeAll/{slug}', [Controller::class, 'detailcommandeAll']);
    Route::get('faqAll', [Controller::class, 'faqAll']);
    Route::post('app/paiement', [Controller::class, 'paiement']);
    Route::get('paiement/success/{slug}', [Controller::class, 'paiementSuccess']);

});


//Route::middleware(['auth:api','api.verify.email'])->group(function () {
Route::middleware(['auth:api'])->group(function () {
    require __DIR__.'/custom_routes/client.php';
    require __DIR__.'/custom_routes/vendeur.php';
    require __DIR__.'/custom_routes/admin.php';

    Route::apiResources([
        'categorie' => CategorieController::class,
        'product' => ProductController::class,
        'clientVendeur' => ClientVendeurController::class,
        'reduction' => ReductionController::class,
        'commande' => CommandeController::class,
        'meilleureVR' => VenteRecommadationController::class,
        'marque' => MarqueController::class,
        'faq' => FaqController::class,
    ]);
    Route::get('compteur', [Controller::class, 'getCompteur']);
    Route::get('reducterminer', [ReductionController::class, 'terminer']);
    Route::get('acheteur', [ClientVendeurController::class, 'getAcheteur']);
    Route::get('vendeur', [ClientVendeurController::class, 'getVendeur']);
    Route::get('userCommande', [CommandeController::class, 'userCommande']);
    Route::post('paiement', [CommandeController::class, 'paiement']);
    Route::get('paiement/list', [CommandeController::class, 'paiementList']);
    Route::delete('paiement/detele/{slug}', [CommandeController::class, 'paiementDetele']);


});