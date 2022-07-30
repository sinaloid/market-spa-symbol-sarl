<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Pays;
use App\Models\Region;
use App\Models\Province;
use App\Models\Commune;
use App\Models\User;
use App\Models\Marque;
use App\Models\Product;
use App\Models\VenteRecommandation;
use App\Models\Reduction;
use Illuminate\Support\Str;
use Illuminate\Http\Request;


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function all(){
        try {
            $temp = VenteRecommandation::where("type","Meilleure vente")->orderBy('updated_at', 'desc')->paginate(4);
            $meilleurVente = $this->listProduct($temp);
            
            $temp = VenteRecommandation::where("type","Produit recommandé")->orderBy('updated_at', 'desc')->paginate(8);
            $recommandation = $this->listProduct($temp);

            $temp = Reduction::orderBy('updated_at', 'desc')->paginate(4);
            $reduction = $this->listProduct($temp,"reduction");
            
            $temp = Product::orderBy('updated_at', 'desc')->paginate(8);
            $nouveau = $this->listProduct($temp,"product");
            $temp = Product::orderBy('updated_at', 'desc')->get();
            $all = $this->listProduct($temp,"product");

            $marque = Marque::all();

            if(isset($nouveau)){
                return response()->json([
                    'status' => 200,
                    'marque' => $marque,
                    'meilleurVente' => $meilleurVente,
                    'recommandation' => $recommandation,
                    'reduction' => $reduction,
                    'nouveau' => $nouveau,
                    'all' => $all,
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

    public function listProduct($temp, $type = "reduction"){
        $datas = [];

        if($type == "product"){
            foreach($temp as $tmp){
                array_push($datas,[
                    "libelle" => $tmp->libelle,
                    "prix" => $tmp->prix,
                    "image" => $tmp->images()->first()->nom_image,
                    "slug" => $tmp->slug,
                    "categorie" => $tmp->categorie->nom_categorie,
                    //"description" => $tmp->product->description,
                ]);
            }

            return $datas;
        }

        if($type == "reduction"){
            foreach($temp as $tmp){
                array_push($datas,[
                    "libelle" => $tmp->product->libelle,
                    "prix" => $tmp->product->prix * ( 1 - $tmp->pourcentage/100),
                    "image" => $tmp->product->images()->first()->nom_image,
                    "slug" => $tmp->product->slug,
                    "categorie" => $tmp->product->categorie->nom_categorie,
                    //"description" => $tmp->product->description,
                ]);
            }

            return $datas;
        }

        foreach($temp as $tmp){
            array_push($datas,[
                "libelle" => $tmp->product->libelle,
                "prix" => $tmp->product->prix,
                "image" => $tmp->product->images()->first()->nom_image,
                "slug" => $tmp->product->slug,
                "categorie" => $tmp->product->categorie->nom_categorie,
                //"description" => $tmp->product->description,
            ]);
        }

        return $datas;

    }
    public function get($slug)
    {
        try {
            $data = Product::where('slug',$slug)->first();
            if(isset($data)){
                $tmp = [
                    "libelle" => $data->libelle,
                    "prix" => $data->prix,
                    "image" => $data->images()->first()->nom_image,
                    "reduction" => 0,
                    "slug" => $data->slug,
                    "categorie" => $data->categorie->nom_categorie,
                    "description" => $data->description,
                ];
                $data = $data->reduction()->first();
                if(isset($data)){
                    $tmp['reduction'] = $data->pourcentage;
                    $tmp['prix'] = $tmp['prix'] * (1 - $data->pourcentage/100);
                }
                return response()->json([
                    'status' => 200,
                    'response' => $tmp
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
    
    public function userRole(Request $request){

        $message = 'mode utilisateur normale';
        
        $user = User::where('email', $request['email'])->first();
        if($user){
            $user->type = $request['type'];
            //dd($user);
            $user->save();

            $message = ($request['type'] === 1) ? 'mode vendeur': $message;
            $message = ($request['type'] === 2) ? 'mode administrateur': $message;

            return response()->json($message,200);
        }

        return `l'email n'existe pas`;

    }

    public function autocompleteCommune(Request $request)
    {
        $communes = Commune::all("nom_commune","id", "slug");

        return response()->json([
            'message' => 'Commune récupérer avec succès',
            'datas' => $communes
        ],200);
          $query = $request->get('query');
          $filterResult = Commune::where('nom_commune', 'LIKE', '%'. $query. '%')->limit(5)->get();
          return response()->json($filterResult);
    } 

    public function infoPays()
    {
        /*Pays*/
            
            $pays = ["Burkina Faso"];
            $this->countryConfig($pays, 226, 1);

        /*regions*/

            $regions = ["Boucle du Mouhoun","Cascades","Centre","Centre-Est","Centre-Nord","Centre-Ouest","Centre-Sud","Est","Hauts Bassins","Nord","Plateau Central","Sahel","Sud-Ouest"];
            $this->countryConfig($regions, 1, 2);

        /*Province */

            $mouhoune = ["Balé","Banwa","Kossi","Mouhoun","Nayala","Sourou"];
            $this->countryConfig($mouhoune, 1, 3);

            $cascades = ["Comoé","Léraba"];
            $this->countryConfig($cascades, 2, 3);

            $centre = ["Kadiogo"];
            $this->countryConfig($centre, 3, 3);

            $centreEst = ["Boulgou","Koulpélogo","Kouritenga"];
            $this->countryConfig($centreEst, 4, 3);

            $centreNord = [ "Bam","Namentenga","Sanmatenga"];
            $this->countryConfig($centreNord, 5, 3);

            $centreOuest = ["Boulkiemdé","Sanguié","Sissili","Ziro"];
            $this->countryConfig($centreOuest, 6, 3);

            $centreSud = ["Bazéga","Nahouri","Zoundwéogo"];
            $this->countryConfig($centreSud, 7, 3);

            $est = ["Gnagna","Gourma","Komandjoari","Kompienga","Tapoa"];
            $this->countryConfig($est, 8, 3);

            $haut = ["Houet","Kénédougou","Tuy"];
            $this->countryConfig($haut, 9, 3);

            $nord = ["Loroum","Passoré","Yatenga","Zondoma"];
            $this->countryConfig($nord, 10, 3);

            $plateau = ["Ganzourgou","Kourwéogo","Oubritenga"];
            $this->countryConfig($plateau, 11, 3);

            $sahel = ["Oudalan","Séno","Soum","Yagha"];
            $this->countryConfig($sahel, 12, 3);

            $sudOuest = ["Bougouriba","Ioba","Noumbiel","Poni"];
            $this->countryConfig($sudOuest, 13, 3);


        /*Commune*/
        /*1*/
            $bale = ["Bagassi","Bana","Boromo","Fara","Oury","Pâ","Pompoï","Poura","Siby","Yaho"];
            $this->countryConfig($bale, 1, 4);

            $banwa = ["Balavé","Kouka","Sami","Sanaba","Solenzo","Tansila"];
            $this->countryConfig($banwa, 2, 4);

            $kossi = ["Barani","Bomborokuy","Bourasso","Djibasso","Dokuy","Doumbala","Kombori","Madouba","Nouna","Sono"];
            $this->countryConfig($kossi, 3, 4);

            $mouhoun = ["Bondokuy","Dédougou","Douroula","Kona","Ouarkoye","Safané","Tchériba"];
            $this->countryConfig($mouhoun, 4, 4);

            $nayala = ["Gassan","Gossina","Kougny","Toma","Yaba","Yé"];
            $this->countryConfig($nayala, 5, 4);

            $Sourou = ["Di","Gomboro","Kassoum","Kiembara","Lanfièra","Lankoué","Toéni","Tougan"];
            $this->countryConfig($Sourou, 6, 4);

        /*2*/
            $Comoe = ["Banfora","Bérégadougou","Mangodara","Moussodougou","Niangoloko","Ouo","Sidéradougou","Soubakaniédougou","Tiéfora"];
            $this->countryConfig($Comoe, 7, 4);

            $Leraba = ["Dakoro","Douna","Kankalaba","Loumana","Niankorodougou","Ouéléni","Sindou","Wolonkoto"];
            $this->countryConfig($Leraba, 8, 4);

        /*3*/
            $Kadiogo = ["Komki-Ipala","Komsilga","Koubri","Ouagadougou","Pabré","Saaba","Tanghin-Dassouri"];
            $this->countryConfig($Kadiogo, 9, 4);

        /*4*/
            $Boulgou = ["Bagré","Bané","Béguédo","Bissiga","Bittou","Boussouma","Garango","Komtoèga","Niaogho","Tenkodogo","Zabré","Zoaga","Zonsé"];
            $this->countryConfig($Boulgou, 10, 4);

            $Koulpelogo = ["Comin-Yanga","Dourtenga","Lalgaye","Ouargaye","Sangha (Sanga)","Soudougui","Yargatenga","Yondé"];
            $this->countryConfig($Koulpelogo, 11, 4);

            $Kouritenga = ["Andemtenga","Baskouré","Dialgaye","Gounghin","Kando (Cando)","Koupéla","Pouytenga","Tensobentenga (Tansobentenga)","Yargo"];
            $this->countryConfig($Kouritenga, 12, 4);

        /*5*/
            $Bam = ["Bourzanga","Guibaré","Kongoussi","Nasséré","Rollo","Rouko","Sabcé","Tikaré","Zimtanga"];
            $this->countryConfig($Bam, 13, 4);

            $Namentenga = ["Boala","Boulsa","Bouroum","Dargo","Nagbingou","Tougouri","Yalgo","Zéguédéguin"];
            $this->countryConfig($Namentenga, 14, 4);

            $Sanmatenga = ["Barsalogho","Boussouma","Dablo","Kaya","Korsimoro","Mané","Namissiguima","Pensa","Pibaoré","Pissila","Ziga"];
            $this->countryConfig($Sanmatenga, 15, 4);

       /*6*/
            $Boulkiemde = ["Bingo","Imasgo","Kindi","Kokologho","Koudougou","Nandiala","Nanoro","Pella","Poa","Ramongo","Sabou","Siglé","Soaw","Sourgou","Thyou"];
            $this->countryConfig($Boulkiemde, 16, 4);

            $Sanguie = ["Dassa","Didyr","Godyr","Kordié","Kyon","Pouni","Réo","Ténado","Zamo","Zawara"];
            $this->countryConfig($Sanguie, 17, 4);

            $sissili = ["Biéha","Boura","Léo","Nébiélianayou","Niabouri","Silly","Tô"];
            $this->countryConfig($sissili, 18, 4);

            $ziro = ["Bakata","Bougnounou","Cassou","Dalo","Gao","Sapouy"];
            $this->countryConfig($ziro, 19, 4);

        /*7*/
            $Bazega = ["Doulougou","Gaongo","Ipelcé","Kayao","Kombissiri","Saponé","Toécé"];
            $this->countryConfig($Bazega, 20, 4);

            $Nahouri = ["Guiaro","Pô","Tiébélé","Zecco","Ziou"];
            $this->countryConfig($Nahouri, 21, 4);

            $Zoundweogo = ["Béré","Bindé","Gogo","Gomboussougou","Guiba","Manga","Nobéré"];
            $this->countryConfig($Zoundweogo, 22, 4);

        /*8*/
            $Gnagna = ["Bilanga","Bogandé","Coalla","Liptougou","Manni","Piéla","Thion"];
            $this->countryConfig($Gnagna, 23, 4);

            $Gourma = ["Diabo","Diapangou","Fada N’Gourma","Matiacoali","Tibga","Yamba"];
            $this->countryConfig($Gourma, 24, 4);

            $Komondjari = ["Bartiébougou","Foutouri","Gayéri"];
            $this->countryConfig($Komondjari, 25, 4);

            $Kompienga = ["Kompienga","Madjoari","Pama"];
            $this->countryConfig($Kompienga, 26, 4);

            $Tapoa = ["Botou","Diapaga","Kantchari","Logobou","Namounou","Partiaga","Tambaga","Tansarga"];
            $this->countryConfig($Tapoa, 27, 4);

        /*9*/
            $Houet = ["Bama","Bobo-Dioulasso","Dandé","Faramana","Fô","Karangasso-Sambla","Karangasso-Vigué","Koundougou","Léna","Padéma","Péni","Satiri","Toussiana"];
            $this->countryConfig($Houet, 28, 4);

            $Kenedougou = ["Banzon","Djigouéra","Kangala","Kayan","Koloko","Kourignon","Kourouma","Morolaba","N’dorola","Orodara","Samogohiri","Samorogouan","Sindo"];
            $this->countryConfig($Kenedougou, 29, 4);

            $Tuy = ["Békuy","Béréba","Boni","Founzan","Houndé","Koti","Koumbia"];
            $this->countryConfig($Tuy, 30, 4);

        /*10*/
            $Loroum = ["Banh","Ouindigui","Sollé","Titao"];
            $this->countryConfig($Loroum, 31, 4);

            $Passore = ["Arbollé","Bagaré","Bokin","Gomponsom","Kirsi","Lâ-Todin","Pilimpikou","Samba","Yako"];
            $this->countryConfig($Passore, 32, 4);

            $Yatenga = ["Barga","Kaïn","Kalsaka","Kossouka","Koumbri","Namissiguima","Ouahigouya","Oula","Rambo","Séguénéga","Tangaye","Thiou","Zogoré"];
            $this->countryConfig($Yatenga, 33, 4);

            $Zondoma = ["Bassi","Boussou","Gourcy","Léba","Tougo"];
            $this->countryConfig($Zondoma, 34, 4);

        /*11*/
            $Ganzourgou = ["Boudry","Kogho","Méguet","Mogtédo","Salogo","Zam","Zorgho","Zoungou"];
            $this->countryConfig($Ganzourgou, 35, 4);

            $Kourweogo = ["Boussé","Laye","Niou","Sourgoubila","Toéghin"];
            $this->countryConfig($Kourweogo, 36, 4);

            $Oubritenga = ["Absouya","Dapélogo","Loumbila","Nagréongo","Ourgou-Manèga","Ziniaré","Zitenga"];
            $this->countryConfig($Oubritenga, 37, 4);

        /*12*/
            $Oudalan = ["Déou","Gorom-Gorom","Markoye","Oursi","Tin-Akoff"];
            $this->countryConfig($Oudalan, 38, 4);

            $Seno = ["Bani","Dori","Falangountou","Gorgadji","Sampelga","Seytenga"];
            $this->countryConfig($Seno, 39, 4);

            $Soum = ["Arbinda","Baraboulé","Djibo","Diguel","Kelbo","Koutougou","Nassoumbou","Pobé-Mengao","Tongomayel"];
            $this->countryConfig($Soum, 40, 4);

            $Yagha = ["Boundoré","Mansila","Sebba","Solhan","Tankougounadié","Titabé"];
            $this->countryConfig($Yagha, 41, 4);

        /*13*/
            $Bougouriba = ["Bondigui","Diébougou","Dolo","Nioronioro","Tiankoura"];
            $this->countryConfig($Bougouriba, 42, 4);

            $Ioba = ["Dano","Dissin","Guéguéré","Koper","Niégo","Oronkua","Ouessa","Zambo"];
            $this->countryConfig($Ioba, 43, 4);
            
            $Noumbiel = ["Batié","Boussoukoula","Kpuéré","Legmoin","Midébdo"];
            $this->countryConfig($Noumbiel, 44, 4);

            $Poni = ["Bouroum-Bouroum","Bousséra","Djigoué","Gaoua","Gbomblora","Kampti","Loropéni","Malba","Nako","Périgban"];
            $this->countryConfig($Poni, 45, 4);

        return "Create is OK";
    }

    public function countryConfig($names, $id, $table){
        if($table == 1 ){
            /*Pays*/
            foreach($names as $name){
                Pays::create(['nom_pays' => $name, 'slug' => Str::slug($name)]);
            }
        }
        elseif($table == 2) {
            /*Region*/
            foreach($names as $name){
                Region::create(['nom_region' => $name,'pays_id' => $id,'slug' => Str::slug($name)]);
            }
        } elseif($table == 3){
            /*Province*/
            foreach($names as $name){
                Province::create(['nom_province' => $name, 'region_id'=> $id, 'slug' => Str::slug($name)]);
            }
        } else {
            /*Commune */
            foreach($names as $name){
                Commune::create(['nom_commune' => $name, 'province_id' => $id,'slug' => Str::slug($name)]);
            }
        }
    }

    function generateRandomString() {
        /*$characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < 2; $i++) {
            $randomString .= $characters[rand(6, 8)];
        }*/

        return Str::random(8);
        //return $randomString;
    }
}
