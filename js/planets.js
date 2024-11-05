async function fetchJson(request) {
    try {
      const response = await fetch(request);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
  
  function createPlanetsCard({
    name,
    isDestroyed,
    image,
  }) {
    return `
        <div class="card" style="width: 18rem;">
          <img src="${image}" class="card-img-top" id="imgPlanets" alt="${name}">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text"><strong>Is Destroyed: </strong>${isDestroyed}</p>
          </div>
        </div>
      `;
  }
  
  async function displayPlanets() {
    const request = "https://dragonball-api.com/api/planets?limit=20";
    const planets = document.getElementById("planets");
    const planetsData = await fetchJson(request);
  
    if (!planets) {
      console.error("Error: could not get element by id");
      return;
    }
  
    if (!planetsData || !planetsData.items) {
      console.error("Error: couldn't load data correctly");
      return;
    }
  
    const planetsCards = planetsData.items.map(createPlanetsCard).join("");
  
    planets.innerHTML = planetsCards;
  }
  
  displayPlanets();
  