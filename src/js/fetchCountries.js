export class RestCountriesAPI {
  #BASE_URL = 'https://restcountries.com/v3.1/name/';
  #params = 'name,capital,population,languages,flags';

  fetchCountry(query) {
    return fetch(`${this.#BASE_URL}${query}?fields=${this.#params}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .catch(error => console.warn(error));
  }
}
