const searchbox = document.querySelector('.searchbox');
const searchbtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('.recipe-container'); 
const recipeDetailsContent = document.querySelector('.recipe-details-content');  
const recipeClosebtn = document.querySelector('.recipe-close-btn'); 

const fetchRecipes =async (query) => {
    recipeContainer.innerHTML="<h2>Bringing your taste....</h2> ";
    const data =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response =await data.json();
    
    recipeContainer.innerHTML ="";
    response.meals.forEach(meal => {
        const recipediv = document.createElement('div');
        recipediv.classList.add('recipe');
        recipediv.innerHTML=`<img src= "${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish </p>
        <p>Category: <span>${meal.Category }</span> </p>`

        const button = document.createElement('button');
            button.textContent="View Recipe";
            recipediv.appendChild(button);

            button.addEventListener('click', ()=>{
                openpopup(meal);
            })
        recipeContainer.appendChild(recipediv);
    });
}

const openpopup= (meal) =>{
    recipeDetailsContent.textContent=`
    <h2>${meal.strMeal}</h2>`

    recipeDetailsContent.parentElement.style.display="block";
}

searchbtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    const searchInput = searchbox.value.trim();
    fetchRecipes(searchInput);
});
