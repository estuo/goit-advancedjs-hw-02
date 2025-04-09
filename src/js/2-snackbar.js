import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refsSnackbar } from './refs';

const { form, delay } = refsSnackbar;

form.addEventListener('submit', event => {
  event.preventDefault();

  const delayValue = parseInt(delay.value, 10);
  if (isNaN(delayValue) || delayValue < 0) {
    return;
  }

  const selectedState = document.querySelector('[name="state"]:checked').value;

  simulatePromise(selectedState, delayValue)
    .then(message => {
      iziToast.success({
        message,
        position: 'topRight',
      });
    })
    .catch(message => {
      iziToast.error({
        message,
        position: 'topRight',
      });
    });
});

function simulatePromise(state, delayVal) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(getMessage(state, delayVal));
      } else {
        reject(getMessage(state, delayVal));
      }
    }, delayVal);
  });
}

function getMessage(state, delayVal) {
  return state === 'fulfilled'
    ? `✅ Fulfilled promise in ${delayVal}ms`
    : `❌ Rejected promise in ${delayVal}ms`;
}
