const refsTimer = {
  input: document.querySelector('input[type="text"]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  btnStart: document.querySelector('[data-start]'),
};

const refsSnackbar = {
  form: document.querySelector('.form'),
  delay: document.querySelector("[name='delay']"),
};

export { refsTimer, refsSnackbar };
