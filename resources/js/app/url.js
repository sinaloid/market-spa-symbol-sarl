const ur = '/spa-market/public/'
const url = {
    'index': ur + '/*',
    'home': ur + '/',
    'produits': '/produits',
    'produits_detail': '/produit/:id',
    'faqs': '/faqs',
    'apropos': '/apropos',
    'login': '/connexion',
    'register': '/inscription',
    'checkout': '/paiement/:userSlug',
    'dashboard': '/profile', //pour la redirection
    'dashboard_': '/profile/*',
    'dashboard_home': 'tdb',
    'dashboard_commandes': 'commandes',
    'dashboard_produit': 'produit',  //pour la redirection
    'dashboard_produit_': 'produit/*',
    'dashboard_produit_liste': 'liste',
    'dashboard_produit_categorie': 'categorie',
    'dashboard_produit_ajout': 'prdt',
    'dashboard_client': 'client', //pour la redirection
    'dashboard_client_': 'client/*',
    'dashboard_client_liste': 'liste',
    'dashboard_client_simple': 'clts',
    'dashboard_client_vendeur': 'vendeurs',

    'dashboard_rapports': 'rapports',
    'dashboard_paiements': 'paiements',
    'dashboard_reductions': 'reductions',
    'dashboard_ventes_reco': 'ventes_reco',
    'dashboard_meilleures_marques': 'meilleures_marques',
    'dashboard_messages': 'messages',
    'dashboard_parametres': 'parametres',
    'dashboard_parametres_user': 'user',
    'dashboard_parametres_faq': 'faqs',
    'no_found': '*',


    'app_root': '/app/*',
    'app': '/app',
    'app_faqs': '/app/faqs',
    'app_produits': '/app/produits',
    'app_login': '/app/connexion',
    'app_dashboard': '/app/profile', //pour la redirection
    'app_dashboard_': '/app/profile/*',
    'app_dashboard_home': 'tdb',
    

    
}

export default url;