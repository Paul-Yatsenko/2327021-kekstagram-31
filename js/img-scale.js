const STEP_SCALE = 0.25;

const formUploadImage = document.querySelector('.img-upload__form');
const imagePreview = formUploadImage.querySelector('.img-upload__preview');
const controlSmaller = formUploadImage.querySelector('.scale__control--smaller');
const controlBigger = formUploadImage.querySelector('.scale__control--bigger');
const controlValue = formUploadImage.querySelector('.scale__control--value');

let scale = 1;


const onSmallerButton = () => {
  if (scale > STEP_SCALE) {
    scale -= STEP_SCALE;
    imagePreview.style.transform = `scale(${scale})`;
    controlValue.value = `${scale * 100}%`;
  }
};

const onBiggerButton = () => {
  if (scale < 1) {
    scale += STEP_SCALE;
    imagePreview.style.transform = `scale(${scale})`;
    controlValue.value = `${scale * 100}%`;
  }
};

function addScale() {
  imagePreview.style.transform = 'scale(1)';
  controlValue.value = '100%';
  controlSmaller.addEventListener('click', onSmallerButton);
  controlBigger.addEventListener('click', onBiggerButton);
}

function removeScale() {
  controlSmaller.removeEventListener('click', onSmallerButton);
  controlBigger.removeEventListener('click', onSmallerButton);
}

export { addScale, removeScale };
