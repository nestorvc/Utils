/* ===================
    Variables
   =================== */

var DEBUG = false;
var FBAPP_ID = YOUR_APPID;
var FB_PERMISSIONS = "YOUR_PERMISSIONS";

/* ===================
    Main
   =================== */

jQuery(window).load(function(){

    setupFacebook();
    if(DEBUG) console.log("Load OK!"); //DEBUG
});

/* ===================
    Facebook
   =================== */

//Main setup to initialize the Facebook SDK

function setupFacebook() {
    
    window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
        appId      : FBAPP_ID, // App ID from the App Dashboard
        channelUrl : '', // Channel File for x-domain communication
        status     : true, // check the login status upon init?
        cookie     : true, // set sessions cookies to allow your server to access the session?
        oauth      : true,
        xfbml      : true  // parse XFBML tags on this page?
    });

    // Additional initialization code such as adding Event Listeners goes here
    startFacebook();
    };

    //FB Debugger
    (function(d, debug){
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/es_LA/all" + (debug ? "/debug" : "") + ".js";
        ref.parentNode.insertBefore(js, ref);
    }(document, /*debug*/ false));
}

//Starts the auths on Facebook
//Automatically knows if user has the auth or no and reconnects him if necessary

function startFacebook() {    

    FB.Event.subscribe('auth.authResponseChange', function(response) {
        if (response.status === 'connected') { 
            if(DEBUG) console.log('FB Auth Ok!'); //DEBUG
            //The user is connected to Facebook and with a valid auth

            FB.api('/me', function(response) {
                // Your code here to get info of the current valid connected user
            });
        } else if (response.status === 'not_authorized') {
            if(DEBUG) console.log("FB Not Auth!", response); //DEBUG 
            //The user has lost auth, send him to auto-connect on your custom fbLogin()
        } else {
            if(DEBUG) console.log("FB Miss!", response); //DEBUG 
            //The user lost auth and/or not even is connected to Facebook right now
        }        
      });    

    if(DEBUG) console.log("FB Stuff Done!") //DEBUG 
}


//Connect user to Facebook

function fbLogin() {
    FB.login(function(response) {
        if (response.authResponse) {
            if(DEBUG) console.log("Successful FB Login"); //DEBUG
        } else {
            if(DEBUG) console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: FB_PERMISSIONS});
}

//Desonnect user from Facebook

function fbLogout() {
    FB.logout();
}

//Automatic post to the user Facebook stream
//You must need previous auth permissions set on the fbLogin, specifically "publish_actions"

function postToWall() {

    var params = {};
    params['message'] = 'YOUR_MESSAGE';
    params['name'] = 'YOUR_NAME';
    params['link'] = 'YOUR_LINK';
    params['picture'] = 'YOUR_PIC';
    params['description'] = 'YOUR_DESC';

    FB.api('/me/feed', 'post', params, function(response) {
      if (!response || response.error) {
        if(DEBUG) console.log("Cannot post on FB Wall:", response.error) //DEBUG 
      } else {
        if(DEBUG) console.log("Succesfully auto-post on FB Wall!!!") //DEBUG 
      }
    });
}