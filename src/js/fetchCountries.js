import debounce from 'lodash.debounce';

const refs = {
  searchField: document.querySelector('#search-box'),
  countryList: document.querySelectorAll('.country-list'),
  countryCard: document.querySelectorAll('.country-info'),
};

refs.searchField.addEventListener('input', debounce(searchCountryByName, 300));

function searchCountryByName(e) {
  fetch(`https://restcountries.com/v3.1/name/${e.target.value}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(console.log)
    .catch(error => console.warn(error));
}
