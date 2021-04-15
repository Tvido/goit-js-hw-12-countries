export default function getRefs() {
  return {
    inputField: document.querySelector('#search'),
    countriesList: document.querySelector('.countries-list'),
    form: document.querySelector('.js-search-form'),
  };
}
