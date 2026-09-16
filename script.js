// Find the bird color input on the HTML page
let birdColor = document.getElementById("bird-color");

// Find the Search button on the HTML page
let searchButton = document.getElementById("search-button");


// This function searches the bird API
// "color" will hold whatever color the visitor typed
async function searchBirds(color) {

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