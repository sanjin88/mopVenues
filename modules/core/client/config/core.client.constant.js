(function () {

    'use strict';

    var MACROVO_FEED_PAGE_SIZE = 6;
    var MACROVO_ACTIVITIES_FEED_PAGE_SIZE = 8;
    var MACROVO_SEARCH_PAGE_SIZE = 3;
    var MACROVO_COMMENTS_PAGE_SIZE = 10;
    var MACROVO_ARTICLE_STYLE_COMMENTS_PAGE_SIZE = 10;
    var DEFAULT_PLACEHOLDER = 'Start typing';
    var DEFAULT_AUTOSUGGEST_KEY_MAP = { TITLE: 'description' };
    var DEFAULT_AUTOSUGGEST_DISPLAY_MAP = ['description'];
    var EXPIRED_FEED_ITEM = 'Ended';
    var FB_API_KEY = '1163188343713524'; //1057793524262128;
    var QUANDL_API_KEY = 'cg7iPga8Vt_om6TkKLyg';
    var SCROLLING_HOME_PAGE_SPEED_IN_MILLISECONDS = 700;
    var DEFAULT_SEARCH_TAB = 1;
    var HOME_PAGE_ANCHORS = ['homeAnchor', 'whatsItsAboutAnchor', 'whomItsForAnchor', 'getInvolvedAnchor'];
    var API_ROUTE_BASE = 'http://api.macrovo-unstable.2andthree.com';
    var DEFAULT_CONTACTS_SELECTOR_TAB = -1;

    var FOURSQUARE_ID = 'E0HEPI1BC0J2AUHTYE5NMKNXKI1QNBQST23DZXQ1NC2LRSJ3';
    var FOURSQUARE_SECRET = '3KUKXPWGFTRQPIB1JSF3WK4B4VC0FRVJWOPBWSRXPJGKIG53';
    var FOURSQUARE_VERSIONING = '20171212';
    var FOURSQUARE_SEARCH_VENUES_API = 'https://api.foursquare.com/v2/venues/search';

    var PUSHER_API_KEY = 'a5076e1d3a8d3c582cd4';
    var PUSHER_CLUSTER = 'eu';

    var AUTO_SUGGEST_AFFILIATION_KEY_MAP = [
        'description'
    ];

    var AUTO_SUGGEST_AFFILIATION_DISPLAY_MAP = {
        TITLE: 'description',
        DESCRIPTION: 'traverse_path.traverse_path'
    };

    var AUTO_SUGGEST_AOIS_KEY_MAP = [
        'description'
    ];

    var AUTO_SUGGEST_AOIS_DISPLAY_MAP = {
        TITLE: 'description',
        DESCRIPTION: 'traverse_path.traverse_path'
    };


    var CHANNEL_LIST = {
        FOLLOWING: 'following',
        SUGGESTED: 'suggested',
        MY: 'my'
    };

    var AUTO_SUGGEST_ELEMENTS_KEY_MAP = [
        'description',
        'type'
    ];

    var AUTO_SUGGEST_ELEMENT_DISPLAY_MAP = {
        TITLE: 'description',
        DESCRIPTION: 'type'
    };

    var API_ENDPOINTS = {
        FEED_API: API_ROUTE_BASE + '/v1/feed',
        FEED_FILTER_API: API_ROUTE_BASE + '/v1/feed-filters/',
        FEED_BOOKMARKS_API: API_ROUTE_BASE + '/v1/feed-bookmarks',
        FEED_PINS_API: API_ROUTE_BASE + '/v1/feed-pins',
        FEED_ITEM_RECOMMENDATIONS_API: API_ROUTE_BASE + '/v1/recommendations',
        RESULT_FILTERS_API: API_ROUTE_BASE + '/v1/result-filters/',
        CURRENT_USER_API: API_ROUTE_BASE + '/v1/account',
        USER_API: API_ROUTE_BASE + '/v1/users',
        ELEMENT_API: API_ROUTE_BASE + '/v1/elements',
        ELEMENT_NLP_API: API_ROUTE_BASE + '/v1/vo-element-suggestions',
        ELEMENT_SUGGESTIONS_API: API_ROUTE_BASE + '/v1/element-suggestions',
        AOI_API: API_ROUTE_BASE + '/v1/aois',
        AFFILIATION_API: API_ROUTE_BASE + '/v1/affiliations',
        REGISTRATION_API: API_ROUTE_BASE + '/v1/signup',
        COUNTRIES_API: API_ROUTE_BASE + '/v1/countries',
        CONTACT_API: API_ROUTE_BASE + '/v1/contacts',
        FOLLOWERS_API: API_ROUTE_BASE + '/v1/followers',
        GROUP_API: API_ROUTE_BASE + '/v1/contact-groups',
        SEARCH_API: API_ROUTE_BASE + '/v1/search',
        BASIC_SEARCH_API: API_ROUTE_BASE + '/v1/search_results',
        ARTICLE_API: API_ROUTE_BASE + '/v1/articles',
        VO_API: API_ROUTE_BASE + '/v1/vos',
        VO_CURRENT_GRAPH: API_ROUTE_BASE + '/v1/vo_graph/chart',
        VO_RECURRENCE_GRAPH: API_ROUTE_BASE + '/v1/vo_graph/group',
        INVITE_API: API_ROUTE_BASE + '/v1/invites/:inviteCode',
        USERS_INVITE_API: API_ROUTE_BASE + '/v1/account/invites',
        COMMENTS_API: API_ROUTE_BASE + '/v1/:commentType/:id/comments',
        ARTICLE_STYLE_COMMENTS_API: API_ROUTE_BASE + '/v1/:commentType/:id/comment-articles',
        PATS_API: API_ROUTE_BASE + '/v1/pats',
        REPLY_API: API_ROUTE_BASE + '/v1/replies',
        ARTICLE_SHARE_API: API_ROUTE_BASE + '/v1/articles/:id/shares',
        VO_SHARE_API: API_ROUTE_BASE + '/v1/vos/:id/shares',
        ACTIVITIES_API: API_ROUTE_BASE + '/v1/activities',
        ANALYSIS_API: API_ROUTE_BASE + '/v1/chart-bookmarks',
        AVATAR_API: API_ROUTE_BASE + '/v1/avatar'
    };

    var BROADCAST_NAMES = {
        CURRENT_USER_UPDATE: 'update:current_user',
        FEED_LIST_UPDATE: 'update:feed_list',
        SEARCH_UPDATE: 'update:search',
        SNAPSEARCH_UPDATE: 'update:snap_search',
        SNAPSEARCH_CLOSE: 'close:snap_search',
        ACTIVITIES_FEED_LIST_UPDATE: 'update:activities_feed_list',
        REGISTRATION_STEP_UPDATE: 'update:registration_step',
        FEED_MENU_SHOW: 'show:feed_menus',
        AUTOSUGGEST_CLEAR_SELECTED: "as-clear:selected"
    };

    var FB_UI_MESSAGES = {
        FRIENDS_ADDED: 'We have added your Facebook friends to your friend list',
        NOT_AUTHORIZED: 'You did not authorize Macrovo',
        FRIENDS_NOT_ADDED: 'We could not add your friends.'
    };

    var APP_MESSAGES = {
        COMMENT_POST_ERROR: 'Could not post comment',
        SERVER_ERROR: 'Server error',
        INVALID_INVITE_CODE: 'Invalid invite code'
    };

    var FB_ENDPOINTS = {
        USER_DATA_AND_FRIENDS: '/me?fields=id,name,friends'
    };

    var AUTH_TOKEN_KEYS = {
        USER_AUTH_TOKEN: 'user_auth_token',
        APP_AUTH_TOKEN: 'app_auth_token'
    };

    //TODO talk to BE team about storing this here...
    var APPLICATION_AUTH = {
        API_URL: API_ROUTE_BASE + '/oauth/access_token',
        GRANT_TYPE: 'client_credentials',
        CLIENT_ID: 'my_client_id',
        CLIENT_SECRET: 'my_client_secret',
        STORAGE_KEY: 'macrovoApplicationAuth'
    };

    var AUTO_SUGGEST_PERSON_KEY_MAP = ['id', 'name'];
    var AUTO_SUGGEST_PEOPLE_DISPLAY_MAP = {
        TITLE: 'name',
        IMAGE: 'avatar_url'
    };

    var AUTO_SUGGEST_PAT_KEY_MAP = [
        'id',
        'details'
    ];

    var AUTO_SUGGEST_PATS_DISPLAY_MAP = {
        TITLE: 'details',
        DESCRIPTION: 'type'
    };

    var AUTO_SUGGEST_COUNTRIES_KEY_MAP = [
        'id',
        'name'
    ];

    var AUTO_SUGGEST_COUNTRIES_DISPLAY_MAP = {
        TITLE: 'name'
    };

    var USER_AUTH = {
        API_URL: API_ROUTE_BASE + '/oauth/access_token',
        GRANT_TYPE: 'password',
        CLIENT_ID: 'my_client_id',
        CLIENT_SECRET: 'my_client_secret',
        USERNAME: 'user@user.com',
        PASSWORD: 'user',
        STORAGE_KEY: 'macrovoUserAuth'
    };

    var ELEMENT_ID_MAP = {
        '1': 'ITEM',
        '2': 'EVENT',
        '3': 'OBJECTIVE',
        '4': 'TIMEFRAME',
        '5': 'CONNECTOR'
    };

    angular.module('core')
        .constant('PATH_TO_APP', 'app/')
        .constant('AUTO_SUGGEST_ELEMENTS_KEY_MAP', AUTO_SUGGEST_ELEMENTS_KEY_MAP)
        .constant('API_ROUTE_BASE', API_ROUTE_BASE)
        .constant('AUTO_SUGGEST_ELEMENT_DISPLAY_MAP', AUTO_SUGGEST_ELEMENT_DISPLAY_MAP)
        .constant('API_ENDPOINTS', API_ENDPOINTS)
        .constant('MACROVO_FEED_PAGE_SIZE', MACROVO_FEED_PAGE_SIZE)
        .constant('MACROVO_ACTIVITIES_FEED_PAGE_SIZE', MACROVO_ACTIVITIES_FEED_PAGE_SIZE)
        .constant('MACROVO_COMMENTS_PAGE_SIZE', MACROVO_COMMENTS_PAGE_SIZE)
        .constant('MACROVO_ARTICLE_STYLE_COMMENTS_PAGE_SIZE', MACROVO_ARTICLE_STYLE_COMMENTS_PAGE_SIZE)
        .constant('MACROVO_SEARCH_PAGE_SIZE', MACROVO_SEARCH_PAGE_SIZE)
        .constant('BROADCAST_NAMES', BROADCAST_NAMES)
        .constant('DEFAULT_PLACEHOLDER', DEFAULT_PLACEHOLDER)
        .constant('DEFAULT_AUTOSUGGEST_KEY_MAP', DEFAULT_AUTOSUGGEST_KEY_MAP)
        .constant('DEFAULT_AUTOSUGGEST_DISPLAY_MAP', DEFAULT_AUTOSUGGEST_DISPLAY_MAP)
        .constant('EXPIRED_FEED_ITEM', EXPIRED_FEED_ITEM)
        .constant('CHANNEL_LIST', CHANNEL_LIST)
        .constant('AUTO_SUGGEST_AFFILIATION_KEY_MAP', AUTO_SUGGEST_AFFILIATION_KEY_MAP)
        .constant('AUTO_SUGGEST_AFFILIATION_DISPLAY_MAP', AUTO_SUGGEST_AFFILIATION_DISPLAY_MAP)
        .constant('AUTO_SUGGEST_AOIS_KEY_MAP', AUTO_SUGGEST_AOIS_KEY_MAP)
        .constant('AUTO_SUGGEST_AOIS_DISPLAY_MAP', AUTO_SUGGEST_AOIS_DISPLAY_MAP)
        .constant('FB_API_KEY', FB_API_KEY)
        .constant('QUANDL_API_KEY', QUANDL_API_KEY)
        .constant('SCROLLING_HOME_PAGE_SPEED_IN_MILLISECONDS', SCROLLING_HOME_PAGE_SPEED_IN_MILLISECONDS)
        .constant('HOME_PAGE_ANCHORS', HOME_PAGE_ANCHORS)
        .constant('FB_ENDPOINTS', FB_ENDPOINTS)
        .constant('FB_UI_MESSAGES', FB_UI_MESSAGES)
        .constant('APP_MESSAGES', APP_MESSAGES)
        .constant('AUTH_TOKEN_KEYS', AUTH_TOKEN_KEYS)
        .constant('APPLICATION_AUTH', APPLICATION_AUTH)
        .constant('USER_AUTH', USER_AUTH)
        .constant('AUTO_SUGGEST_PERSON_KEY_MAP', AUTO_SUGGEST_PERSON_KEY_MAP)
        .constant('AUTO_SUGGEST_PEOPLE_DISPLAY_MAP', AUTO_SUGGEST_PEOPLE_DISPLAY_MAP)
        .constant('ELEMENT_ID_MAP', ELEMENT_ID_MAP)
        .constant('DEFAULT_SEARCH_TAB', DEFAULT_SEARCH_TAB)
        .constant('DEFAULT_CONTACTS_SELECTOR_TAB', DEFAULT_CONTACTS_SELECTOR_TAB)
        .constant('AUTO_SUGGEST_PAT_KEY_MAP', AUTO_SUGGEST_PAT_KEY_MAP)
        .constant('AUTO_SUGGEST_PATS_DISPLAY_MAP', AUTO_SUGGEST_PATS_DISPLAY_MAP)
        .constant('AUTO_SUGGEST_COUNTRIES_KEY_MAP', AUTO_SUGGEST_COUNTRIES_KEY_MAP)
        .constant('AUTO_SUGGEST_COUNTRIES_DISPLAY_MAP', AUTO_SUGGEST_COUNTRIES_DISPLAY_MAP)
        .constant('PUSHER_API_KEY', PUSHER_API_KEY)
        .constant('PUSHER_CLUSTER', PUSHER_CLUSTER)
        .constant('FOURSQUARE_SEARCH_VENUES_API', FOURSQUARE_SEARCH_VENUES_API)
        .constant('FOURSQUARE_ID', FOURSQUARE_ID)
        .constant('FOURSQUARE_SECRET', FOURSQUARE_SECRET)
        .constant('FOURSQUARE_VERSIONING', FOURSQUARE_VERSIONING);
})();


