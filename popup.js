function openModalReview({ modalName, appId }) {
  const overlay = document.querySelector(`[data-${modalName}]`);
  const reviewForm = overlay.querySelector('form');
  const reviewModal = overlay.querySelector('.modal__review');
  const successModal = overlay.querySelector('.modal__review--success');
  const errorModal = overlay.querySelector('.modal__review--error');
  const formSubmitBtn = reviewForm.querySelector('button');
  const overlayClose = overlay.querySelector('#close');

  const modalReviewForm = document.querySelector('#modalReviewForm');
  const reviewMModalRating = document.querySelectorAll(
    'input[name="reviewStars"]'
  );

  function defaultStateReview() {
    overlay.classList.add('close');
    reviewModal.classList.remove('dnone');
    successModal.classList.add('dnone');
    errorModal.classList.add('dnone');
    modalReviewForm.reset();
    formSubmitBtn.textContent = 'Отправить';
    reviewForm.removeEventListener('submit', reviewFormSubmit);
    overlayClose.removeEventListener('click', defaultStateReview);
  }

  overlayClose.addEventListener('click', defaultStateReview);

  overlay.classList.remove('close');

  reviewMModalRating.forEach((star) => {
    star.addEventListener('click', () => {
      formSubmitBtn.disabled = false;
    });
  });

  reviewForm.addEventListener('submit', reviewFormSubmit);

  function reviewFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(modalReviewForm);

    formSubmitBtn.innerHTML = '<div class="pie"></div>';
    formSubmitBtn.disabled = true;

    fetch(`${api}/api/AppStore/reviewsSend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_id: appId,
        rating: formData.get('reviewStars'),
        comment: formData.get('modalReviewTextarea'),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          reviewModal.classList.add('dnone');
          successModal.classList.remove('dnone');

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
          errorModal.querySelector(
            '.modal__review--success__text'
          ).textContent = data.err;
          console.error('Error:', data);
        }
      })
      .catch((error) => console.log('Error:', error));
  }
}

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

  installForm.addEventListener('reset', defaultStateInstallModal);
  modalCloseBtn.addEventListener('click', defaultStateInstallModal);

  installForm.addEventListener('submit', installFormSubmit);

  function installFormSubmit() {
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
  }

  function defaultStateInstallModal() {
    modalCloseBtn.disabled = false;
    modal.classList.add('close');
    modalReview.classList.remove('dnone');
    installForm.classList.remove('dnone');
    installProgress.classList.add('dnone');
    modalError.classList.add('dnone');
    modalSuccess.classList.add('dnone');
    installForm.removeEventListener('submit', installFormSubmit);
  }

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
