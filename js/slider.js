const effectsWrapper = document.querySelector('.img-upload__wrapper');
const slider = effectsWrapper.querySelector('.effect-level__slider');
const effectLevel = effectsWrapper.querySelector('.img-upload__effect-level');
const imagePreview = effectsWrapper.querySelector('.img-upload__preview');
const effectValue = effectsWrapper.querySelector('.effect-level__value');


noUiSlider.create(slider, {
  range: {
    'min': 0,
    'max': 1
  },
  start: 1,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value)
      ? value.toFixed(0)
      : value.toFixed(1),
    from: (value) => parseFloat(value),
  }
});

slider.noUiSlider.on('update', () => {
  effectValue.value = slider.noUiSlider.get();
});

effectLevel.classList.add('hidden');

const effectChange = (evt) => {
  const effect = evt.target.value;

  if (effect === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }

  switch (effect) {
    case ('none'):
      imagePreview.style.filter = 'none';
      break;

    case ('chrome'):
      slider.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 1
        },
        start: 1,
        step: 0.1
      });
      slider.noUiSlider.on('update', () => {
        imagePreview.style.filter = `grayscale(${effectValue.value})`;
      });
      break;

    case ('sepia'):
      slider.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 1
        },
        start: 1,
        step: 0.1
      });
      slider.noUiSlider.on('update', () => {
        imagePreview.style.filter = `sepia(${effectValue.value})`;
      });
      break;

    case ('marvin'):
      slider.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 100
        },
        start: 100,
        step: 1
      });
      slider.noUiSlider.on('update', () => {
        imagePreview.style.filter = `invert(${effectValue.value}%)`;
      });
      break;

    case ('phobos'):
      slider.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 3
        },
        start: 3,
        step: 0.1
      });
      slider.noUiSlider.on('update', () => {
        imagePreview.style.filter = `blur(${effectValue.value}px)`;
      });
      break;

    case ('heat'):
      slider.noUiSlider.updateOptions({
        range: {
          'min': 1,
          'max': 3
        },
        start: 3,
        step: 0.1
      });
      slider.noUiSlider.on('update', () => {
        imagePreview.style.filter = `brightness(${effectValue.value})`;
      });
      break;
  }

};

export { effectChange };
