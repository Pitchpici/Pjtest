$(document).ready(function() {
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

    event.preventDefault();

    var profile = {
      user: uid,
      restaurant: selectedDonor.data('name'),
      restaurantAddress: selectedDonor.data('address')
    };

    console.log(profile);

    // firebase.database().ref("/users").push(profile); 
    firebase.database().ref("/users/" + uid + "/profile").set(profile).then(function(){
        location.href="Donate.html";
    });

  });
});
