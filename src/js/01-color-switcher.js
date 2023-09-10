const refs = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
};
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let timerId = null;

refs.buttonStart.addEventListener('click', onButtonStartClick);
function onButtonStartClick() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.buttonStart.disabled = true;
}
refs.buttonStop.addEventListener('click', onButtonStopClick);
function onButtonStopClick() {
  clearInterval(timerId);
  refs.buttonStart.disabled = false;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
