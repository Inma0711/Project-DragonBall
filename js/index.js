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

function createCharacterCard({
  name,
  image,
  ki,
  maxKi,
  race,
  gender,
  affiliation,
}) {
  return `
      <div class="card" style="width: 18rem;">
        <img src="${image}" class="card-img-top" alt="${name}">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text"><strong></strong> ${race} - ${gender}</p>
          <p class="card-text"><strong>Base KI:</strong> ${ki}</p>
          <p class="card-text"><strong>Total KI:</strong> ${maxKi}</p>
          <p class="card-text"><strong>Affiliation:</strong> ${affiliation}</p>
         
        </div>
      </div>
    `;
}

async function displayCharacters() {
  const request = "https://dragonball-api.com/api/characters?limit=58";
  const characters = document.getElementById("character");
  const charactersData = await fetchJson(request);

  if (!characters) {
    console.error("Error: could not get element by id");
    return;
  }

  if (!charactersData || !charactersData.items) {
    console.error("Error: couldn't load data correctly");
    return;
  }

  const characterCards = charactersData.items.map(createCharacterCard).join("");

  characters.innerHTML = characterCards;
}

displayCharacters();
