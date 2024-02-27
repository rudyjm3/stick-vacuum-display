/*When battery is at 100%: Min speed setting= 40mins run time before battery level is 0, Std speed setting= 20mins run time before battery level is 0, Max speed setting= 13mins run time before battery level is 0 || Possible speed to power used formula: 100% / 40 = 2.5mins for every 1% of battery power. 100 / 20 = 5mins for every 1% of battery power. 100 / 13 = 7.69mins for every 1% of battery power.
*/
const vacuum = {
   power: false,
   batteryLevel: 100,
   speedSelection: {
      min: 40,
      std: 20,
      max: 13
   },
   lastSpeedSelected: 'std',
};
const date = new Date();

// Get the current time
let hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

// Determine AM/PM
const ampm = hours >= 12 ? 'PM' : 'AM';

// Convert to 12-hour format
hours = hours % 12 || 12; // Handle midnight (0 hours)

// Format the time as a string
const time = `${hours}:${minutes}:${seconds} ${ampm}`;

// Display the time
console.log(time);

const chargeWrapper = document.getElementsByClassName('charge-ring-wrapper')[0];
const chargeCircles = document.querySelectorAll('.charge-circle');
console.log(chargeCircles);
const cir1 = document.getElementById('circle-1');
const cir2 = document.getElementById('circle-2');
const cir3 = document.getElementById('circle-3');
const cir4 = document.getElementById('circle-4');

const runTimeDisplay = document.getElementById('run-time-display');
const chargeIcon = document.getElementsByClassName('charging-icon')[0];

let minSpeedIcon = document.getElementsByClassName('min-speed')[0];

const powerBtn = document.getElementById('power-chk-box');
const powerIconLight = document.getElementsByClassName('power-icon')[0];
let batteryLevel = 48;
let power = false;

powerBtn.addEventListener('change', () => {

   if (powerBtn.checked) {
      power = true;
      powerIconLight.style.color = 'rgb(73, 179, 255)';
      chargeWrapper.style.opacity = '1.0';
      charging();
      minSpeedIcon.style.opacity = '1.0';
      console.log('Power is on');
   } else {
      // debugger
      powerBtn.checked = false;
      power = false;
      powerIconLight.style.color = '#333';
      chargeWrapper.style.opacity = '0.0';
      minSpeedIcon.style.opacity = '0.0';
      chargeCircles.forEach(circle => {
         circle.style.opacity = 0;
      });
      console.log('Power is off');
      // return;
   }
});

function charging() {
   // debugger;
   chargeIcon.style.opacity = 1;
   if (batteryLevel < 24 && power === true) {
      test25();
   } else if (batteryLevel < 49 && power === true) {
      test50();
   } else if (batteryLevel < 74 && power === true) {
      test75();
   } else if (batteryLevel <= 99 && power === true) {
      test100();
   } else {
      
      chargeIcon.style.opacity = 0;
      cir1.classList.remove('charging-animation');
      cir2.classList.remove('charging-animation2');
      cir3.classList.remove('charging-animation3');
      cir4.classList.remove('charging-animation4');
      // cir1.style.opacity = 1;
      // cir2.style.opacity = 1;
      // cir3.style.opacity = 1;
      // cir4.style.opacity = 1;
      return;
   }
};

function test25() {
   if (power === true) {

      cir1.style.opacity = 1;
      cir2.classList.add('charging-animation2');
      cir3.classList.add('charging-animation3');
      cir4.classList.add('charging-animation4');
      batteryLevel += 1;
      runTimeDisplay.innerHTML = batteryLevel;
      console.log(batteryLevel + ' %');

      setTimeout(() => {
         // Ran every 4 seconds
         cir2.classList.remove('charging-animation2');
         cir3.classList.remove('charging-animation3');
         cir4.classList.remove('charging-animation4');

         setTimeout(() => {
            //Ran every 1 second
            charging();
         }, 1000);
      }, 4000);
      
   } else {
      return;
   }
};

function test50() {
   // debugger;
   cir1.style.opacity = 1;
   cir2.classList.add('charging-animation');
   cir3.classList.add('charging-animation2');  
   cir4.classList.add('charging-animation3');
   batteryLevel += 1;
   runTimeDisplay.innerHTML = batteryLevel;
   console.log(batteryLevel + ' %');

   setTimeout(() => {
      cir2.classList.remove('charging-animation');
      cir3.classList.remove('charging-animation2');
      cir4.classList.remove('charging-animation3');

      setTimeout(() => {
         charging();
      }, 1000);
   }, 3000);
};

function test75() {
   // debugger;
   cir1.style.opacity = 1;
   cir2.style.opacity = 1;
   cir3.classList.add('charging-animation');  
   cir4.classList.add('charging-animation2');
   batteryLevel += 1;
   runTimeDisplay.innerHTML = batteryLevel;
   console.log(batteryLevel + ' %');

   setTimeout(() => {
      cir3.classList.remove('charging-animation');
      cir4.classList.remove('charging-animation2');

      setTimeout(() => {
         charging();
      }, 1000);
   }, 2000);
};

function test100() {
   // debugger;
   cir1.style.opacity = 1;
   cir2.style.opacity = 1;
   cir3.style.opacity = 1;
   cir4.classList.add('charging-animation');
   batteryLevel += 1;
   runTimeDisplay.innerHTML = batteryLevel;
   console.log(batteryLevel + ' %');

   setTimeout(() => {
      cir4.classList.remove('charging-animation');

      setTimeout(() => {
         charging();
      }, 1000);
   }, 1000);
};



