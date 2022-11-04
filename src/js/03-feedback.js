import throttle from 'lodash.throttle';
const formRef = document.querySelector('.feedback-form');
const LOCALE_STORAGE_KEY = 'feedback-form-state';
// console.log(formRef);
import {save, load, remove} from './storage'

initPage();

const onFormInpunt = event => {
  const { name, value } = event.target;
  
    let saveData = load(LOCALE_STORAGE_KEY);
    saveData = saveData ? saveData : {};
   
    saveData[name] = value;
   save(LOCALE_STORAGE_KEY, saveData);
 
};

const throttledOnFormInput = throttle(onFormInpunt, 500);
formRef.addEventListener('input', onFormInpunt);

function initPage() {
  const saveData = load(LOCALE_STORAGE_KEY);

  if (!saveData) {
    return;
  }
  Object.entries(saveData).forEach(([name, value]) => {
        formRef.elements[name].value = value;
      });
    
}

const handleSabmit = event => {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  console.log({ email: email.value, message: message.value });

    event.currentTarget.reset();
  remove(LOCALE_STORAGE_KEY);
  
};
formRef.addEventListener('submit', handleSabmit);
