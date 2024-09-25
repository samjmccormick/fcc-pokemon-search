const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const imgDiv = document.getElementById("img-wrapper");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const typesElement = document.getElementById("types");


const allValidPokemon = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

async function fetchData() {
    try {
        const res = await fetch(allValidPokemon + searchInput.value.toLowerCase());
        const data = await res.json();
        showStats(data);
    } catch (err) {
        alert("Pokémon not found");
    }
};

function showStats(data) {
    const { sprites, stats, types } = data;
    pokemonName.textContent = data.name.toUpperCase();
    pokemonId.textContent = data.id;
    height.textContent = data.height;
    weight.textContent = data.weight;

    for (let i = 0; i < stats.length; i++) {
        if (document.getElementById(`${stats[i].stat.name}`)) {
            document.getElementById(`${stats[i].stat.name}`).textContent = stats[i].base_stat
        }
    }
  
    for (let i = 0; i < types.length; i++) {
        typesElement.innerHTML += `<span class="types">${types[i].type.name.toUpperCase()}</span>`
    }

    imgDiv.innerHTML = `<img src="${sprites.front_default}" alt="${data.name.toUpperCase()}" id="sprite" >`
};


searchBtn.addEventListener("click", () => {
    typesElement.innerHTML = "";
    fetchData()
});


