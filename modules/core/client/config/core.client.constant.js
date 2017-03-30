(function () {

    'use strict';

    var FOURSQUARE_ID = 'E0HEPI1BC0J2AUHTYE5NMKNXKI1QNBQST23DZXQ1NC2LRSJ3';
    var FOURSQUARE_SECRET = '3KUKXPWGFTRQPIB1JSF3WK4B4VC0FRVJWOPBWSRXPJGKIG53';
    var FOURSQUARE_VERSIONING = '20171212';
    var FOURSQUARE_SEARCH_VENUES_API = 'https://api.foursquare.com/v2/venues/search';
    var FOURSQUARE_SEARCH_USERS_API = 'https://api.foursquare.com/v2/users/search';
    var FOURSQUARE_AUTHENTICATE_API = 'https://foursquare.com/oauth2/authenticate'
    var FOURSQUARE_REDIRECT_URL = 'http://localhost:3000/assignFourSquareToken';
    var FOURSQUARE_ACCESS_TOKEN = localStorage.getItem('fourSquareToken') || null;



    angular.module('core')
        .constant('PATH_TO_APP', 'app/')
        .constant('FOURSQUARE_AUTHENTICATE_API', FOURSQUARE_AUTHENTICATE_API)
        .constant('FOURSQUARE_SEARCH_VENUES_API', FOURSQUARE_SEARCH_VENUES_API)
        .constant('FOURSQUARE_SEARCH_USERS_API', FOURSQUARE_SEARCH_USERS_API)
        .constant('FOURSQUARE_ID', FOURSQUARE_ID)
        .constant('FOURSQUARE_SECRET', FOURSQUARE_SECRET)
        .constant('FOURSQUARE_VERSIONING', FOURSQUARE_VERSIONING)
        .constant('FOURSQUARE_REDIRECT_URL', FOURSQUARE_REDIRECT_URL)
        .constant('FOURSQUARE_ACCESS_TOKEN', FOURSQUARE_ACCESS_TOKEN);
})();


