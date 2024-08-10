import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Отримуємо посилання на елементи DOM
const dateInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

// Спочатку кнопка "Start" вимкнена
startButton.disabled = true;
let userSelectedDate = null;
let countdownInterval = null;

// Параметри для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // Колбек, що викликається при закритті календаря
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    // Якщо вибрана дата в минулому, показуємо повідомлення про помилку
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};
// ініціалізація flatpickr

flatpickr(dateInput, options);

startButton.addEventListener('click', onClick);

// Колбек для обробки події натискання на кнопку "Start"

function onClick() {
  if (userSelectedDate) {
    startCountdown(userSelectedDate);
    startButton.disabled = true;
    dateInput.disabled = true;
  }
}
// Функція для запуску зворотного відліку

function startCountdown(endDate) {
  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance < 0) {
      clearInterval(countdownInterval);
      dateInput.disabled = false;
      startButton.disabled = true;
      return;
    }

    const convertedTime = convertMs(distance);
    updateTimerDisplay(convertedTime);
  }, 1000);
}

// Функція для конвертації мілісекунд

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція для додавання нулів до числа, якщо воно менше 10
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Функція для оновлення відображення таймера
function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

// Налаштування додаткових стилів для повідомлень iziToast
iziToast.settings({
  class: 'izi-toast',
  position: 'topRight',
  backgroundColor: 'rgba(239, 64, 64, 1)',
  progressBarColor: 'rgba(181, 27, 27, 1)',
  theme: 'dark',
});
