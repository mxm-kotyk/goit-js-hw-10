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
refs.countryCard.style.cssText = 'display: flex; flex-direction: column;';

refs.searchField.addEventListener(
  'input',
  debounce(handleCountrySearchOnInput, DEBOUNCE_DELAY)
);

function handleCountrySearchOnInput(e) {
  const searchQuery = e.target.value.trim();

  if (searchQuery === '') {
    clearMarkup();
    return;
  }

  searchService.fetchCountry(searchQuery).then(data => {
    if (data.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
      return;
    } else if (data.length <= 10 && data.length >= 2) {
      insertMarkup(data, refs.countryList, createListMarkup);
    } else {
      insertMarkup(data, refs.countryCard, createCardMarkup);
    }
  });
}

function insertMarkup(data, element, markupFn) {
  clearMarkup();
  const markup = markupFn(data);
  element.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryCard.innerHTML = '';
}
