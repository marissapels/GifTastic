$(document).ready(function(){

	var topics=["Spongebob", "Dexter's Laboratory", "Hey Arnold", "Recess", "The Powerpuff Girls", "Rugrats", "Scooby-Doo", "Doug","Arthur","DuckTales", "The Smurfs"]

	$("#show-submit").on("click",function(){
		event.preventDefault();
		var newShow=$("#show-input").val().trim();
		topics.push(newShow);
		showButtons();
	})

	function showButtons(){
		$("#buttons-section").empty();
		for (var i=0; i<topics.length; i++){
			var button=$("<button>"+topics[i]+"</button>")
			button.addClass("show");
			button.data("name", topics[i]);
			$("#buttons-section").append(button);
		}
	}

	function displayGif (){
		var showTitle = $(this).data("name");
		showTitle=showTitle.replace(/ /g,'+')
		console.log(showTitle);
		var queryURL= "http://api.giphy.com/v1/gifs/search?q="+showTitle+"&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method:"GET"
		}).done(function(response){
			console.log(response);
			for (var i=0; i<response.data.length; i++){
				var rating=$("<div>"+"Rated: "+ response.data[i].rating + "</div>");
				var image=$("<img>").attr("src", response.data[i].images.fixed_height_still.url);
				image.addClass("image");
				image.attr("data-type", "still");
				image.attr("data-still", response.data[i].images.fixed_height_still.url);
				image.attr("data-dynamic", response.data[i].images.fixed_height.url);

				$("#shows-section").append(rating);
				$("#shows-section").append(image);

				$(".image").on("click",function(){
					var state=$(this).attr("data-type")
					if (state==="still"){
						$(this).attr("src", $(this).attr("data-dynamic"));
						console.log($(this).attr("data-dynamic"));
						$(this).attr("data-type","dynamic");
					}
					else{
						$(this).attr("src", $(this).attr("data-still"));
						$(this).attr("data-type","still");
					}
				});
			}
		});
	}

	showButtons();
	$(document).on("click",".show",displayGif);

})