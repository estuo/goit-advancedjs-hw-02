import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refsTimer } from './refs';

const { input, days, hours, minutes, seconds, btnStart } = refsTimer;

let selectedEndDate = null;
let timerInterval = null;

btnStart.disabled = true;

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(chosenDates) {
    const date = chosenDates[0];

    if (date <= new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      btnStart.disabled = true;
    } else {
      selectedEndDate = date;
      btnStart.disabled = false;
    }
  },
});

btnStart.addEventListener('click', () => {
  btnStart.disabled = true;
  input.disabled = true;

  timerInterval = setInterval(() => {
    const timeDiff = selectedEndDate - Date.now();

    if (timeDiff <= 0) {
      clearInterval(timerInterval);
      updateTimerDisplay(0);

      input.disabled = false;
      return;
    }

    updateTimerDisplay(timeDiff);
  }, 1000);
});

function updateTimerDisplay(milliseconds) {
  const timeObj = calculateTime(milliseconds);

  days.textContent = addLeadingZero(timeObj.days);
  hours.textContent = addLeadingZero(timeObj.hours);
  minutes.textContent = addLeadingZero(timeObj.minutes);
  seconds.textContent = addLeadingZero(timeObj.seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function calculateTime(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
