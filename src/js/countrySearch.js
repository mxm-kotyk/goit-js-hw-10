import debounce from 'lodash.debounce';
import { RestCountriesAPI } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createCardMarkup, createListMarkup } from './createMarkup';

const DEBOUNCE_DELAY = 300;
const searchService = new RestCountriesAPI();

const refs = {
  searchField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryCard: document.querySelector('.country-info'),
};

refs.countryList.style.cssText =
  'display: flex; flex-direction: column; gap: 10px';

refs.searchField.addEventListener(
  'input',
  debounce(handleCountrySearchOnInput, DEBOUNCE_DELAY)
);

function handleCountrySearchOnInput(e) {
  const searchQuery = e.target.value.trim();

  if (searchQuery === '') {
    return;
  }

  searchService.fetchCountry(searchQuery).then(data => {
    console.log(searchQuery, data);

    if (data.length > 10) {
      Notify.failure(
        'Too many matches found. Please enter a more specific name.'
      );
      return;
    } else if (data.length < 10 && data.length > 2) {
      // insertListMarkup(data);
      insertMarkup(data, refs.countryList, createListMarkup);
    } else {
      // insertCardMarkup(data);
      insertMarkup(data, refs.countryCard, createCardMarkup);
    }
  });
}

// function insertListMarkup(data) {
//   refs.countryList.innerHTML = '';
//   const listMarkup = createListMarkup(data);
//   refs.countryList.insertAdjacentHTML('beforeend', listMarkup);
// }

// function insertCardMarkup(data) {
//   refs.countryList.innerHTML = '';
//   const cardMarkup = createCardMarkup(data);
//   refs.countryCard.insertAdjacentHTML('beforeend', cardMarkup);
// }

function insertMarkup(data, element, markupFn) {
  refs.countryList.innerHTML = '';
  const markup = markupFn(data);
  element.insertAdjacentHTML('beforeend', markup);
}
