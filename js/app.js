// Variables
let tastyCardsData = [];
let favCardsData = [];
let order = false;
const tastyCardsParent = document.querySelector('.tasty-cards');
const favCardsParent = document.querySelector('.favorite-tasty-cards');
const tastyFilterBtn = document.querySelector('.all-cards-filter');
const favFilterBtn = document.querySelector('.fav-cards-filter');

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
	.then(response => tastyCardsData = response.results)
  .then(() => console.log(tastyCardsData)) //TODO: remove after testing
  .then(() => drawCards(tastyCardsData, tastyCardsParent))
  .then(() => createFilterEvents())
	.catch(err => console.error(err));


//Helper Functions
const clearCards = () => {
  tastyCardsParent.innerHTML = "";
  favCardsParent.innerHTML = "";
}

const sortData = ((cardsData) => {
  console.log('called sortData');
  order = !order;
  cardsData.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (order) {
      if (nameA < nameB) return -1
      if (nameA > nameB) return 1
      return 0;
    }
    else {
      if (nameA > nameB) return -1
      if (nameA < nameB) return 1
      return 0;
    }
  })
  return cardsData;
})

const drawCards = (cardsData, parentDiv) => {
  cardsData.forEach(elem => {
    let cardId = elem.id;
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
    if (parentDiv === favCardsParent) tastyCard.classList.add('favorite');
    tastyCard.id = cardId;

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
    parentDiv.append(tastyCard);
  })

  createEventListeners();
}


//Event Listeners
const createEventListeners = () => {
  const heartBtns = document.querySelectorAll('.fav-btn');
  heartBtns.forEach(heartBtn => {
    heartBtn.addEventListener('click', () => {
      if(heartBtn.parentElement.parentElement.parentElement.classList.contains('tasty-cards')) {
        let tastyCardObj = {};
        tastyCardsData.map(object => {
          if (object.id === Number(heartBtn.parentElement.parentElement.id)) tastyCardObj = object;
        });
        
        let tastyCardIndex = tastyCardsData.findIndex(object => object === tastyCardObj);
        favCardsData.push(tastyCardsData[tastyCardIndex]);
        tastyCardsData = tastyCardsData.filter(object => object !== tastyCardsData[tastyCardIndex])
        clearCards();
        drawCards(tastyCardsData, tastyCardsParent);
        drawCards(favCardsData, favCardsParent);
      } else {
        let favCardObj = {};
        favCardsData.map(object => {
          if (object.id === Number(heartBtn.parentElement.parentElement.id)) favCardObj = object;
        });
        
        let favCardIndex = favCardsData.findIndex(object => object === favCardObj);
        tastyCardsData.push(favCardsData[favCardIndex]);
        favCardsData = favCardsData.filter(object => object !== favCardsData[favCardIndex])
        clearCards();
        drawCards(tastyCardsData, tastyCardsParent);
        drawCards(favCardsData, favCardsParent);
      }
    })
  })
}

const createFilterEvents = () => {
  const filterBtns = document.querySelectorAll('.filter-icon');
  filterBtns.forEach(filterBtn => {
    filterBtn.addEventListener('click', () => {
      if (filterBtn.parentElement.parentElement.lastElementChild.classList.contains('tasty-cards')) {
        tastyCardsData = sortData(tastyCardsData);
        clearCards();
        drawCards(tastyCardsData, tastyCardsParent);
        drawCards(favCardsData, favCardsParent);
      } else {
        favCardsData = sortData(favCardsData);
        clearCards();
        drawCards(favCardsData, favCardsParent);
        drawCards(tastyCardsData, tastyCardsParent);
      }
    })
  })
}