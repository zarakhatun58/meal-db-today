
//error message 
document.getElementById('error-message').style.display = 'none';

const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);

    //clear data 
    searchField.value = '';
    // search text jodi empty hoi tahole 
    if (searchText == '') {
        // please write something
    }
    else {
        //load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s= ${searchText}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            // .then(data => console.log(data.meals))
            .then(data => displaySearchResult(data.meals))
            .catch(error => displayError(error()));
    }

}
//error message 
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}




const displaySearchResult = meals => {
    // console.log(meals);
    const searchResult = document.getElementById('search-result');
    //claer from innerhtml
    searchResult.textContent = '';
    if (meals.length == 0) {
        //show no result found

    }

    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `<div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                         <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                         <div class="card-body">
                         <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
        </div>
    </div>`;
        searchResult.appendChild(div);
    })
}
const loadMealDetail = mealId => {
    console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        // .then(data => console.log(data.meals[0]))
        .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-details')
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `<div class="card">
                  <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                   <div class="card-body">
                 <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
              <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
    </div>
</div>`
    mealDetails.appendChild(div);

}