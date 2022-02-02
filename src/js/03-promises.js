import Notiflix from 'notiflix';


const KEY = 'sup';
const formData = {};
const formRef = document.querySelector('form');
const submitBtnRef = document.querySelector('button');


localStorage.clear();


function listenInput(evt){
  formData[evt.target.name] = evt.target.value;
  const stringifiedData = JSON.stringify(formData);
  localStorage.setItem(KEY, stringifiedData);
}



formRef.addEventListener('input', listenInput);



formRef.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  let {delay, step, amount : position} = JSON.parse(localStorage.getItem(KEY));
  delay = Number(delay);
  step = Number(step);
  position = Number(position);

 for(let i=1; i<=position; i++){

  setTimeout(()=>{

      createPromise(i, delay)
      .then(({position,delay}) => { 
      Notiflix. Notify.success(`✅ Fulfilled promise ${position } in ${delay} ms`);
      })
      .catch(({position, delay}) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);    
      });
  
      delay+=step;
      }, step);

  }
}
)




function createPromise(position, delay) {
  return new Promise((resolve,reject)=>{
    const shouldResolve = Math.random() > 0.3;
    setTimeout(()=>{
        if (shouldResolve) {
          resolve ({position,delay});
        }else {
          reject ({position,delay});
        }

      },delay)
    })
}