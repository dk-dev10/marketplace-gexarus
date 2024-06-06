const overlay = document.querySelector('.overlay');
const open = document.querySelector('#open');
const close = document.querySelector('#close');

const reviewSendBtn = document.querySelector('.modal__review--send');
const modalReviewForm = document.querySelector('#modalReviewForm');
const openReviewRatingModal = document.querySelector('#openReviewRatingModal');
const reviewModal = document.querySelector('.modal__review');
const successModal = document.querySelector('.modal__review--success');
const errorModal = document.querySelector('.modal__review--error');
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
  errorModal.classList.add('dnone');
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

const api = 'https://gexarus.com';

modalReviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(modalReviewForm);

  console.log(formData);

  reviewSendBtn.innerHTML = '<div class="pie"></div>';
  reviewSendBtn.disabled = true;

  fetch(`${api}/api/AppStore/reviewsSend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_id: 14,
      rating: formData.get('reviewStars'),
      comment: formData.get('modalReviewTextarea'),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        reviewModal.classList.add('dnone');
        successModal.classList.remove('dnone');
        setTimeout(() => {
          closeRatingModal();
        }, 3000);
      } else {
        reviewModal.classList.add('dnone');
        errorModal.classList.remove('dnone');
        errorModal.querySelector('.modal__review--success__text').textContent =
          data.err;
        console.error('Error:', data);
      }
    })
    .catch((error) => console.log('Error:', error));
});
