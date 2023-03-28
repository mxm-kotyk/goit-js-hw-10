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
  clearMarkup();

  if (searchQuery === '') {
    return;
  }

  searchService
    .fetchCountry(searchQuery)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      if (data.length <= 10 && data.length >= 2) {
        insertMarkup(data, refs.countryList, createListMarkup);
      }

      if (data.length === 1) {
        insertMarkup(data, refs.countryCard, createCardMarkup);
      }
    })
    .catch(onFetchError);
}

function insertMarkup(data, element, markupFn) {
  const markup = markupFn(data);
  element.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryCard.innerHTML = '';
}

function onFetchError(err) {
  Notify.failure('Oops, there is no country with that name');
}
