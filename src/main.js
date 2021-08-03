"use strict";
exports.__esModule = true;
var moment = require("moment");
/**
 * make up the page
 */
var body = document.body;
var container = document.createElement('container'), title = document.createElement('h1'), info_title = document.createElement('h2'), nav_wrapper = document.createElement('nav_wrapper'), less_btn = document.createElement('button'), more_btn = document.createElement('button'), input_field = document.createElement('input'), start_btn = document.createElement('button');
container.classList.add('container');
title.textContent = 'Timer';
info_title.classList.add('info_title');
info_title.textContent = 'Set time in minutes';
input_field.classList.add('input_field');
input_field.setAttribute('type', 'text');
input_field.setAttribute('value', '0');
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
container.insertAdjacentElement('beforeend', nav_wrapper);
nav_wrapper.insertAdjacentElement('beforeend', less_btn);
nav_wrapper.insertAdjacentElement('beforeend', input_field);
nav_wrapper.insertAdjacentElement('beforeend', more_btn);
container.insertAdjacentElement('beforeend', start_btn);
/**
 * add EventListener for all button
 */
var buttons = document.querySelectorAll('.btn');
buttons.forEach(function (button) {
    button.addEventListener('click', choiseAction);
});
function choiseAction(e) {
    var currentButton = e.currentTarget;
    var inputField = document.querySelector('.input_field');
    var currentRate = parseInt(inputField.value);
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
function changeSetTime(button, inputField, currentRate) {
    if (button === '-' && currentRate > 0) {
        currentRate = --currentRate;
    }
    else if (button === '+') {
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
function checkInput(inputField, currentRate) {
    if (isNaN(currentRate) || inputField.value.length > (currentRate + "").length || currentRate < 0) { // check if input value not number
        inputField.value = 0;
        alert('Enter correctly time');
        return false;
    }
    return true;
}
function runTimer(inputField, currentRate) {
    info_title.textContent = 'minits left';
    var setTime = moment(currentRate, 'm');
    inputField.innerHTML = setTime.format('m:ss');
    var timer = setInterval(function () {
        var subtraction = setTime.subtract(1, 'seconds');
        setTime = subtraction;
        inputField.innerHTML = subtraction.format('m:ss');
        if (inputField.textContent === '0:00') {
            clearInterval(timer);
        }
    }, 1000);
}
