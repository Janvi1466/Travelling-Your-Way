fetch("travel_recommendation_api.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    console.log("Fetched Travel Data:", data);

    data.forEach(place => {
      console.log("Place Name:", place.name);
    });
  })
  .catch(error => {
    console.error("Error fetching the data:", error);
  });

let travelData = [];

fetch("travel_recommendation_api.json")
  .then(response => response.json())
  .then(data => {
    travelData = data;
    console.log("Travel data loaded:", travelData);
  })
  .catch(error => console.error("Error loading data:", error));

document.getElementById("searchBtn").addEventListener("click", () => {
  const keyword = document.getElementById("searchInput").value
    .toLowerCase()
    .trim();

  let results = [];

  if (keyword === "beach" || keyword === "beaches") {
    results = travelData.filter(item => item.category === "beach");
  } 
  else if (keyword === "temple" || keyword === "temples") {
    results = travelData.filter(item => item.category === "temple");
  } 
  else if (keyword === "country" || keyword === "countries") {
    results = travelData.filter(item => item.category === "country");
  }

  displayResults(results);
});

// Reset button click event
document.getElementById("resetBtn").addEventListener("click", () => {
  document.getElementById("searchInput").value = "";
  document.getElementById("results").innerHTML = "";
});

// Display results function
function displayResults(results) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (results.length === 0) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
    return;
  }

  results.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${item.name}</h3>
      <img src="${item.imageUrl}" width="200">
      <p>${item.description}</p>
    `;
    resultsDiv.appendChild(div);
  });
}

document.getElementById("clearBtn").addEventListener("click", clearResults);

function clearResults() {
  document.getElementById("searchInput").value = "";
  document.getElementById("results").innerHTML = "";
  console.log("Search results cleared");
}
