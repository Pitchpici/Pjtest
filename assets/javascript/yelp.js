$(document).ready(function()
  {


 	$("#yelp").on("click", function () {
 		yelpInfo();
 			
	});

	function yelpInfo() {

			 var queryURLSearchYelp = 'https://api.yelp.com/v3/businesses/search';
			 var apiKeyYelp = 'Bearer zTJpqez7KoUP_Bzx4wKMATc6I8FFHexDEaczh9IZCqtlhEL1_TT4bzfVK-j5o0Ur01YoaXkzhmxMtv3uMmwm587ofMKFUCxEfF0iGPlso_fvkObv21lMj9m1Iu5xWnYx'


            $.ajax({
            url: "https://cors-anywhere.herokuapp.com/" + queryURLSearchYelp,
            "crossDomain": true,            
            method: "GET",
            data: {
            	location: 'Portsmouth, NH',
            	term: 'restaurants',
            	name: 'Moxy'
            },
            headers: {"Authorization" : apiKeyYelp}            

            }).then(function(response) {

		
              console.log(response);


            });	


	}

</script>

  }
});
