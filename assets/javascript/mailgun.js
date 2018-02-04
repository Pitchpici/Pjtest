$(document).ready(function() {


  // $.ajax('https://api.mailgun.net/v3/sandboxc502a7a2dae748469de9804c3742317f.mailgun.org/messages',
	var queryURL = "https://api.mailgun.net/v3/";
	var hdrVal = "Basic " + btoa("api:key-ef72536d6301ae8ec42279773af8eaf9");

	$.ajax({
		url: "https://us-central1-empower-hope.cloudfunctions.net/api/mailgun-api/sandboxc502a7a2dae748469de9804c3742317f.mailgun.org/messages",
		method: "POST",
		headers: {"Authorization": hdrVal},
		data: 
		{
			from: "joann_enos@verizon.net",
			to: "joann_enos@verizon.net",
			subject: "Hello from Mailgun",
			html: "This is plain-text email."		
		},

	}).then(function(response){
	   console.log(response);
	});
});


