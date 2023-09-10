import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
  button: document.querySelector('.btn'),
};

refs.formEl.addEventListener('submit', onFormElSubmit);
function onFormElSubmit(event) {
  event.preventDefault();
  refs.button.disabled = true;
  let delay = +event.target.elements.delay.value;
  const delayStep = +event.target.elements.step.value;
  const amount = +event.target.elements.amount.value;

  for (let i = 1; i <= amount; i++) {
    createPromise({ i, delay })
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += delayStep;
  }
}

function createPromise({ position, delay }) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
