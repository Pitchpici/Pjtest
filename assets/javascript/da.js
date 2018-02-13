$(document).ready(function() {

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


	var donationTable = $("#donationTable");


	var emailArray = [];


	// var user = firebase.auth().currentUser.uid; //grab uid
	// var email = firebase.auth().currentUser.email; //grab email address for restaurant

	//START DONATE.HTML JS

	$("#submitBtn").on("click", function(event) {

		event.preventDefault();

		console.log("this is the user id: " + currentUid);

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


			database.ref('users/' + uid + "/donations/" + newKey).set(temp); //and, here, under each user, with the same UNIQUE key


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


			// get the information for the next row - populate with donation

		// 	firebase.database().ref('users/' + user + '/donations').on("child_added", function(snapshot) {

		// 		// Log everything that's coming out of snapshot
		// 		console.log(snapshot.val());

		// 		var userID = snapshot.ref.parent.parent.getKey(); // this gets the restaurant's/ user id
		// 		console.log(userID); //logs user id

		// 		var userKey = snapshot.ref.getKey();
		// 		console.log(userKey); //logs user id




		// 		var tableComplete = tableBegin + "<td>"+ snapshot.val().donateFood + "</th><th>"+ snapshot.val().menuNumber + "</th><th>"+ snapshot.val().pickUp + "</th><th><p><input type='checkbox' class='filled-in' id='" + userKey + "' /><label for='" + userKey+ "''></label></p></tr>";

		// 		 console.log(tableComplete);


		// 		donationTable.append(tableComplete);


		// 	// Handle the errors

		// 	tableComplete = "";

		// }, function(errorObject) {

		// 	console.log("Errors handled: " + errorObject.code);

		// });


		// return firebase.database().ref("/donations");

	});// close submitBTn button event on donate


	//ANGELS PAGE => user id will change here, this ID will be for the angel!!!

		$("#btnHappy").on("click", function() {
			console.log("ROXANA THE HAPPY BUTTON WAS CLICKED!!")

			// var user = firebase.auth().currentUser.uid; // grabs the id of the angel!!!
			 // grabs the id of the angel!!!

			// var email = firebase.auth().currentUser.email; // grabs email address of the angels, for JoAnn's API
				 // grabs email address of the angels, for JoAnn's API

			var obj = {};

			emailArray = [];



			$(".happy").each(function (index, element) { //going through each input field


				if (element.checked) {

					console.log(element);
					var key = $(this).attr("id");
					console.log(key); //this is the donation unique key

					database.ref('donations/' + key).once('value').then(function(snapshot) {

						var donorEmail = snapshot.val().email;
						console.log(donorEmail);

						emailArray.push(donorEmail);
						console.log(emailArray);

						return emailArray;
					});

					// console.log("outside array" + email.Array);


					obj['users/' + uid + '/donations/' + $(this).attr("id")] = null;
					 $(this).parents("tr").remove(); //removes row from table



				}

						console.log('outerspace' + emailArray);
				});// close button happy

		database.ref().update(obj);


		});


	//END DONATE.HTML JS
}); //close document ready function
