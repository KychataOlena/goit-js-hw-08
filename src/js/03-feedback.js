import throttle from 'lodash.throttle';
const formRef = document.querySelector('.feedback-form');
const LOCALE_STORAGE_KEY = 'feedback-form-state';
// console.log(formRef);
const formData = {};
initPage();

const onFormInpunt = event => {
  const { name, value } = event.target;
  try {
    let saveData = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saveData) {
      saveData = JSON.parse(saveData);
    } else {
      saveData = {};
    }

    saveData[name] = value;
    const stringifyData = JSON.stringify(saveData);
    localStorage.setItem(LOCALE_STORAGE_KEY, stringifyData);
  } catch (error) {
    console.log(error);
  }
};

const throttledOnFormInput = throttle(onFormInpunt, 500);
formRef.addEventListener('input', onFormInpunt);

function initPage() {
  const saveData = localStorage.getItem(LOCALE_STORAGE_KEY);

  if (saveData) {
    try {
      const parseData = JSON.parse(saveData);
      Object.entries(parseData).forEach(([name, value]) => {
        formRef.elements[name].value = value;
      });
      // console.log(parseData);
    } catch (error) {
      console.error(error);
    }
  }
}

const handleSabmit = event => {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  // console.log(email);
  // console.log(message);

    event.currentTarget.reset();
    localStorage.removeItem(LOCALE_STORAGE_KEY);
};
formRef.addEventListener('submit', handleSabmit);
