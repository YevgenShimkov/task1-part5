import * as moment from 'moment';

/**
 * make up the page 
 */
const body = document.body;
const container = document.createElement('container'),
  title = document.createElement('h1'),
  info_title = document.createElement('h2'),
  nav_wrapper = document.createElement('nav_wrapper'),
  less_btn = document.createElement('button'),
  more_btn = document.createElement('button'),
  input_field = document.createElement('input'),
  timer_field = document.createElement('div'),
  start_btn = document.createElement('button');

container.classList.add('container');
title.textContent = 'Timer';
info_title.classList.add('info_title');
info_title.textContent = 'Set time in minutes';
input_field.classList.add('input_field');
input_field.setAttribute('type', 'text');
input_field.setAttribute('value', '0');
timer_field.style.display = 'none';
nav_wrapper.classList.add('nav_wrapper');
less_btn.classList.add('btn');
less_btn.textContent = '-';
more_btn.classList.add('btn');
more_btn.textContent = '+';
start_btn.classList.add('btn', 'start_btn');
start_btn.textContent = 'Start';

body.insertAdjacentElement("afterbegin", container);
container.insertAdjacentElement('beforeend', title);
container.insertAdjacentElement('beforeend', info_title);
container.insertAdjacentElement('beforeend', timer_field);
container.insertAdjacentElement('beforeend', nav_wrapper);
nav_wrapper.insertAdjacentElement('beforeend', less_btn);
nav_wrapper.insertAdjacentElement('beforeend', input_field);
nav_wrapper.insertAdjacentElement('beforeend', more_btn);
container.insertAdjacentElement('beforeend', start_btn);

/**
 * add EventListener for all button
 */
 let buttons = document.querySelectorAll('.btn');
 buttons.forEach(function (button) {
     button.addEventListener('click', choiseAction);
 });
 
 function choiseAction(e: any) {
     let currentButton: any = e.currentTarget;
     let inputField:any = document.querySelector('.input_field');
     let currentRate: number = parseInt(inputField.value);
     if (checkInput(inputField, currentRate)) {
         switch (true) {
             case (currentButton.textContent === '-'):
                 changeSetTime('-', inputField, currentRate);
                 break;
             case (currentButton.textContent === '+'):
                 changeSetTime('+', inputField, currentRate);
                 break;
             case (currentButton.textContent === 'Start'):
                 runTimer(inputField, currentRate);
                 break;
         }
     }
 }

/**
 * set the time according to the pressed buttons
 * @param button what button was click
 */
function changeSetTime(button: string, inputField: any, currentRate: number) {
  if (button === '-' && currentRate > 0) {
    currentRate = --currentRate;
  } else if (button === '+') {
    currentRate = ++currentRate;
  }
  inputField.value = currentRate;
}

/**
 * chekc input value
 * @param {*} inputField 
 * @param {*} currentRate 
 * @returns  result check
 */
function checkInput(inputField: any, currentRate: number) {
  if (isNaN(currentRate) || inputField.value.length > (currentRate + "").length || currentRate < 0) { // check if input value not number
    inputField.value = 0;
    alert('Enter correctly time')
    return false
  }
  return true
}

function runTimer(inputField:any, currentRate: number) {
info_title.textContent = 'Minutes left';
inputField.style.display = 'none';
nav_wrapper.style.display = 'none';
start_btn.style.display = 'none';
timer_field.style.display = 'block';

  let setTime = moment(currentRate, 'm');
  timer_field.innerHTML = setTime.format('m:ss');
  const timer = setInterval(() => {
    const subtraction = setTime.subtract(1, 'seconds');
    setTime = subtraction;
    timer_field.innerHTML = subtraction.format('m:ss');
    if (timer_field.textContent === '0:00') {
      clearInterval(timer);
    }
  }, 1000);
}
