import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
Report.info(
  '👋 Greetings my dear friend',
  'Please, choose a date and click on start',
  'Go'
);

const refs = {
  input: document.getElementById('datetime-picker'),
  timerStartButton: document.querySelector('.timer-btn'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
const TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;

refs.timerStartButton.addEventListener('click', onStartTimer);
refs.timerStartButton.disabled = true;

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Report.failure(
        ' Ooops..., something went wrong',
        'Please, choose a date in the future',
        'Okay'
      );
    } else {
      selectedDate = selectedDates[0].getTime();
      refs.timerStartButton.disabled = false;
    }
  },
};
flatpickr(refs.input, flatpickrOptions);

function onStartTimer() {
  counter.start();
}
const counter = {
  start() {
    intervalId = setInterval(() => {
      currentDate = Date.now();
      const deltaTime = selectedDate - currentDate;
      onUpdateTimer(convertMs(deltaTime));
      refs.timerStartButton.disabled = true;
      refs.input.disabled = false;

      if (deltaTime <= 1000) {
        this.stop();
      }
    }, TIMER_DELAY);
  },

  stop() {
    return clearInterval(intervalId);
  },
};
function pad(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}
function onUpdateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}
