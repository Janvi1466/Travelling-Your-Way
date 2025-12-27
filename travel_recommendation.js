let travelData = {};

// Fetch data
fetch("travel_recommendation_api.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch travel data");
    }
    return response.json();
  })
  .then(data => {
    travelData = data;
    console.log("Travel data fetched successfully:", travelData);
  })
  .catch(error => {
    console.error("Error fetching travel data:", error);
  });

// Search
document.getElementById("searchBtn").addEventListener("click", () => {
  const keyword = document
    .getElementById("searchInput")
    .value
    .toLowerCase()
    .trim();

  let results = [];

  if (keyword === "beach" || keyword === "beaches") {
    results = travelData.beaches || [];
  } 
  else if (keyword === "temple" || keyword === "temples") {
    results = travelData.temples || [];
  } 
  else if (keyword === "country" || keyword === "countries") {
    // Extract cities from all countries
    results = travelData.countries
      ? travelData.countries.flatMap(country => country.cities)
      : [];
  }
  else {
    // 🔍 CITY / PLACE NAME SEARCH
    const countryCities = travelData.countries
      ? travelData.countries.flatMap(country =>
          country.cities.filter(city =>
            city.name.toLowerCase().includes(keyword)
          )
        )
      : [];

    const temples = travelData.temples
      ? travelData.temples.filter(temple =>
          temple.name.toLowerCase().includes(keyword)
        )
      : [];

    const beaches = travelData.beaches
      ? travelData.beaches.filter(beach =>
          beach.name.toLowerCase().includes(keyword)
        )
      : [];

    results = [...countryCities, ...temples, ...beaches];
  }

  displayResults(results);
});

// Display
function displayResults(results) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!results || results.length === 0) {
    resultsDiv.innerHTML = "<p>No recommendations found.</p>";
    return;
  }

  results.forEach(place => {
    const card = document.createElement("div");
    card.className = "result-card";

    card.innerHTML = `
      <h3>${place.name}</h3>
      <img src="${place.imageUrl}" width="200">
      <p>${place.description}</p>
    `;

    resultsDiv.appendChild(card);
  });
}

// Reset
document.getElementById("resetBtn").addEventListener("click", clearResults);

function clearResults() {
  document.getElementById("searchInput").value = "";
  document.getElementById("results").innerHTML = "";
}
