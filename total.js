$(document).ready(function() {
    event.preventDefault();
  //Materialize CSS parralax function
  $('.parallax').parallax();

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
// END AUTHENTICATION

// setup page

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
      buttons.hide();
    });

    $("#requester").on("click", function(event) {
      console.log("requester clicked")
      organizationForm.show();
      submit.show();

      restaurantForm.hide();
      buttons.hide();
  
    });

    $("#submitOrg").on("click", function(event) {
      event.preventDefault();

      var organization = $("#organization").val().trim();
      var organizationAddress = $("#organization-address").val().trim();
     
      // var user = firebase.auth().currentUser.uid;

      var profile = {
        user: uid,
        organization: organization,
        organizationAddress: organizationAddress
      };

      console.log(profile);

        firebase.database().ref("/users/" + uid + "/profile").set(profile).then(function(){
          location.href="Donate.html";
        });

    }); // submit org button



//yelp api
var yelpObject;

  $("#yelp").on("click", function() {
    yelpInfo();
  });

  function yelpInfo() {
    //pass in name and zip code
    var restaurant = $("#restaurant").val();
    var zipCode = $("#zipCode").val();
    var queryURLSearchYelp = 'https://api.yelp.com/v3/businesses/search';
    var apiKeyYelp = 'Bearer 9TzN9CretpPmTyWcJzxPZ1sQ-xz1WAAWpzvnSdxGAbNFoO0g0M7vk1cKFbJ4BeotPnffyJU-7cFD4RTMJaaqF7FDuFgMKHpB8K6VXUBf0v-KDwd47UuRi1zewXWCWnYx'


    $.ajax({
      url: "https://cors-anywhere.herokuapp.com/" + queryURLSearchYelp,
      "crossDomain": true,
      method: "GET",
      data: {
        location: zipCode,
                  term: restaurant,
                  limit: 5
      },
      headers: {
        "Authorization": apiKeyYelp
      }

    }).then(function(response) {
      yelpObject = response;

      console.log(response);
      $("#yelpInfo").html("");
      $.each(response.businesses, function(index, item) {
        // var img = $('<div>Name: ' + item.name + '</div><br/> <img src="' + item.image_url  + '" />');
        // $("#yelpInfo").append(img);
        // var img = $('<div>Name: ' + item.name);
        // call

        var organizationYelpAddress = item.location.address1 + ", " + item.location.city + ", " + 
            item.location.city + " " + item.location.state + " " + item.location.zip_code;


        var organizationYelpList = $('<div>' + item.name + ' Location: ' + item.location.address1 + ' '
           + item.location.city + " " + item.location.state + " " + item.location.zip_code + 
           '<button type="button" class="selectName" data-name="'+ item.name + '" data-address="' + organizationYelpAddress + 
           '"">Submit</button></div>');


        $("#yelpInfo").append(organizationYelpList);
      });


    });


  };

   //check to see if user signed in and get profile data

  $(document).on("click", ".selectName", function(event) {

    event.preventDefault();

//get user info???
       var user = firebase.auth().currentUser;
       console.log("this should be the user auth object: " + user);

      var uid, email;

        if (user != null) {
          uid = user.uid;
          email = user.email;
        }
        else {
          console.log("You are not signed in!");
        }  //



        var selectedDonor = $(this);
        console.log(selectedDonor.data('name'));

        var newUser = {
          donations: [],
            profile: {
            user: uid,
            restaurant: selectedDonor.data('name'),
            restaurantAddress: selectedDonor.data('address')
          }
        }

        // var profile = {
        //   user: uid,
        //   restaurant: selectedDonor.data('name'),
        //   restaurantAddress: selectedDonor.data('address')
        // };

    // console.log(profile);

        // firebase.database().ref("/users").push(profile); 
        // firebase.database().ref("/users/" + uid + "/profile").set(profile).then(function(){
        //     location.href="Donate.html";
        // });

          firebase.database().ref("/users/" + uid).set(newUser).then(function(){
            location.href="Donate.html";
        });
    

  });

  //END SETUP PAGE JS

  //Donate page

  var donationTable = $("#donationTable");
  var emailArray = [];

//submit button

  $("#submitBtn").on("click", function(event) {

    event.preventDefault();

    console.log("this is the user id: " + uid);

    if (($("#donateFood").val() == "") || ($("#menuNumber").val() == "") || ($("#value").val() == "") || ($("#pickUp").val() == "")) {

      $('#modal1').modal(); //initialize modal
      $('#modal1').modal('open'); //open modal if any field is empty

    }

    else {

      var donateFood = $("#donateFood").val().trim();

      var menuNumber = $("#menuNumber").val().trim();

      var value = $("#value").val().trim();

      var pickUp = $("#pickUp").val().trim();


      var temp = {

        userId: uid,
        email: email, //added email to the object

        donateFood: donateFood,
        menuNumber: menuNumber,
        value: value,
        pickUp: pickUp
      };

      console.log(temp);

      //push it in the database, with the same unique key for every donation

      var newKey = database.ref('donations/').push().key; //generate unique key for both pushes
      console.log(newKey);

      database.ref('donations/'+ newKey).set(temp); //you SET once in the donations branch with unique key


      // database.ref('users/' + uid + "/donations/" + newKey).set(temp); //and, here, under each user, with the same UNIQUE key

       database.ref('users/' + uid).set({'donations' : []});

      // // firebase.database().ref('donations/' + user).push(temp); //pushed once into donations branch


      // firebase.database().ref('users/' + user + "/donations").set(temp); //and, here, under each user

      $("#donateFood").val("");
      $("#menuNumber").val("");
      $("#value").val("");
      $("#pickUp").val("");

    }


  //in the same submitBtn event, trigerred on donate page => Angels code - first of all, populate that damn table

      //get the information for the first two rows - USER PROFILE

      database.ref("users/" + uid).on("child_added", function(childSnapshot) {
               // console.log(snapshot.val());

               // console.log("donations object" + snapshot.child('donations').val());
               // console.log("profile" + snapshot.child('profile').val());

               console.log(childSnapshot.val().restaurant);

               

               // console.log("snapshotkey " + snap.child('donations'));

               // console.log(snap.donations);
               



               // tableBegin = "<tr><th>" + snapshot.val().restaurant + "</th><th>" + snapshot.val().restaurantAddress +
               //    "</th>";
               //    console.log(tableBegin);

               // console.log(snapshot.child("profile"));


               return tableBegin;

        }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
        });

}); //close submit button

//button
});

