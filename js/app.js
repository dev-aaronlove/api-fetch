// Variables
let tastyData = [];
let favList = [];
const allCardsParent = document.querySelector('.tasty-cards');
const favCardsParent = document.querySelector('.favorite-tasty-cards');
const unfilteredAllCards = {};
const filteredAllCards = {};
const unfilteredFavCards = {};
const filteredFavCards = {};
const toggleFilterAllCards = document.querySelector('.all-cards-filter');
const toggleFilterFavCards = document.querySelector('.fav-cards-filter');

//API Fetch
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'db1d7e5359mshc9c765917e2fc5cp1bcb36jsn5c08a80f9bbe',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	}
};

fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&tags=under_30_minutes&q=chicken', options)
	.then(response => response.json())
	.then(response => {
    console.log(response.results);
    tastyData = response.results;
  })
	.catch(err => console.error(err));


//Helper Functions
const createCards = () => {
  tastyData.forEach(elem => {
    let name = elem.name;
    let servings = `${elem.num_servings} servings`;
    let time = `${elem.total_time_minutes} minutes`;
    let description = elem.description;
    let thumbnail = elem.thumbnail_url;
    
    let favBtnIcon = document.createElement('i');
    let favBtn = document.createElement('div');
    let descriptionDiv = document.createElement('div');
    let bottom = document.createElement('div');
    let timeDiv = document.createElement('div');
    let pipe = document.createElement('div');
    let servingsDiv = document.createElement('div');
    let details = document.createElement('div');
    let nameDiv = document.createElement('div');
    let header = document.createElement('div');
    let thumbnailDiv = document.createElement('div');
    let top = document.createElement('div');
    let tastyCard = document.createElement('div');

    favBtnIcon.classList.add('fa-regular', 'fa-heart');
    favBtn.classList.add('fav-btn');
    descriptionDiv.classList.add('description');
    bottom.classList.add('bottom');
    timeDiv.classList.add('total-time');
    servingsDiv.classList.add('servings');
    details.classList.add('details');
    nameDiv.classList.add('name');
    header.classList.add('header');
    thumbnailDiv.classList.add('thumbnail');
    top.classList.add('top');
    tastyCard.classList.add('tasty-card');

    thumbnailDiv.style.backgroundImage = `url(${thumbnail})`;
    descriptionDiv.innerHTML = description;
    timeDiv.innerHTML = time;
    servingsDiv.innerHTML = servings;
    nameDiv.innerHTML = name;

    favBtn.append(favBtnIcon);
    bottom.append(descriptionDiv, favBtn);
    details.append(servingsDiv, pipe, timeDiv);
    header.append(nameDiv, details);
    top.append(thumbnailDiv, header);
    tastyCard.append(top, bottom);
    allCardsParent.append(tastyCard);
  })
}

const createFilters = () => {
  let names = [];
  allCardsParent.forEach(elem => {
    names.push(elem.name);
  })
  console.log('unsorted names: ', names);
  names.sort();
  console.log('sorted names: ', names);
}

//App
setTimeout(() => createCards(), 2500);
setTimeout(() => createFilters(), 2800);

//Event Listeners
toggleFilterAllCards.addEventListener('click', function() {
  allCardsSection = document.querySelector('.tasty-cards');
  if (!allCardsSection.className.includes('filtered')) {
    allCardsParent = filteredAllCards;
    allCardsSection.classList.add('filtered');
  }
  else {
    allCardsParent = unfilteredAllCards;
    allCardsSection.classList.remove('filtered');
  }
})

toggleFilterFavCards.addEventListener('click', function() {
  favCardsSection = document.querySelector('.favorite-tasty-cards');
  if (!favCardsSection.className.includes('filtered')) {
    allCardsParent = filteredFavCards;
    favCardsSection.classList.add('filtered');
  }
  else {
    favCardsParent = unfilteredFavCards;
    favCardsSection.classList.remove('filtered');
  }
})

//eventListener click for click heart icon
document.addEventListener
  //if class "favorite" NOT present, then add it and append child to favorite parent element.
  //If class "favorite" present, then remove it and remove child from favorite parent element.
