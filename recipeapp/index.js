const mealsEl=document.getElementById('meals')
const favContainer=document.getElementById('fav-meals')
const searchTerm=document.getElementById('search-term')
const searchBtn=document.getElementById('search')
const mealPopup=document.getElementById('meal-popup')
const popupClose=document.getElementById('close-popup')
const mealInfoEl=document.getElementById('meal-info');

getRandomMeal()
fetchFavMeals()
async function getRandomMeal(){
 const resp=await  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
 const respData=await resp.json();
 const  randomMeal=respData.meals[0];
 console.log(randomMeal)
 
 addMeal(randomMeal,true)
}

async function getMealById(id){
const resp=await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)
const respData=await resp.json();
const meal=respData.meals[0];
return meal;

}

async function getMealsBySearch(term){
const resp=await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term)

const respData=await resp.json();
const meals= respData.meals;
return meals;

}

function addMeal(mealData,random=false){
    console.log(mealData)
  const meal=document.createElement('div')
  meal.classList.add('meal');

meal.innerHTML=` <div class="meal-header">
${random ? `
<span class="random">Random recipe</span>` : ''}

         <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
     </div>
     <div class="meal-body">
         <h4>${mealData.strMeal}</h4>
         <button  class="fav-btn"><i class="fas fa-heart"></i></button>
     </div>
 </div>
`;
const btn=meal.querySelector('.meal-body .fav-btn')

btn.addEventListener('click',()=>{
    if(btn.classList.contains('active')){
        removeMealFromLS(mealData.idMeal)
        btn.classList.remove('active')
    }else{
       addMealsToLS(mealData.idMeal)
        btn.classList.toggle('active')
    }
    //clean the container
   
    fetchFavMeals();
});


  mealsEl.appendChild(meal)
}

function addMealsToLS(mealId){
    const mealIds=getMealsFromLS();
    localStorage.setItem('mealIds',JSON.stringify([...mealIds,mealId]))

}

function removeMealFromLS(mealId){
    const mealIds=getMealsFromLS();
    localStorage.setItem('mealIds',JSON.stringify([...mealIds.filter(id=>id!==mealId)]))

}

function getMealsFromLS(){
    const mealIds=JSON.parse(localStorage.getItem('mealIds'));
    return mealIds ===null ? [] :mealIds;
}

async function fetchFavMeals(){
    favContainer.innerHTML=''
    const mealIds=getMealsFromLS()
    
     for(let i=0;i<mealIds.length;i++){
         const mealId=mealIds[i];
         meal=await getMealById(mealId);
         addMealFav(meal)
        
     }     
}
function addMealFav(mealData){

const favMeal=document.createElement('li')

favMeal.innerHTML=`
<img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
<p>${mealData.strMeal}</p>
<button class="clear"><i class="fas fa-window-close"></i></button>
`;

const btn=favMeal.querySelector('.clear')
btn.addEventListener('click',()=>{
    removeMealFromLS(mealData.idMeal);
    fetchFavMeals()
})

favMeal.addEventListener('click',()=>{

    showMealInfo(mealData)
})
  favContainer.appendChild(favMeal)

}

function showMealInfo(mealData){
   
    //clean up
    mealInfoEl.innerHTML=''
    //update the meal info
    const mealEl=document.createElement('div');
     
    const ingredients=[];
    //get ingredients and measures
    for(let i=1;i<=20;i++){
        if(mealData['strIngredient'+i]){
           ingredients.push(`${mealData['strIngredient'+i]} - ${mealData['strMeasure'+i]}`)
        }else{
            break;
        }
    }
    mealEl.innerHTML=` <h1>${mealData.strMeal}</h1>
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    
    
    <p>${mealData.strInstructions}</p>
    <h3>Ingredients</h3>
    <ul>
    ${ingredients.map((item)=>`
    <li>${item}</li>
    `).join("")}
    </ul>`;

    mealInfoEl.appendChild(mealEl)
    
    //show popup
    mealPopup.classList.remove('hide')
}

searchBtn.addEventListener('click',async()=>{
    //clean container before another search
    mealsEl.innerHTML=''
    const search=searchTerm.value;
 const meals=await getMealsBySearch(search)
 if(meals){

     meals.forEach((meal)=>{
         addMeal(meal);
        })
    }
})
popupClose.addEventListener('click',()=>{
    mealPopup.classList.add('hide')
})