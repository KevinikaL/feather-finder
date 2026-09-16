// Find the input, button, and results on the page
let birdColor = document.getElementById("bird-color");
let searchButton = document.getElementById("search-button");

async function searchBirds(color) {
    let response = await fetch(
      "https://student-data-api.k-legier2012-624.workers.dev/api/v1/datasets/birds/records?search=" + color
    );
  
    console.log("Status: " + response.status);
  
    let data = await response.json();
  
    console.log("Records: " + data.records.length);
   
    let text = "";

    data.records.forEach(function (record) {
      text = text + "• " + record.Name +
        " — Primary Color: " + record["Primary Color"] + " ";
    });
    
    document.getElementById("results-list").textContent = text;
  }

// Listen for the Search button to be clicked
 searchButton.addEventListener("click", function () {

  // Get what the visitor typed
  let color = birdColor.value;

  // Show what they typed on the page
  searchBirds(color);
});