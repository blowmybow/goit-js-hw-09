import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};
let timerId = null;

refs.buttonStart.addEventListener('click', onStartButton);
refs.buttonStop.addEventListener('click', onStopButton);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
function onStartButton() {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.buttonStart.disabled = true;
  refs.buttonStop.disabled = false;
}
function onStopButton() {
  Report.info(
    'Dear Friend',
    'The color switcher is stopped, shall we continue?',
    'Okay'
  );
  clearInterval(timerId);
  refs.buttonStop.disabled = true;
  refs.buttonStart.disabled = false;
}
