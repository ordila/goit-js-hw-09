import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  picker: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('[data-start]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateDiff = selectedDates[0] - Date.now();

    if (dateDiff < 0) {
      window.alert('Please choose a date in the future');
      refs.buttonStart.disabled = true;

      return;
    }
    refs.buttonStart.disabled = false;
    refs.buttonStart.addEventListener('click', () => {
      timer.deadline = selectedDates[0];
      timer.start();
    });
  },
};
flatpickr(refs.picker, options);

const timer = {
  deadline: null,
  intervalId: null,
  refs: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },
  start() {
    this.intervalId = setInterval(() => {
      const diff = this.deadline - Date.now();
      if (diff <= 0) {
        this.stop();
        return;
      }
      const { days, hours, minutes, seconds } = this.convertMs(diff);
      this.refs.days.textContent = days.toString().padStart(2, '0');
      this.refs.hours.textContent = hours.toString().padStart(2, '0');
      this.refs.minutes.textContent = minutes.toString().padStart(2, '0');
      this.refs.seconds.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
  },
  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },
};
