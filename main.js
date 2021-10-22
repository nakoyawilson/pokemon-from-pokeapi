const favouritePokemon = document.querySelector("#favourite-pokemon");
const submit = document.querySelector(".submit");
const pokemonName = document.querySelector(".pokemon-name");
const pokemonId = document.querySelector(".pokemon-id");
const pokemonFront = document.querySelector(".pokemon-front");
const pokemonBack = document.querySelector(".pokemon-back");
const pokemonType = document.querySelector(".pokemon-type");
const pokemonStats = document.querySelector(".pokemon-stats");
const results = document.querySelector(".results");
const error = document.querySelector(".error");

submit.addEventListener("click", (e) => {
    e.preventDefault();
    fetchPokemonData(favouritePokemon.value);
})

const fetchPokemonData = async (pokemon) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
        const data = await res.json();
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id;
        pokemonFront.src = data.sprites.front_default;
        pokemonFront.setAttribute("alt", `Picture of the front of ${data.name}`)
        pokemonBack.src = data.sprites.back_default;
        pokemonBack.setAttribute("alt", `Picture of the back of ${data.name}`)
        const typesArr = data.types;
        const types = [];
        for (let type of typesArr) {
            types.push(` ${type.type.name}`);
        }
        pokemonType.innerHTML = types;
        const statsArr = data.stats;
        const stats = [];
        for (let stat of statsArr) {
            const statName = stat.stat.name;
            const baseStat = stat.base_stat;
            stats.push(` ${statName}: ${baseStat}`)
        }
        pokemonStats.innerHTML = stats;
        results.style.display = "block";
        error.style.display = "none";
    } catch {
        error.style.display = "block";
        results.style.display = "none";
    }
}