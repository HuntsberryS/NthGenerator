function getRecipe(event) {
  event.preventDefault();

  let apiKey = "7036a98t226cf2o3c044afd3b96a58b7";
  let cuisineChoice = document.querySelector("#cuisine");
  let prompt = `generate a simple ${cuisineChoice.value} recipe with the recipe name included at the top, followed by a list of ingredients required and then the steps to make the meal. The test should have no special characters, in it and follow this output: Recipe name <br/> <br/> <hr/> Ingredients: (list of ingredients numbered) <hr/>. Instructions: (steps to prepare meal) numbered. Please provide a new recipe every time youre asked`;
  let context =
    "You are a wholesome home cook who loves sharing easy recipes with people. Please provide simple, easy to follow responses and include recipes that may not be well known.";
  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  axios.get(apiURL).then(generateRecipe);
}

function generateRecipe(response) {
  new Typewriter("#recipeText", {
    strings: response.data.answer,
    autoStart: true,
    cursor: "",
    delay: 0.5,
  });
  hideLoading();
}

let recipe = document.querySelector("#form");
let loading = document.querySelector("#loading");
let recipeText = document.querySelector("#recipeText");
let dots = document.querySelector("#dots");
let dotInterval;

function showLoading() {
  loading.style.display = "block";
  let dotCount = 0;

  dotInterval = setInterval(() => {
    dotCount = (dotCount + 1) % 4; // cycle from 0 to 3
    dots.textContent = ".".repeat(dotCount);
  }, 500);
}

function hideLoading() {
  clearInterval(dotInterval);
  loading.style.display = "none";
  dots.textContent = ""; // reset dots
}

recipe.addEventListener("submit", function (event) {
  event.preventDefault();
  recipeText.innerHTML=""
  showLoading();
  getRecipe(event);
});
