import { Route } from "react-router-dom";
import Dashboard from "./components/profile/Dashboard";
import Client from "./components/Client";
import Login from "./components/client/auth/Login";
import url from "./url";
import Register from "./components/client/auth/Register";
import Checkout from "./components/client/Checkout";
import Home from "./components/client/body/Home";
import Produit from "./components/client/body/Product";
import Faq from "./components/client/body/contents/Faq";
import About from "./components/client/body/contents/About";
import TdB from "./components/profile/contents/TdB";
import Order from "./components/profile/contents/Order";
import Product from "./components/profile/contents/Product";
import Customer from "./components/profile/contents/Customer";
import Rapport from "./components/profile/contents/Rapport";
import Paiement from "./components/profile/contents/Paiement";
import ProductFormCategorie from "./components/profile/includes/ProductFormCategorie";
import ProductList from "./components/profile/includes/ProductList";
import ProductForm from "./components/profile/includes/ProductForm";
import CustomerListe from "./components/profile/includes/CustomerList";
import CustomerForm from "./components/profile/includes/CustomerForm";
import CustomerSellerForm from "./components/profile/includes/CustomerSellerForm";
import UserProfile from "./components/profile/contents/UserProfile";
import FAQs from "./components/profile/contents/FAQs";
import Reduction from "./components/profile/contents/Reduction";
import ProductDetail from "./components/client/body/contents/ProductDetail";
import NotFound from "./components/client/body/contents/not_found/NotFound";
import Marque from "./components/profile/contents/Marque";
import RecommandationVente from "./components/profile/contents/RecommandationVente";
import PaiementFailed from "./components/client/body/contents/PaiementFailed";
import PaiementSuccess from "./components/client/body/contents/PaiementSuccess";

const notFound = <NotFound />
const appRoutes = [
  { path: url.index, element: <Client /> },
  { path: url.app_root, element: <Client /> },
  { path: url.dashboard_, element: <Dashboard /> },
  { path: url.app_dashboard_, element: <Dashboard /> },
  { path: url.no_found, element: notFound },
];

const bodyRoutes = [
  { path: url.app, element: <Home /> },
  { path: url.home, element: <Home /> },
  { path: url.produits, element: <Produit /> },
  { path: url.app_produits, element: <Produit /> },
  { path: url.produits_detail, element: <ProductDetail />},
  { path: url.faqs, element: <Faq /> },
  { path: url.app_faqs, element: <Faq /> },
  { path: url.apropos, element: <About /> },
  { path: url.login, element: <Login /> },
  { path: url.app_login, element: <Login /> },
  { path: url.register, element: <Register /> },
  { path: url.checkout, element: <Checkout /> },
  { path: url.app_checkout, element: <Checkout /> },
  { path: url.app_checkout_params, element: <Checkout /> },
  { path: url.checkout_params, element: <Checkout /> },
  { path: url.checkout_app_paiement, element: <Checkout /> },
  { path: url.checkout_success, element: <PaiementSuccess /> },
  { path: url.checkout_failed, element: <PaiementFailed /> },
  //{path:"sinali", element:<Navigate to={url.no_found} replace />}
  { path: url.no_found, element: notFound },



];

/*const CartRoutes = [
  { path: url.checkout, element: <Checkout /> },
  { path: url.register, element: <Register /> },
  { path: url.no_found, element: notFound },

]*/


const dashboardRoutes = [
  { path: url.dashboard_home, element: <TdB /> },
  { path: url.app_dashboard_home, element: <TdB /> },
  { path: url.dashboard_commandes, element: <Order /> },
  { path: url.dashboard_produit_, element: <Product /> },
  { path: url.dashboard_client_, element: <Customer /> },
  { path: url.dashboard_rapports, element: <Rapport /> },
  { path: url.dashboard_paiements, element: <Paiement /> },
  { path: url.dashboard_reductions, element: <Reduction /> },
  { path: url.dashboard_ventes_reco, element: <RecommandationVente /> },
  { path: url.dashboard_meilleures_marques, element: <Marque /> },
  { path: url.dashboard_messages, element: <h1 className="h2">Message</h1> },
  { path: url.dashboard_parametres_user, element:<UserProfile /> },
  { path: url.dashboard_parametres_faq, element: <FAQs /> },
  { path: url.no_found, element: notFound },

];

const dashboardProduitRoutes = [
  { path: url.dashboard_produit_liste, element: <ProductList/> },
  { path: url.dashboard_produit_categorie, element: <ProductFormCategorie /> },
  { path: url.dashboard_produit_ajout, element: <ProductForm /> },
  { path: url.no_found, element: notFound },

]

const dashboardClientRoutes = [
  { path: url.dashboard_client_liste, element: <CustomerListe/> },
  { path: url.dashboard_client_simple, element: <CustomerForm /> },
  { path: url.dashboard_client_vendeur, element: <CustomerSellerForm /> },
  { path: url.no_found, element: notFound },

]

const getRoute = (route, idx) => {

    return (
        <Route key={idx} path={route.path} element={route.element} />
    );
}

export {
    appRoutes,
    bodyRoutes,
    //CartRoutes,
    dashboardRoutes,
    dashboardProduitRoutes,
    dashboardClientRoutes,
    getRoute
}
