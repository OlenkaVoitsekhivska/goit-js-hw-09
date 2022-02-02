
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

    const startBtnRef = document.querySelector('[data-start]');
    const stopBtnRef = document.querySelector('[data-stop]');
    const bodyRef = document.querySelector('body');
    let intervalId = null;

    startBtnRef.addEventListener('click', changeColor);
    stopBtnRef.addEventListener('click',stopChangeColor);

    function changeColor(){
      intervalId = setInterval(()=>{
        bodyRef.style.background = getRandomHexColor()
        },1000)
    }
    function stopChangeColor(){
        clearInterval(intervalId);
    }