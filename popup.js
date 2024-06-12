const overlay = document.querySelectorAll('.overlay');

const reviewSendBtn = document.querySelector('.modal__review--send');
const modalReviewForm = document.querySelector('#modalReviewForm');
const reviewModal = document.querySelector('.modal__review');
const successModal = document.querySelector('.modal__review--success');
const errorModal = document.querySelector('.modal__review--error');
const reviewMModalRating = document.querySelectorAll(
  'input[name="reviewStars"]'
);
const formInstall = document?.querySelector('.modal__review--form');

const formInput = formInstall?.querySelector('input');

document.addEventListener('DOMContentLoaded', () => {
  // const checkDataInterval = setInterval(() => {
  //   if (Object.keys(productData).length !== 0) {
  //     clearInterval(checkDataInterval);
  //     formInput.value = productData.title;
  //   }
  // }, 100);
});

const openModalBtns = document.querySelectorAll('[data-buttonmodalname]');
const closeModalBtns = document.querySelectorAll('[data-closemodalname]');

// overlay.addEventListener('click', (e) => {
//   if (e.target === overlay) {
//     overlay.classList.add('close');
//   }
// });

// close.addEventListener('click', closeRatingModal);

function closeRatingModal() {
  overlay.forEach((item) => item.classList.add('close'));
  successModal.classList.add('dnone');
  errorModal.classList.add('dnone');
  reviewModal.classList.remove('dnone');
  resetRatingModal();
}

function resetRatingModal() {
  formInput.value = productData.title;
  modalReviewForm.reset();
  reviewSendBtn.textContent = 'Отправить';
  reviewSendBtn.disabled = true;
}

// open.addEventListener('click', () => {
//   overlay.classList.remove('close');
// });

openModalBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    openModalForData();
  });
});

closeModalBtns.forEach((close) => {
  // close.addEventListener('click', () => {
  //   resetRatingModal();
  //   closeModalForData(close);
  // });
});

function getElementsForDataAttribute(modalName) {
  const modal = document.querySelector(`[data-${modalName}]`);
  const modalCloseBtn = document.querySelector(`[data-${modalName}] #close`);
  const modalReview = document.querySelector(
    `[data-${modalName}] .modal__review`
  );
  const modalSuccess = document.querySelector(
    `[data-${modalName}] .modal__review--success`
  );
  const modalError = document.querySelector(
    `[data-${modalName}] .modal__review--error`
  );

  return { modalReview, modalSuccess, modalError, modal, modalCloseBtn };
}

formInstall?.addEventListener('submit', (e) => {
  e.preventDefault();
  const { modalReview, modalSuccess, modalError } =
    getElementsForDataAttribute('installmodal');

  formInstall.classList.add('dnone');
  modalReview.querySelector('.install__progress').classList.remove('dnone');
});

function openModalForData(e) {
  // const modalName = e.target.getAttribute('data-buttonmodalname');
  // document.querySelector(`[data-${modalName}]`).classList.remove('close');
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

// modalReviewForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const formData = new FormData(modalReviewForm);

//   reviewSendBtn.innerHTML = '<div class="pie"></div>';
//   reviewSendBtn.disabled = true;

//   fetch(`${api}/api/AppStore/reviewsSend`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       app_id: 14,
//       rating: formData.get('reviewStars'),
//       comment: formData.get('modalReviewTextarea'),
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.success) {
//         reviewModal.classList.add('dnone');
//         successModal.classList.remove('dnone');
//         setTimeout(() => {
//           closeRatingModal();
//         }, 3000);

//         const reviewMessage = document.querySelector('.review__messages');
//         const reviewCardStarRating = document.querySelector(
//           '.review__card .star__rating'
//         );
//         const productSummaryRating = document.querySelector(
//           '.review__card--block h1'
//         );
//         setMessage(data.review, reviewMessage, data.average);
//         productSummaryRating.textContent = data.average;
//         setMessageAvrageRating(
//           setMessageRating(data.average),
//           reviewCardStarRating
//         );
//       } else {
//         reviewModal.classList.add('dnone');
//         errorModal.classList.remove('dnone');
//         errorModal.querySelector('.modal__review--success__text').textContent =
//           data.err;
//         console.error('Error:', data);
//       }
//     })
//     .catch((error) => console.log('Error:', error));
// });

function openModalInstall({ data, modalName }) {
  const { modal, modalCloseBtn, modalReview, modalSuccess, modalError } =
    getElementsForDataAttribute(modalName);

  const installForm = modal.querySelector(`form`);
  const installFormInput = modal.querySelector(`form input`);
  installFormInput.value = data.title;

  const installProgress = document.querySelector('.install__progress');
  const progressbar = document.querySelector('.install__progress--fill');
  let progressbarPercentage = document.querySelector(
    '.progress--percentage .percentage'
  );
  let progressbarText = document.querySelector('.progress--text');

  function defaultStateInstallModal() {
    modalCloseBtn.disabled = false;
    modal.classList.add('close');
    modalReview.classList.remove('dnone');
    installForm.classList.remove('dnone');
    installProgress.classList.add('dnone');
    modalError.classList.add('dnone');
    modalSuccess.classList.add('dnone');
  }

  installForm.addEventListener('reset', defaultStateInstallModal);
  modalCloseBtn.addEventListener('click', defaultStateInstallModal);

  installForm.addEventListener('submit', () => {
    console.log('void')
    installProgress.classList.remove('dnone');
    installForm.classList.add('dnone');

    modalCloseBtn.disabled = true;

    installFetch({
      appName: installFormInput.value,
      appType: data.type,
      modalReview,
      modalSuccess,
      modalError,
      progressbar,
      progressbarPercentage,
      progressbarText,
      modalCloseBtn,
    });
  });

  modal.classList.remove('close');
}

function installFetch(args) {
  const {
    appName,
    appType,
    modalReview,
    modalSuccess,
    modalError,
    progressbar,
    progressbarPercentage,
    progressbarText,
    modalCloseBtn,
  } = args;

  function finallyInstall() {
    modalCloseBtn.disabled = false;
    modalReview.classList.add('dnone');
    progressbar.style.width = '0%';
    progressbarPercentage.textContent = '0%';
    progressbarText.textContent = 'В очереди';
  }

  fetchCreateApp({ type: appType, name: appName })
    .then((response) => response.json())
    .then((data) => {
      function checkStatusBar(id) {
        fetchCreateAppStatus(id)
          .then((response) => response.json())
          .then((statusData) => {
            progressbar.style.width =
              (statusData.status >= 0 ? statusData.status : 0) + '%';
            progressbarPercentage.textContent = statusData.status + '%';
            progressbarText.textContent = statusData.text;

            if (statusData.status == 100 || statusData.status < 0) {
              setTimeout(() => {
                if (statusData.status == 100) {
                  finallyInstall();
                  modalSuccess.classList.remove('dnone');
                }
                if (statusData.status == 0) {
                  finallyInstall();
                  modalError.classList.remove('dnone');
                }
              }, 500);
            } else {
              if (!statusData.success) {
                throw new Error(statusData.err);
              }
              setTimeout(() => checkStatusBar(id), 1000);
            }
          })
          .catch(() => {
            finallyInstall();
            modalError.classList.remove('dnone');
          });
      }
      checkStatusBar(data.id);
    })
    .catch((error) => console.log('Error:', error));
}
