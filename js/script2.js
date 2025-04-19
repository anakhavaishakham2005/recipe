document.getElementById("create-recipe-form").addEventListener("submit", function (e) {
    e.preventDefault(); // stop page reload
  
    const name = document.getElementById("recipe-name").value;
    const image = document.getElementById("recipe-image").files[0];
    const ingredients = document.getElementById("recipe-ingredients").value.split(",");
    const instructions = document.getElementById("recipe-instructions").value.split(".");
    const nutrition = document.getElementById("recipe-nutrition").value.split(",");
  
    const reader = new FileReader();
    reader.onload = function (event) {
      const newRecipe = {
        name,
        image: event.target.result, // base64 string of image
        ingredients,
        instructions,
        nutrition
      };
      localStorage.setItem("newRecipe", JSON.stringify(newRecipe));
      window.location.href = "new.html";
    };
    reader.readAsDataURL(image); // convert image to base64
  });
  