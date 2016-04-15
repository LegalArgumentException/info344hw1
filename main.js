/*
	Tanner Garrett 
	4/13/2016
	Informatics 344
	HW1

	Description : This file provides the functionality of the search feature of a page that allows people to look up NBA players based on their name
*/

$(function() {
	console.log("boom!");
	$("#submitButton").on("click", showPlayers);
});

// Refreshes the display area and populates it with players that names contain
// the text that the user input into a form
function showPlayers() {
	// Clear the Results area
	$("#resultsArea").html("");
	// Get the string input the user provided
	var playerString = $("#nameQuery").val();
	// AJAX call that returns a JSON object with the players and their respective
	// stats
	$.get({
		method: "GET",
		url: "getplayer.php",
		data: {name: playerString}
	}).done(function( data ) {
		// Parses the object returned as a JSON object
		playerData = JSON.parse(data);
		// Loops through the JSON and populates the display area in the HTML accordingly
		for (var i = 0; i < playerData.length; i++) {
			var player = playerData[i];
			var playerDiv = $("<div class='playerDiv'></div>").html('<p>Name: ' + player.Name + '</p>' + player.General_Team + '</p><p>PPG: ' + player.Misc_PPG + '</p><hr />');
			$("#resultsArea").append(playerDiv);
		}
	});
}