import { isEscapeKey } from './util';
import { addScale, removeScale } from './img-scale';
import { effectChange } from './slider';

const body = document.querySelector('body');
const formUploadImage = document.querySelector('.img-upload__form');
const inputUploadImage = formUploadImage.querySelector('.img-upload__input');
const formModal = formUploadImage.querySelector('.img-upload__overlay');
const formResetButton = formUploadImage.querySelector('.img-upload__cancel');
const hashtagInput = formUploadImage.querySelector('.text__hashtags');
const commentInput = formUploadImage.querySelector('.text__description');
const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;
const effectList = formUploadImage.querySelector('.effects__list');
const effectLevel = formUploadImage.querySelector('.img-upload__effect-level');
const imagePreview = formUploadImage.querySelector('.img-upload__preview');


const onFormKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      formUploadImage.reset();
      closeUploadModal();
    }
  }
};

const onCloseFormByClick = (evt) => {
  evt.preventDefault();
  closeUploadModal();
};

function closeUploadModal() {
  formModal.classList.add('hidden');
  body.classList.remove('modal-open');
  formResetButton.removeEventListener('click', onCloseFormByClick);
  document.removeEventListener('keydown', onFormKeyDown);
  inputUploadImage.value = '';
  removeScale();
  imagePreview.style.filter = 'none';
  effectLevel.classList.add = 'hidden';
}


const openUploadModal = () => {
  inputUploadImage.addEventListener('change', () => {
    formModal.classList.remove('hidden');
    body.classList.add('modal-open');
    addScale();
    effectList.addEventListener('click', effectChange);
    formResetButton.addEventListener('click', onCloseFormByClick);
    document.addEventListener('keydown', onFormKeyDown);
  });
};

const pristine = new Pristine(formUploadImage, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});


pristine.addValidator(commentInput, (value) => {
  const maxSymbolsComment = value.length <= 140;
  return maxSymbolsComment;
}, 'Не более 140 символов!');


let errorMessage = '';
const error = () => errorMessage;

const validateHashtag = (value) => {
  errorMessage = '';

  const inputHashtagsNormalise = value.toLowerCase().trim();
  const inputHashtagsText = inputHashtagsNormalise.split(/\s+/);

  if (inputHashtagsNormalise.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputHashtagsText.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с \'#\'.',
    },
    {
      check: inputHashtagsText.some((item) => item === '#'),
      error: 'Хештег должен содержать текстовые символы после \'#\' (решетки)',
    },
    {
      check: inputHashtagsText.some((item) => item.length > MAX_SYMBOLS),
      error: `Хештег может состоять из ${MAX_SYMBOLS} символов, включая решетку`,
    },
    {
      check: inputHashtagsText.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги должны разделяться пробелом',
    },
    {
      check: inputHashtagsText.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хештег должен состоять только букв и чисел',
    },
    {
      check: inputHashtagsText.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны быть одинаковыми'
    },
    {
      check: inputHashtagsText.length > MAX_HASHTAGS,
      error: `Максимальное количество хештегов - не более ${MAX_HASHTAGS}`,
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;

    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });

};

pristine.addValidator(hashtagInput, validateHashtag, error);

formUploadImage.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    formUploadImage.submit();
  }
});

export { openUploadModal };
export { pristine };
