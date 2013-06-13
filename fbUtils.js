/* ===================
    Variables
   =================== */

var FBAPP_ID = YOUR_APPID;
var FB_PERMISSIONS = "YOUR_PERMISSIONS";

/* ===================
    Main
   =================== */

jQuery(window).load(function(){

    setupFacebook();
    console.log("Load OK!"); //DEBUG
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
            console.log('FB Auth Ok!'); //DEBUG
            //The user is connected to Facebook and with a valid auth

            FB.api('/me', function(response) {
                // Your code here to get info of the current valid connected user
            });
        } else if (response.status === 'not_authorized') {
            console.log("FB Not Auth!", response); //DEBUG 
            //The user has lost auth, send him to auto-connect on your custom fbLogin()
        } else {
            console.log("FB Miss!", response); //DEBUG 
            //The user lost auth and/or not even is connected to Facebook right now
        }        
      });    

    console.log("FB Stuff Done!") //DEBUG 
}

// Decodes the Facebook signed_request
// The signed_request is a param sent by POST from FB with useful info of the current user
// This is frequently used in Page Tab to identify if user has already liked the page or not
// The good thing is that with signed_request you can know this data even if your user has not made a FB Connect yet
// For more info on signed_request check FB Doc: https://developers.facebook.com/docs/facebook-login/using-login-with-games/

function facebookSignedReq(signed_request) {
    var encoded_data = signed_request.split('.',2);

    // decode the data
    var sig = encoded_data[0];
    var json = base64.decode(encoded_data[1]); //You can find the encode64 on https://github.com/nestorvc/Utils/blob/master/base64.js
    var data = JSON.parse(json);

    return data; //data.page.liked is the param that let you know if current FB user has liked the current fanpage of the current page tab
}


//Connect user to Facebook

function fbLogin() {
    FB.login(function(response) {
        if (response.authResponse) {
            console.log("Successful FB Login"); //DEBUG
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: FB_PERMISSIONS});
}

//Desonnect user from Facebook

function fbLogout() {
    FB.logout();
}

//Automatic post to the user's Facebook stream
//You must need to add "publish_actions" auth permission to your fbLogin()'s FB_PERMISSIONS var
//Uses FB.api to auto-post
//For more info check FB Doc: https://developers.facebook.com/docs/reference/javascript/FB.api/

function automaticPostToWall() {

    var obj = {};
    obj['message'] = 'YOUR_MESSAGE';
    obj['name'] = 'YOUR_NAME';
    obj['link'] = 'YOUR_LINK';
    obj['picture'] = 'YOUR_PIC';
    obj['description'] = 'YOUR_DESC';

    FB.api('/me/feed', 'post', obj, function(response) {
      if (!response || response.error) {
        console.log("Cannot post on FB Stream:", response.error) //DEBUG 
      } else {
        console.log("Succesfully auto-post on FB Stream!!!") //DEBUG
        //Here you can add custom success code like a redirect 
      }
    });
}

//Manual post to the user's Facebook stream using FB JS SDK
//In most cases, this is the way FB demands you to allow publish to a user's Facebook stream
//Uses FB.ui to manual-post
//For more info check FB Doc: https://developers.facebook.com/docs/reference/javascript/FB.ui/

function manualPostToWall() {
    var obj = {};
    obj['method'] = 'feed';
    obj['message'] = 'YOUR_MESSAGE';
    obj['name'] = 'YOUR_NAME';
    obj['link'] = 'YOUR_LINK';
    obj['picture'] = 'YOUR_PIC';
    obj['description'] = 'YOUR_DESC';

    FB.ui(obj, function (response) {
      if (!response || response.error) {
        console.log("Cannot post on FB Stream:", response.error) //DEBUG 
      } else {
        console.log("Succesfully manual-post on FB Stream!!!") //DEBUG 
        //Here you can add custom success code like a redirect
      }
    });
}