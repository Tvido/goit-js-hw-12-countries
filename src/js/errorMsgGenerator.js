import { alert } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import getRefs from './getRefs.js';
const refs = getRefs();

function errorMsgMarkUp() {
  const errorMsg = document.querySelector('.pnotify');
  if (!errorMsg) {
    refs.countriesList.innerHTML = '';
    alert(`Too many matches found.
    Please enter a more specific query!`);
  }
}

function hideError() {
  const errorMsg = document.querySelector('.pnotify-container');
  if (errorMsg) {
    errorMsg.classList.add('hidden');
  }
}

export default { errorMsgMarkUp, hideError };
