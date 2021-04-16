import API from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { alert, error } from '@pnotify/core';
import getRefs from './getRefs.js';
import countryCardTmpl from '../templates/items.hbs';
import countriesListTml from '../templates/list.hbs';
import err from './errorMsgGenerator.js';

const refs = getRefs();

refs.inputField.addEventListener('input', debounce(onInputFieldFIll, 500));

function onInputFieldFIll(e) {
  e.preventDefault();
  const searchQuery = refs.inputField.value;
  refs.countriesList.innerHTML = "";
  
  if (!searchQuery) return;
  API.fetchCountries(searchQuery)
    .then(countries => {
      renderCountryCard(countries);
    })
    .catch(onFetchError);

  // API.fetchCountries(searchQuery)
  //   .then(countries => {
  //     renderCountryCard(countries);
  //   })
  //   .catch(onFetchError);
}

function onFetchError(error) {
    alert(`Too many matches found.
    Please enter a more specific query!`);
}

function renderCountryCard(countries) {
  if (countries.length >= 10) {
    return err.errorMsgMarkUp();
  }

  if (countries.length > 1 && countries.length < 10) {
    err.hideError();
    refs.countriesList.innerHTML = countriesListTml(countries);
  }

  if (countries.length === 1) {
    err.hideError();
    refs.countriesList.innerHTML = countryCardTmpl(countries[0]);
  }
}
