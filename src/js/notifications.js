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

  API.fetchCountries(searchQuery)
    .then(countries => {
      renderCountryCard(countries);
    })
    .catch(onFetchError);
}

function onFetchError(error) {
  console.log(error);
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
  // err.hideError();
  // error("Please enter a more specific query!");
  // searchQuery = refs.inputField.value;
}
