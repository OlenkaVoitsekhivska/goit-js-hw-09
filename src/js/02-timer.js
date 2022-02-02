import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';


const dayRef = document.querySelector('[data-days]');
const hourRef = document.querySelector('[data-hours]');
const minRef = document.querySelector('[data-minutes]');
const secRef = document.querySelector('[data-seconds]');
const btn = document.querySelector('[data-start]');
btn.setAttribute('disabled', 'disabled');

Notiflix.Notify.info('Pick a date');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {   
    if(selectedDates[0]-options.defaultDate>0){
        const THE_DATE = selectedDates[0];
        btn.removeAttribute('disabled'); 
        btn.addEventListener('click', ()=>{
          Notiflix.Notify.success('Date successfully selected.Commencing the countdown');
          setInterval(()=>{
            const diff = THE_DATE.getTime()-Date.now();
              if(diff>=0){
                const {days, hours, minutes, seconds } = convertMs(diff);
                dayRef.textContent = days, hourRef.textContent = hours, minRef.textContent = minutes, secRef.textContent = seconds;
              } return;
            },1000)
          }
          )}    
    else{
      Notiflix.Notify.failure("Please choose a date in the future");
    } 
    },
  };


  const timeInput = document.querySelector('#datetime-picker');
  
  const timePicker = flatpickr(timeInput, options);




  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };

  }


  function addLeadingZero (value){
   return value.toString().padStart(2, 0);
  }



