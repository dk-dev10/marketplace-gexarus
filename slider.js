function CreateSliderWrapper(files, parent, dotsParent) {
  const sliderWrapper = document.createElement('div');
  sliderWrapper.classList.add('slider__wrapper');

  files.forEach((file) => {
    const sliderWrapperItem = document.createElement('div');
    sliderWrapperItem.classList.add('slider__wrapper--item');
    let productImg;
    let productVideo;
    switch (file.type) {
      case 'img':
        productImg = document.createElement('img');
        productImg.setAttribute('src', file.medium);
        sliderWrapperItem.appendChild(productImg);
        break;

      case 'video':
        productVideo = document.createElement('video');
        productVideo.setAttribute('src', file.url);
        productVideo.setAttribute('controls', true);
        sliderWrapperItem.appendChild(productVideo);
    }

    sliderWrapper.appendChild(sliderWrapperItem);
  });

  parent.appendChild(sliderWrapper);

  if (files.length > 1) {
    CreateDots(files.length, sliderWrapper, dotsParent);
  }
}

function CreateDots(count, slider, parent) {
  const dots = [];

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.dataset.slide = i;
    dot.addEventListener('click', (e) => {
      e.preventDefault()
      slider.scrollLeft = i * slider.clientWidth;
      UpdateActiveDot(i, dots);
    });
    dots.push(dot);
    parent.appendChild(dot);
  }

  slider.addEventListener('scroll', () => {
    const activeIndex = Math.round(slider.scrollLeft / slider.clientWidth);
    UpdateActiveDot(activeIndex, dots);
  });

  UpdateActiveDot(0, dots);
}

function UpdateActiveDot(index, dots) {
  dots.forEach((dot) => dot.classList.remove('active'));
  dots[index].classList.add('active');
}
