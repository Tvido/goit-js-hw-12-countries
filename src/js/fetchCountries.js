const BASE_URL = "https://restcountries.eu/rest/v2/name/";

async function fetchCountries(searchQuery) {
  return await (await fetch(`${BASE_URL}${searchQuery}`)).json();
}

export default { fetchCountries };
