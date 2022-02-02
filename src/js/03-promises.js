import Notiflix from 'notiflix';


const formRef = document.querySelector('form');
const delayInput = document.querySelector('[name = delay]');
const stepInput = document.querySelector('[name = step]');
const amountInput = document.querySelector('[name = amount]');


formRef.addEventListener('submit', (evt)=>{
  evt.preventDefault();

  let delay = Number(delayInput.value); 
  let step = Number(stepInput.value) ;
  let position = Number(amountInput.value); 

  for(let i=1; i<=position; i++){

    createPromise(i, delay)
      .then(({position,delay}) => { 
      Notiflix. Notify.success(`✅ Fulfilled promise ${position } in ${delay} ms`);
      })
      .catch(({position, delay}) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);    
      });
  
      delay+=step;
    
  }
})



function createPromise(position, delay) {
  return new Promise((resolve,reject)=>{

    const shouldResolve = Math.random() > 0.3;
    setTimeout(()=>{
      if (shouldResolve) {
        resolve ({position,delay});
      }else {
        reject ({position,delay});
      }

    }, delay)

  })
}