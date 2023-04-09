import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

Report.info(
  '👋 Greetings my dear friend',
  'You have a promise generator in front of you, lets use it',
  'Okay'
);
const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const object = { position, delay };
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(object);
      } else {
        reject(object);
      }
    }, delay);
  });
}
function onSubmitForm(e) {
  e.preventDefault();

  let delay = Number(formEl.delay.value);

  for (let i = 1; i <= formEl.amount.value; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += Number(formEl.step.value);
  }
}
