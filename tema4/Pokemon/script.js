// Get references to DOM elements that we'll need to interact with
const searchButton = document.getElementById("searchButton");
const pokemonInput = document.getElementById("pokemonInput");
const pokemonDisplay = document.getElementById("pokemonDisplay");

// Function to fetch the first 151 Pokemon from the PokeAPI
async function fetchAllPokemon() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();
    displayPokemonGrid(data.results);
  } catch (error) {
    displayError();
  }
}

// Function to create a single Pokemon card
function createPokemonCard(pokemon, index) {
  return `
      <div class="pokemon-card" onclick="getPokemonInfo('${pokemon.name}')">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png" 
               alt="${pokemon.name}">
          <h3>${pokemon.name.toUpperCase()}</h3>
      </div>
  `;
}

// Function to create all Pokemon cards
function createPokemonCards(pokemonList) {
  return pokemonList
    .map((pokemon, index) => createPokemonCard(pokemon, index))
    .join("");
}

// Function to create and display the grid of Pokemon cards
function displayPokemonGrid(pokemonList) {
  const gridHTML = `
      <div class="pokemon-grid">
          ${createPokemonCards(pokemonList)}
      </div>
  `;
  pokemonDisplay.innerHTML = gridHTML;
}

// Main function that coordinates fetching both Pokemon and species data
async function getPokemonInfo(pokemonName) {
  try {
    const pokemonData = await fetchPokemonData(pokemonName);
    const speciesData = await fetchPokemonSpecies(pokemonData.species.url);
    displayPokemonInfo(pokemonData, speciesData);
  } catch (error) {
    displayError();
  }
}

// Function to fetch detailed Pokemon data from the API
async function fetchPokemonData(pokemonName) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  return await response.json();
}

// Function to fetch Pokemon species data for descriptions
async function fetchPokemonSpecies(speciesUrl) {
  const response = await fetch(speciesUrl);
  return await response.json();
}

// Function to display detailed Pokemon information
function displayPokemonInfo(pokemonData, speciesData) {
  // Get the English description of the Pokemon
  const flavorText = speciesData.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  ).flavor_text;

  // Color mapping for different Pokemon types
  const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };

  // Create the detailed view HTML with all Pokemon information
  pokemonDisplay.innerHTML = `
        <div class="pokemon-detail">
            <!-- Back button to return to the grid view -->
            <button onclick="fetchAllPokemon()" class="back-button">← Back to Album</button>
            
            <!-- Pokemon name and ID number -->
            <h2>${pokemonData.name.toUpperCase()} #${pokemonData.id
    .toString()
    .padStart(3, "0")}</h2>
            
            <!-- Pokemon images (front and back if available) -->
            <div class="pokemon-images">
                <img src="${pokemonData.sprites.front_default}" alt="${
    pokemonData.name
  } front">
                ${
                  pokemonData.sprites.back_default
                    ? `<img src="${pokemonData.sprites.back_default}" alt="${pokemonData.name} back">`
                    : ""
                }
            </div>

            <!-- Pokemon type badges -->
            <div class="types-container">
                ${pokemonData.types
                  .map(
                    (type) =>
                      `<span class="type-tag" style="background-color: ${
                        typeColors[type.type.name]
                      }">
                        ${type.type.name}
                    </span>`
                  )
                  .join("")}
            </div>

            <!-- Pokemon description -->
            <p class="description">${flavorText}</p>

            <!-- Pokemon stats grid -->
            <div class="stats-container">
                <div class="stat-item">
                    <strong>Height:</strong> ${pokemonData.height / 10}m
                </div>
                <div class="stat-item">
                    <strong>Weight:</strong> ${pokemonData.weight / 10}kg
                </div>
                ${pokemonData.stats
                  .map(
                    (stat) => `
                    <div class="stat-item">
                        <strong>${stat.stat.name.replace("-", " ")}:</strong> ${
                      stat.base_stat
                    }
                    </div>
                `
                  )
                  .join("")}
            </div>

            <!-- Pokemon abilities section -->
            <div class="abilities-section">
                <h3>Abilities</h3>
                <div class="abilities-list">
                    ${pokemonData.abilities
                      .map(
                        (ability) =>
                          `<span class="ability-item">${ability.ability.name.replace(
                            "-",
                            " "
                          )}</span>`
                      )
                      .join("")}
                </div>
            </div>
        </div>
    `;
}

// Function to display error message when Pokemon isn't found
function displayError() {
  pokemonDisplay.innerHTML = `<p>Error: Pokemon not found!</p>`;
}

// Event handler for search button click
searchButton.addEventListener("click", () => {
  const pokemonName = pokemonInput.value.toLowerCase();
  if (pokemonName) {
    getPokemonInfo(pokemonName);
  }
});

// Event handler for Enter key in search input
pokemonInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const pokemonName = pokemonInput.value.toLowerCase();
    if (pokemonName) {
      getPokemonInfo(pokemonName);
    }
  }
});

// Initialize the application by loading the Pokemon grid
window.addEventListener("load", fetchAllPokemon);
