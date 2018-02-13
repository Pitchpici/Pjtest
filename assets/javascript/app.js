$(document).ready(function() {
  //Materialize CSS parralax function
  // $('.parallax').parallax();

  // Initialize Firebase
   var config = {
    apiKey: "AIzaSyB-5iyoR0EA8RKc2esEUzpeSWK_jCM4C_0",
    authDomain: "pjtest-faa85.firebaseapp.com",
    databaseURL: "https://pjtest-faa85.firebaseio.com",
    projectId: "pjtest-faa85",
    storageBucket: "pjtest-faa85.appspot.com",
    messagingSenderId: "755306943543"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var usersRef = database.ref("users");


  //START AUTHENTICATION

  var currentUid = null;
  var usersArray=[];
  database.ref("users").push(usersArray);

  firebase.auth().onAuthStateChanged(function(user) {
    // onAuthStateChanged listener triggers every time the user ID token changes.
    // This could happen when a new user signs in or signs out.
    // It could also happen when the current user ID token expires and is refreshed.
    if (user && user.uid != currentUid) {
      // Update the UI when a new user signs in.
      // Otherwise ignore if this is a token refresh.
      // Update the current user UID.

      currentUid = user.uid;
      console.log(user);
      console.log(currentUid);

      if (usersArray.indexOf(currentUid) < 0){
        usersArray.push(currentUid);

      }

      else {
        location.href = "https://Pitchpici.github.io/Pjtest/Donate.html" //user with an existing profile
      }

      console.log(usersArray);

    } else {
      // Sign out operation. Reset the current user UID.
      currentUid = null;
      console.log("no user signed in");

      // FirebaseUI config.
      var uiConfig = {
        signInSuccessUrl: 'https://Pitchpici.github.io/Pjtest/setuppage.html',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: 'https://Pitchpici.github.io/'
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
    database.ref("users").set {
      (name).push(address);
  };

  //END SETUP PAGE JS

  function goToHome() {
    location.href = "https://Pitchpici.github.io/Pjtest/Donate.html";
  }


});
