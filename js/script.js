
const recipes = [
  {
    name: "Samosa",
    image: "images/samosa.jpg",
    ingredients: [
      "2 cups boiled potatoes, mashed",
      "1 cup boiled mixed vegetables",
      "1 tsp cumin seeds", "Spices", "Salt",
      "Samosa wrappers", "Oil for frying"
    ],
    instructions: [
      "Heat oil in a pan, add cumin seeds. Once they splutter, add the mashed potatoes, boiled veggies, and spices.",
      "Cook the mixture for 5-7 minutes, then let it cool.",
      "Prepare the samosa wrappers or use pre-made ones, stuff with the filling, and seal the edges.",
      "Heat oil in a pan and fry the samosas until golden brown."
    ],
    nutrition: ["Calories: 150-200", "Fat: 7g", "Carbs: 20g", "Protein: 2g"]
  },
  {
    name: "Dry Chana",
    image: "images/chana.jpg",
    ingredients: [
      "2 cups chickpeas", "Onion", "Tomato puree",
      "Spices", "Coriander", "Salt"
    ],
    instructions: [
      "Heat oil, add cumin seeds, and let them splutter. Add onions and sauté until golden.",
      "Add pureed tomatoes and cook for 5-7 minutes.",
      "Add the spices and cook for another 3-4 minutes.",
      "Add the chickpeas, water (optional), and simmer for 10-15 minutes.",
      "Garnish with fresh coriander."
    ],
    nutrition: ["Calories: 250-300", "Fat: 10g", "Carbs: 35g", "Protein: 12g"]
  },
  {
    name: "Dhokla",
    image: "images/dhokla.jpg",
    ingredients: ["1 cup besan", "Yogurt", "Baking soda", "Mustard seeds", "Chilies"],
    instructions: [
      "In a bowl, mix besan, yogurt, turmeric, and a little water to form a batter.",
      "Add baking soda and mix gently.",
      "Pour the batter into a greased steaming tray.",
      "Steam for 15-20 minutes.",
      "Heat oil, add mustard seeds, ginger, and chilies. Pour over the steamed dhokla.",
      "Cut into pieces and serve hot."
    ],
    nutrition: ["Calories: 150", "Fat: 7g", "Carbs: 20g", "Protein: 5g"]
  },
  {
    name: "Medu Vada",
    image: "images/vada.jpeg",
    ingredients: ["1 cup urad dal", "Onion", "Green chilies", "Ginger", "Cumin"],
    instructions: [
      "Soak urad dal for 4-6 hours, then grind to a smooth batter.",
      "Add chopped onion, chilies, ginger, cumin seeds, and salt to the batter.",
      "Heat oil in a deep frying pan.",
      "Wet your hands, shape the batter into donut-like shapes, and fry until golden brown."
    ],
    nutrition: ["Calories: 120-150", "Fat: 7g", "Carbs: 15g", "Protein: 4g"]
  },
  {
    name: "Murukku",
    image: "images/murukku.jpeg",
    ingredients: ["Rice flour", "Urad dal flour", "Cumin", "Sesame seeds", "Chili powder"],
    instructions: [
      "In a bowl, mix rice flour, urad dal flour, sesame seeds, cumin seeds, chili powder, and salt.",
      "Add water to form a soft dough.",
      "Shape the dough into spirals or use a murukku maker.",
      "Fry in hot oil until golden and crispy."
    ],
    nutrition: ["Calories: 100", "Fat: 5g", "Carbs: 13g", "Protein: 2g"]
  },
  {
    name: "Elayada",
    image: "images/elayada.jpeg",
    ingredients: ["Rice flour", "Grated coconut", "Jaggery", "Cardamom", "Banana leaves"],
    instructions: [
      "In a pan, cook the jaggery and coconut until the mixture thickens.",
      "Add cardamom powder.",
      "Spread rice flour on a banana leaf, add the coconut-jaggery mixture, and fold the leaf into a parcel.",
      "Steam for 20 minutes."
    ],
    nutrition: ["Calories: 120", "Fat: 5g", "Carbs: 20g", "Protein: 2g"]
  }
];

// Load cards on homepage
if (document.getElementById('recipeGrid')) {
  const grid = document.getElementById('recipeGrid');
  recipes.forEach((recipe, index) => {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.innerHTML = `
      <div class="card recipe-card" onclick="viewRecipe(${index})">
        <img src="${recipe.image}" class="card-img-top" alt="${recipe.name}">
        <div class="card-body">
          <h5 class="card-title">${recipe.name}</h5>
        </div>
      </div>
    `;
    grid.appendChild(col);
  });
}

// Save selected recipe to local storage
function viewRecipe(index) {
  localStorage.setItem("selectedRecipe", JSON.stringify(recipes[index]));
  window.location.href = "recipe.html";
}

// Load details on recipe.html
if (document.getElementById('recipe-detail')) {
  const recipe = JSON.parse(localStorage.getItem("selectedRecipe"));
  if (recipe) {
    const instructionsList = Array.isArray(recipe.instructions)
      ? recipe.instructions.map(j => `<li>${j}</li>`).join('')
      : recipe.instructions.split('.').filter(s => s.trim()).map(j => `<li>${j.trim()}.</li>`).join('');

    document.getElementById('recipe-detail').innerHTML = `
     <h2>${recipe.name}</h2> 
     <img src="${recipe.image}" class="img-fluid mb-3" alt="${recipe.name}">
      
      <h4>Ingredients:</h4>
      <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
      <h4>Instructions:</h4>
      <ol>${instructionsList}</ol>
      <h4>Nutritional Info:</h4>
      <ul>${recipe.nutrition.map(n => `<li>${n}</li>`).join('')}</ul>
    `;
  }
}

// Search suggestions
const searchBar = document.getElementById('searchBar');
const suggestionsList = document.getElementById('suggestions');
if (searchBar) {
  searchBar.addEventListener('input', () => {
    const val = searchBar.value.toLowerCase();
    suggestionsList.innerHTML = "";
    if (val.trim() === "") return;

    const filtered = recipes.filter(r => r.name.toLowerCase().includes(val));
    filtered.forEach(r => {
      const li = document.createElement('li');
      li.className = "list-group-item";
      li.textContent = r.name;
      li.onclick = () => {
        viewRecipe(recipes.indexOf(r));
      };
      suggestionsList.appendChild(li);
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const newRecipe = JSON.parse(localStorage.getItem('newRecipe'));
  if (newRecipe) {
    const card = document.createElement('div');
    card.className = 'col-md-4 recipe-card mb-4';

    card.innerHTML = `
      <div class="card h-100">
        <img src="${newRecipe.image}" class="card-img-top" alt="${newRecipe.name}">
        <div class="card-body text-center">
          <h5 class="card-title">${newRecipe.name}</h5>
        </div>
      </div>
    `;

    // Add it to the recipe grid
    document.getElementById('recipeGrid').appendChild(card);
  }
});
