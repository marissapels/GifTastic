$(document).ready(function(){

	//array that holds list of cartoon names
	var topics=["Spongebob", "Dexter's Laboratory", "Hey Arnold", "Recess", "The Powerpuff Girls", "Rugrats", "Scooby-Doo", "Doug","Arthur","DuckTales", "The Smurfs", "Animaniacs"]

	//adds user input to topics array
	$("#show-submit").on("click",function(){
		event.preventDefault();
		var newShow=$("#show-input").val().trim();
		topics.push(newShow);
		showButtons();
	})

	//creates buttons for all shows listed in topics array
	function showButtons(){
		$("#buttons-section").empty();
		for (var i=0; i<topics.length; i++){
			var button=$("<button>"+topics[i]+"</button>")
			button.addClass("show");
			button.data("name", topics[i]);
			$("#buttons-section").append(button);
		}
	}

	//function that uses AJAX properties to pull and display gifs from giphy API
	function displayGif (){

		//clears show section to prevent dublication
		$("#shows-section").empty();

		var showTitle = $(this).data("name");
		//replaces spaces in titles with + for easier searching

		showTitle=showTitle.replace(/ /g,'+')
		console.log(showTitle);

		//url from where data is retrieved. Limit is set to 10 gifs
		var queryURL= "https://api.giphy.com/v1/gifs/search?q="+showTitle+"&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method:"GET"

		//performs this function when ajax commands are complete			
		}).done(function(response){
			console.log(response);
			for (var i=0; i<response.data.length; i++){
				var holder = $("<div>");
				holder.addClass("holder");

				//stores rating data and initial image as still
				var rating=$("<div>"+"Rating: "+ response.data[i].rating + "</div>");
				var image=$("<img>").attr("src", response.data[i].images.fixed_height_still.url);
				image.addClass("image");
				image.attr("data-type", "still");

				//saves dynamic and static gif URLs
				image.attr("data-still", response.data[i].images.fixed_height_still.url);
				image.attr("data-dynamic", response.data[i].images.fixed_height.url);

				//appends rating info and still image to html
				holder.append(rating);
				holder.append(image);
				$("#shows-section").append(holder);
			}
			
			//when image is clicked, make it move!!
			$(".image").on("click",function(){
			console.log("click");
			var state=$(this).attr("data-type")
			console.log(state);

			//if the image is still, when it's clicked, change its src url to the dynamic link
			if (state==="still"){
				$(this).attr("src", $(this).attr("data-dynamic"));
				console.log($(this).attr("data-dynamic"));
				$(this).attr("data-type","dynamic");
			}
			//if the image is dynamic, when it's clicked, change its src url to the still link
			else{
				$(this).attr("src", $(this).attr("data-still"));
				$(this).attr("data-type","still");
				}
			});
		});
	}
	//show initial buttons when the page loads
	showButtons();

	//Event Delegation so that when the show button is clicked (including user additions), run the displayGif function
	$(document).on("click",".show",displayGif);

})