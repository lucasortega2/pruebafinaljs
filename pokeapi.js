const $template = document.querySelector("template").content;
const $pokeimg = $template.querySelector(".img-poke-api");
const $pokeName = $template.querySelector(".name-poke-api");
const $pokeCard = $template.querySelector(".card-poke-api");
const $form = document.querySelector(".form-search-api");
const fragment = document.createDocumentFragment();
const $sectionPokeApi = document.querySelector(".section-poke-api");
const $inputSearch = document.getElementById("search-poke-api");
const $loader = document.querySelector(".ball");
const $btnAddTofavs = document.querySelector(".btn-add-poke-api");
const $btnDelfavs = document.querySelector(".btn-del-poke-api");
const ls = localStorage;
const myFavs = JSON.parse(ls.getItem("myFavs"));
function toUpper(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
$loader.style.display = "block";
document.addEventListener("DOMContentLoaded", async (e) => {
  const res = await (
    await axios("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150")
  ).data;
  const results = res.results;
  results.forEach(({ name }, index) => {
    $pokeName.textContent = toUpper(name);
    const urlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${
      index + 1
    }.png`;
    $pokeimg.setAttribute("src", urlImage);
    $pokeCard.dataset.id = index + 1;
    const idFromTemplate = $pokeCard.dataset.id;
    if (myFavs) {
      if (myFavs.includes(idFromTemplate)) {
        $template.querySelector(".btn-add-poke-api").style.display = "none";
        $template.querySelector(".btn-del-poke-api").style.display = "block";
      } else {
        $template.querySelector(".btn-add-poke-api").style.display = "block";
        $template.querySelector(".btn-del-poke-api").style.display = "none";
      }
    }
    const $clone = $template.cloneNode(true);
    fragment.append($clone);
  });
  $sectionPokeApi.append(fragment);
  $loader.style.display = "none";

  const getPokemons = () => {
    const pokemons = document.querySelectorAll(".card-poke-api");
    const searchText = $inputSearch.value.toLowerCase();
    pokemons.forEach((el) => {
      const pokemonName = el
        .querySelector(".name-poke-api")
        .textContent.toLowerCase();
      if (pokemonName.includes(searchText)) {
        el.style.display = "flex";
      } else {
        el.style.display = "none";
      }
    });
  };
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    getPokemons();
  });
  $inputSearch.addEventListener("input", (e) => {
    if (e.target.value === "") {
      getPokemons();
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.matches(".btn-add-poke-api")) {
      e.target.style.display = " none";
      e.target.parentNode.querySelector(".btn-del-poke-api").style.display =
        "block";
      toggleFavorite(e.target.parentNode.dataset.id, true);
    }

    if (e.target.matches(".btn-del-poke-api")) {
      e.target.style.display = " none";
      e.target.parentNode.querySelector(".btn-add-poke-api").style.display =
        "block";
      toggleFavorite(e.target.parentNode.dataset.id, false);
    }
  });

  function toggleFavorite(id, addToFavorites) {
    let myFavsArray = JSON.parse(ls.getItem("myFavs")) || [];

    if (addToFavorites) {
      myFavsArray.push(id);
    } else {
      myFavsArray = myFavsArray.filter((item) => item !== id);
    }

    ls.setItem("myFavs", JSON.stringify(myFavsArray));
  }
});
