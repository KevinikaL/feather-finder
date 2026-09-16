// Find the input, button, and results on the page
let birdColor = document.getElementById("bird-color");
let searchButton = document.getElementById("search-button");
let results = document.getElementById("results");

// Listen for the Search button to be clicked
searchButton.addEventListener("click", function () {

  // Get what the visitor typed
  let color = birdColor.value;

  // Show what they typed on the page
  results.textContent = "You searched for: " + color;
});