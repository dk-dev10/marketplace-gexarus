const overlay = document.querySelector('.overlay');
const open = document.querySelector('#open');
const close = document.querySelector('#close');

const reviewSendBtn = document.querySelector('.modal__review--send');
const modalReviewForm = document.querySelector('#modalReviewForm');
const openReviewRatingModal = document.querySelector('#openReviewRatingModal');
const reviewModal = document.querySelector('.modal__review');
const successModal = document.querySelector('.modal__review--success');
const reviewMModalRating = document.querySelectorAll(
  'input[name="reviewStars"]'
);

// overlay.addEventListener('click', (e) => {
//   if (e.target === overlay) {
//     overlay.classList.add('close');
//   }
// });

close.addEventListener('click', closeRatingModal);

function closeRatingModal() {
  overlay.classList.add('close');
  successModal.classList.add('dnone');
  reviewModal.classList.remove('dnone');
  resetRatingModal();
}

function resetRatingModal() {
  modalReviewForm.reset();
  reviewSendBtn.textContent = 'Отправить';
  reviewSendBtn.disabled = true;
}

// open.addEventListener('click', () => {
//   overlay.classList.remove('close');
// });

openReviewRatingModal.addEventListener('click', (e) => {
  const modalName = e.target.getAttribute('data-buttonmodalname');
  document.querySelector(`[data-${modalName}]`).classList.remove('close');
});

reviewMModalRating.forEach((star) => {
  star.addEventListener('click', () => {
    reviewSendBtn.disabled = false;
  });
});

modalReviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(modalReviewForm);

  console.log(formData);

  reviewSendBtn.innerHTML = '<div class="pie"></div>';
  reviewSendBtn.disabled = true;

  setTimeout(() => {
    reviewModal.classList.add('dnone');
    successModal.classList.remove('dnone');
  }, 1500);
});
