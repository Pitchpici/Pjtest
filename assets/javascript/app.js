$(document).ready(function() {
  //Materialize CSS parralax function
  // $('.parallax').parallax();

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBR4mFvJiYUIQDIVoDzKCWZyxyeJ-C5rCw",
    authDomain: "fir-project-ca268.firebaseapp.com",
    databaseURL: "https://fir-project-ca268.firebaseio.com",
    projectId: "fir-project-ca268",
    storageBucket: "",
    messagingSenderId: "60944439745"
  };

  firebase.initializeApp(config);

  //START AUTHENTICATION

  var currentUid = null;

  firebase.auth().onAuthStateChanged(function(user) {
    // onAuthStateChanged listener triggers every time the user ID token changes.
    // This could happen when a new user signs in or signs out.
    // It could also happen when the current user ID token expires and is refreshed.
    if (user && user.uid != currentUid) {
      // Update the UI when a new user signs in.
      // Otherwise ignore if this is a token refresh.
      // Update the current user UID.

      currentUid = user.uid;


    } else {
      // Sign out operation. Reset the current user UID.
      currentUid = null;
      console.log("no user signed in");

      // FirebaseUI config.
      var uiConfig = {
        signInSuccessUrl: 'https://joycurthblisso.github.io/GroupProject-1/setuppage.html',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: 'https://clarkwmcd.github.io/'
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
    }

  });

  //END AUTHENTICATION

  //START SETUP PAGE JS

  var organizationForm = $("#organization-form");
  var restaurantForm = $("#restaurant-form");
  var buttons = $("#buttongroup");
  var submit = $("#submit");

  organizationForm.hide();
  restaurantForm.hide();
  submit.hide();

  $("#donor").on("click", function(event) {
    console.log("donor clicked")
    restaurantForm.show();
    submit.show();

    organizationForm.hide();
    // $("#organization").val("");
    // $("#organization-address").val("");
    buttons.hide();
    //hide #organization-form
    //show #restaurant-form
    //hide buttons
  });

  $("#requester").on("click", function(event) {
    console.log("requester clicked")
    organizationForm.show();
    submit.show();

    restaurantForm.hide();
    // $("#restaurant").val("");
    // $("#restaurant-address").val("");
    buttons.hide();
    //show #organization-form
    //hide #restaurant-form
    //hide buttons
  });

  submit.on("click", function(event) {
    var name = $("#restaurant").val();
    var address = $("#restaurant-address").val();
    var database = firebase.database()
    database.ref().push(name);
  });

  //END SETUP PAGE JS

  function goToHome() {
    location.href = "https://joycurthblisso.github.io/GroupProject-1/Donate.html"
  }


});
