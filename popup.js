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
const installBtn = document.querySelector(
  '[data-buttonmodalname="installmodal"]'
);
const openModalBtns = document.querySelectorAll('[data-buttonmodalname]');
const closeModalBtns = document.querySelectorAll('[data-closemodalname]');

// overlay.addEventListener('click', (e) => {
//   if (e.target === overlay) {
//     overlay.classList.add('close');
//   }
// });

// close.addEventListener('click', closeRatingModal);

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

openModalBtns.forEach((btn) => {
  btn.addEventListener('click', openModalForData);
});

closeModalBtns.forEach((close) => {
  close.addEventListener('click', () => closeModalForData(close));
});

installBtn.addEventListener('click', () => {
  const modalName = installBtn.getAttribute('data-buttonmodalname');
  const modalReview = document.querySelector(
    `[data-${modalName}] .modal__review`
  );
  const modalSuccess = document.querySelector(
    `[data-${modalName}] .modal__review--success`
  );
  const modalError = document.querySelector(
    `[data-${modalName}] .modal__review--error`
  );

  fetch(`${api}/api/UserProjects/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: productData.type,
      name: productData.title,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      let progressbar = document.querySelector('.install__progress--fill');
      let progressbarPercentage = document.querySelector(
        '.progress--percentage .percentage'
      );
      let progressbarText = document.querySelector('.progress--text');

      function checkStatusBar(id) {
        fetch(`${api}/api/UserProjects/getStatus`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        })
          .then((response) => response.json())
          .then((statusData) => {
            progressbar.style.width =
              (statusData.status >= 0 ? statusData.status : 0) + '%';
            progressbarPercentage.textContent = statusData.status + '%';
            progressbarText.textContent = statusData.text;

            if (statusData.status == 100 || statusData.status < 0) {
              setTimeout(() => {
                if (statusData.status == 100) {
                  modalReview.classList.add('dnone');
                  progressbar.style.width = '0%';
                  progressbarPercentage.textContent = '0%';
                  progressbarText.textContent = 'В очереди';

                  modalSuccess.classList.remove('dnone');
                }
                if (statusData.status == 0) {
                  modalReview.classList.add('dnone');
                  progressbar.style.width = '0%';
                  progressbarPercentage.textContent = '0%';
                  progressbarText.textContent = 'В очереди';

                  modalError.classList.remove('dnone');
                }
              }, 500);
            } else {
              setTimeout(() => checkStatusBar(id), 1000);
            }
          })
          .catch(() => {
            modalReview.classList.add('dnone');
            modalError.classList.remove('dnone');
          });
      }
      checkStatusBar(data.id);
    });
});

function openModalForData(e) {
  const modalName = e.target.getAttribute('data-buttonmodalname');
  document.querySelector(`[data-${modalName}]`).classList.remove('close');
}
function closeModalForData(closeBtn) {
  const modalName = closeBtn.getAttribute('data-closemodalname');
  document.querySelector(`[data-${modalName}]`).classList.add('close');
  const modalReview = document.querySelector(
    `[data-${modalName}] .modal__review`
  );
  const modalSuccess = document.querySelector(
    `[data-${modalName}] .modal__review--success`
  );
  const modalError = document.querySelector(
    `[data-${modalName}] .modal__review--error`
  );

  modalReview.classList.remove('dnone');
  modalSuccess.classList.add('dnone');
  modalError.classList.add('dnone');
}

reviewMModalRating.forEach((star) => {
  star.addEventListener('click', () => {
    reviewSendBtn.disabled = false;
  });
});

const api = 'https://gexarus.com';

modalReviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(modalReviewForm);

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

        const reviewMessage = document.querySelector('.review__messages');
        const reviewCardStarRating = document.querySelector(
          '.review__card .star__rating'
        );
        const productSummaryRating = document.querySelector(
          '.review__card--block h1'
        );
        setMessage(data.review, reviewMessage, data.average);
        productSummaryRating.textContent = data.average;
        setMessageAvrageRating(
          setMessageRating(data.average),
          reviewCardStarRating
        );
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
