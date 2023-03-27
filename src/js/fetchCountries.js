import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class RestCountriesAPI {
  #BASE_URL = 'https://restcountries.com/v3.1/name/';
  #params = 'name,capital,population,languages,flags';

  fetchCountry(query) {
    return fetch(`${this.#BASE_URL}${query}?fields=${this.#params}`)
      .then(response => {
        if (response.status === 404) {
          Notify.failure('Oops, there is no country with that name');
        } else if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .catch(error => console.warn(error));
  }
}
