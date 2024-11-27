function searchFood() {
    const query = document.getElementById('search-input').value ||
        document.getElementById('search-input-result').value ||
        document.getElementById('search-input-select').value;
    if (!query) {
        alert("검색어를 입력하세요.");
        return;
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
            if (data.meals) {
                displaySearchResults(data.meals);
            } else {
                alert('No results found');
            }
        })
        .catch(error => console.error('Error:', error));
}

function getRandomFood() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            if (data.meals) {
                displaySelectedFood(data.meals[0]);
            }
        })
        .catch(error => console.error('Error:', error));
}

function displaySearchResults(meals) {
    const foodResults = document.getElementById('food-results');
    foodResults.innerHTML = '';
    meals.forEach(meal => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';
        foodItem.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        `;
        foodItem.onclick = () => displaySelectedFood(meal);
        foodResults.appendChild(foodItem);
    });

    document.getElementById('main-page').style.display = 'none';
    document.getElementById('search-page').style.display = 'block';
    document.getElementById('select-page').style.display = 'none';
}

function displaySelectedFood(meal) {
    document.getElementById('food-name').innerText = meal.strMeal;
    document.getElementById('food-image').src = meal.strMealThumb;
    document.getElementById('calories').innerText = `Calories: N/A`;
    document.getElementById('protein').innerText = `Protein: N/A`;
    document.getElementById('carbohydrates').innerText = `Carbohydrates: N/A`;
    document.getElementById('fat').innerText = `Fat: N/A`;
    document.getElementById('food-description').innerText = meal.strInstructions;

    document.getElementById('main-page').style.display = 'none';
    document.getElementById('search-page').style.display = 'none';
    document.getElementById('select-page').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-button').addEventListener('click', searchFood);
    document.getElementById('random-button').addEventListener('click', getRandomFood);
    document.getElementById('search-button-result').addEventListener('click', searchFood);
    document.getElementById('random-button-result').addEventListener('click', getRandomFood);
    document.getElementById('search-button-select').addEventListener('click', searchFood);
    document.getElementById('random-button-select').addEventListener('click', getRandomFood);
});
