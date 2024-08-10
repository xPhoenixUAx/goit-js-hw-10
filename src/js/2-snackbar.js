import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// отримуємо доступ до форми і вішаємо на неї обробник події
const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

// функція обробки сабміту форми.
function handleSubmit(event) {
  event.preventDefault();

  // Отримуємо значення затримки з інпуту

  const delay = event.currentTarget.querySelector('input[name="delay"]').value;
  const stateRadio = event.currentTarget.querySelector(
    'input[name="state"]:checked'
  );
  // Отримуємо вибране значення стану радіо-кнопки (fulfilled або rejected)
  const state = stateRadio ? stateRadio.value : null;

  // Створення промісу з затримкою
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  // Обробка промісу
  promise
    .then(delay => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: 'rgba(89, 161, 13, 1)',
        progressBarColor: 'rgba(50, 97, 1, 1)',
        theme: 'dark',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: 'rgba(239, 64, 64, 1)',
        progressBarColor: 'rgba(181, 27, 27, 1)',
        theme: 'dark',
      });
    });
}
