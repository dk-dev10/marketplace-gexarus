const overlay = document.querySelector('.overlay');
const open = document.querySelector('#open');
const close = document.querySelector('#close');

const reviewSendBtn = document.querySelector('.modal__review--send');
const modalReviewForm = document.querySelector('#modalReviewForm');
const reviewModal = document.querySelector('.modal__review');
const successModal = document.querySelector('.modal__review--success');

// overlay.addEventListener('click', (e) => {
//   if (e.target === overlay) {
//     overlay.classList.add('close');
//   }
// });

close.addEventListener('click', (e) => {
  overlay.classList.add('close');
});

open.addEventListener('click', (e) => {
  overlay.classList.remove('close');
});

// reviewSendBtn.addEventListener('click', (e) => {
//   console.log(
//     document.querySelector('input[name="reviewStars"]:checked').value
//   );
// });

modalReviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // const formData = new FormData(modalReviewForm);
  // const selectedValue = formData.get('reviewStars');
  // const selectedText = formData.get('modalReviewTextarea');

  reviewSendBtn.innerHTML = '<div class="pie"></div>';
  reviewSendBtn.disabled = true;

  setTimeout(() => {
    reviewModal.classList.add('dnone');
    successModal.classList.remove('dnone');
  }, 1500);
});
