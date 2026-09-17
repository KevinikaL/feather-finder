// Find the bird color input on the HTML page
let birdColor = document.getElementById("bird-color");

// Find the Search button on the HTML page
let searchButton = document.getElementById("search-button");

// Find the loading spinner on the page
let loader = document.getElementById("loader");

// Create the sound that plays when a bird card is clicked
let clickSound = new Audio("sounds/bird-click.mp3");

// Keep track of which bird card is selected
let selectedCard;


// This function searches the bird API
// "color" will hold whatever color the visitor typed
async function searchBirds(color) {
 
    // Show the loading spinner
  loader.hidden = false;
  // Send a request to my birds API
  // The visitor's color is added to the search parameter
  let response = await fetch(
    "https://student-data-api.k-legier2012-624.workers.dev/api/v1/datasets/birds/records?search=" + color
  );

  // Show the request status in the console
  // 200 means the request worked
  console.log("Status: " + response.status);

  // Turn the API response into JavaScript data
  let data = await response.json();

  // Show how many bird records came back
  console.log("Records: " + data.records.length);

 // Hide the loading spinner because the data arrived
  loader.hidden = true;


  // Find the results area on the HTML page
  let resultsList = document.getElementById("results-list");

  // Clear the results from the previous search
  resultsList.textContent = "";



  // Go through every bird record returned by the API
  data.records.forEach(function (record) {

    // Create a new div for this bird
    let card = document.createElement("div");

    // Give the div the card class from card.css
    card.classList.add("card");


    // Create an image element for the bird
    let image = document.createElement("img");

    // Get the image URL from this bird's record
    image.src = record["Image of Bird"];

    // Give the image alternative text using the bird's name
    image.alt = record.Name;


    // Create a heading for the bird's name
    let name = document.createElement("h3");

    // Put the bird's name inside the heading
    name.textContent = record.Name;


    // Create a paragraph for the bird's primary color
    let primaryColor = document.createElement("p");

    // Put the bird's primary color inside the paragraph
    primaryColor.textContent =
      "Primary Color: " + record["Primary Color"];


    // Put the image inside the bird card
    card.appendChild(image);

    // Put the bird's name inside the bird card
    card.appendChild(name);

    // Put the bird's primary color inside the bird card
    card.appendChild(primaryColor);

    // Listen for the visitor to click this bird card
   card.addEventListener("click", function () {

    // Play the click sound
    clickSound.play();
   // Remove the highlight from the previously selected card
  if (selectedCard) {
    selectedCard.classList.remove("selected");
  }
   // Highlight the bird card that was clicked
    card.classList.add("selected");
    // Remember which card is selected
  selectedCard = card;

    // Find the Bird Guide parts on the HTML page
    let guideName = document.getElementById("guide-name");
    let guideScientificName =
      document.getElementById("guide-scientific-name");
    let guideDiet = document.getElementById("guide-diet");
    let guideConservation =
      document.getElementById("guide-conservation");
    let rangeTitle = document.getElementById("range-title");
    let guideRange = document.getElementById("guide-range");
    // Find the bird image in the Bird Guide
    let guideBirdImage = document.getElementById("guide-bird-image");
  
    // Show information for the bird that was clicked
    guideName.textContent = record.Name;
  
    guideScientificName.textContent =
      "Scientific Name: " + record["Scientific Name"];
  
    guideDiet.textContent =
      "Diet: " + record["Diet"];
  
    guideConservation.textContent =
      "Conservation Status: " + record["Conservation Status"];

      // Show the selected bird's photo in the Bird Guide
    guideBirdImage.src = record["Image of Bird"];
    guideBirdImage.alt = record.Name;
    guideBirdImage.hidden = false;
  
    // Show the bird's range map
    rangeTitle.textContent = "Range:";
    guideRange.src = record["Image of Range"];
    guideRange.alt = "Range map for " + record.Name;
    guideRange.hidden = false;

    // Move down to the Bird Guide section
  document.getElementById("bird-guide").scrollIntoView();
  });

   // Put the finished bird card inside the results area
    resultsList.appendChild(card);
  });
}


// Listen for the visitor to click the Search button
searchButton.addEventListener("click", function () {

  // Get the color the visitor typed into the input
  let color = birdColor.value;

  // Search the API using that color
  searchBirds(color);
});