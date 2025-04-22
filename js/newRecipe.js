const recipe = JSON.parse(localStorage.getItem("newRecipe"));
if (recipe && document.getElementById('recipe-detail')) {
  const instructionsList = Array.isArray(recipe.instructions)
    ? recipe.instructions.map(i => `<li>${i.trim()}.</li>`).join('')
    : `<li>${recipe.instructions}</li>`;

  document.getElementById("recipe-detail").innerHTML = `
    <h2>${recipe.name}</h2>
    <img src="${recipe.image}" class="img-fluid mb-3" alt="${recipe.name}">

    <h4>Ingredients:</h4>
    <ul>${recipe.ingredients.map(i => `<li>${i.trim()}</li>`).join('')}</ul>

    <h4>Instructions:</h4>
    <ol>${instructionsList}</ol>

    <h4>Nutritional Info:</h4>
<ul>
  <li>Calories: ${recipe.nutrition[0]?.trim()}</li>
  <li>Fat: ${recipe.nutrition[1]?.trim()}</li>
  <li>Carbs: ${recipe.nutrition[2]?.trim()}</li>
  <li>Protein: ${recipe.nutrition[3]?.trim()}</li>
</ul>

    `;
}