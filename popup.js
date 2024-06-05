const popup = document.getElementById('popup');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const openPopupButton = document.getElementById('openPopupButton');
const nextStepButton1 = document.getElementById('nextStepButton1');
const closeButton = document.getElementById('closeButton');

// Открыть всплывающее окно
openPopupButton.addEventListener('click', () => {
  popup.classList.add('active');
  step1.classList.add('active');
});

// Переход к следующему шагу
nextStepButton1.addEventListener('click', () => {
  step1.classList.remove('active');
  step2.classList.add('active');
});

// Закрыть всплывающее окно
closeButton.addEventListener('click', () => {
  popup.classList.remove('active');
  step1.classList.add('active');
  step2.classList.remove('active');
});
