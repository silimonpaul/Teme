const POKEMON_API = "https://pokeapi.co/api/v2/pokemon";
const IMAGE_API =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

async function fetchPokemonImage(id) {
  try {
    // Using official Pokemon artwork
    return `${IMAGE_API}/${id}.png`;
  } catch (error) {
    console.error("Error fetching Pokemon image:", error);
    // Fallback to Pokemon sprite if artwork fails
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}

async function fetchPokemonDetails(id) {
  try {
    const response = await fetch(`${POKEMON_API}/${id}`);
    if (!response.ok) throw new Error("Pokemon data not found");
    console.log(response);
    return await response.json();
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
    return null;
  }
}

async function createPokemonCard(pokemon) {
  const template = document.getElementById("pokemon-card-template");
  const card = template.content.cloneNode(true);

  const pokemonImage = await fetchPokemonImage(pokemon.id);

  // Update card elements
  card.querySelector(".pokemon-image").src = pokemonImage;
  card.querySelector(".pokemon-image").alt = pokemon.name;
  card.querySelector(".pokemon-name").textContent = pokemon.name;
  card.querySelector(".pokemon-height").textContent = `Height: ${
    pokemon.height / 10
  }m`;
  card.querySelector(".pokemon-weight").textContent = `Weight: ${
    pokemon.weight / 10
  }kg`;
  card.querySelector(
    ".pokemon-experience"
  ).textContent = `Base Experience: ${pokemon.base_experience}`;
  card.querySelector(
    ".pokemon-abilities"
  ).textContent = `Abilities: ${pokemon.abilities
    .map((ability) => ability.ability.name)
    .join(", ")}`;

  // Add types
  const typesContainer = card.querySelector(".types");
  pokemon.types.forEach((type) => {
    const typeSpan = document.createElement("span");
    typeSpan.className = "type-badge";
    typeSpan.textContent = type.type.name;
    typesContainer.appendChild(typeSpan);
  });

  return card;
}

async function initPokemonCatalogue() {
  const pokemonGrid = document.getElementById("pokemonGrid");
  const GEN_1_MAX = 151; // First generation Pokemon limit

  const randomIds = new Set();
  while (randomIds.size < 10) {
    randomIds.add(Math.floor(Math.random() * GEN_1_MAX) + 1);
  }

  const loadingMessage = document.createElement("p");
  loadingMessage.textContent = "Loading Gen 1 Pokémon...";
  pokemonGrid.appendChild(loadingMessage);

  try {
    const pokemonPromises = Array.from(randomIds).map(async (id) => {
      const pokemonData = await fetchPokemonDetails(id);
      if (pokemonData) {
        const card = await createPokemonCard(pokemonData);
        return card;
      }
      return null;
    });

    const pokemonCards = await Promise.all(pokemonPromises);
    pokemonGrid.removeChild(loadingMessage);

    pokemonCards
      .filter((card) => card !== null)
      .forEach((card) => pokemonGrid.appendChild(card));
  } catch (error) {
    console.error("Error initializing Pokemon catalogue:", error);
    loadingMessage.textContent =
      "Error loading Pokémon. Please refresh the page.";
  }
}

initPokemonCatalogue();
