/*When battery is at 100%: Min speed setting= 40mins run time before battery level is 0, Std speed setting= 20mins run time before battery level is 0, Max speed setting= 13mins run time before battery level is 0 || Possible speed to power used formula: 100% / 40min = 2.5mins for every 1% of battery power. 100% / 20min = 5mins for every 1% of battery power. 100% / 13min = 7.69mins for every 1% of battery power.
*/
const updateTime = () => {
   const date = new Date();// Get the current time
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
   console.log('Time variable in updateTime function: ' + time);
   return [time, minutes];
};

const vacuum = {
   power: false,
   charging: false,
   batteryLevel: 100,
   speed: {
      min: 2.5, //power used formula: 100% / 40 (4mins) = 2.5sec for every 1% of battery power.

      std: 5, //100 / 20 (2mins)= 5sec for every 1% of battery power.
      max: 7.69 //100 / 13 = 7.69sec for every 1% of battery power.
   },
   speedSelected: 'min',
   lastSpeedSelected: ''
};
console.log(vacuum.speed.min);

const chargeWrapper = document.getElementsByClassName('charge-ring-wrapper')[0];
const chargeCircles = document.querySelectorAll('.charge-circle');
// console.log(chargeCircles);
const cir1 = document.getElementById('circle-1');
const cir2 = document.getElementById('circle-2');
const cir3 = document.getElementById('circle-3');
const cir4 = document.getElementById('circle-4');

const speedSwitch = document.getElementById('speed-selection-switch');
// console.log(speedSwitch.value);
const chargeDisplayIcon = document.getElementsByClassName('display-charging-icon')[0];
const runTimeDisplay = document.getElementById('run-time-display');

const allDisplaySpeedIcons = document.querySelectorAll('.speed-icons-display');
console.log(allDisplaySpeedIcons);
const minSpeedIcon = document.getElementsByClassName('min-speed')[0];
const stdSpeedIcon = document.getElementsByClassName('std-speed')[0];
const maxSpeedIcon = document.getElementsByClassName('max-speed')[0];

const powerBtn = document.getElementById('power-chk-box');
const chargeBtn = document.getElementById('charge-chk-box');
const powerBtnIconLight = document.getElementsByClassName('power-btn-icon')[0];
const chargeBtnIconLight = document.getElementsByClassName('charge-btn-icon')[0];

let getTime = updateTime();
console.log(getTime[1]);
let dischargeRateInterval;
// let speedMultiplier;
const runTimeCheck = () => {
   // get Time power started: getTime[0]

   // get current battery level: vacuum.batteryLevel

   // (vacuum.batteryLevel(40%) - 100%) ex result = 60% used * vacuum.speedSelectedRate(2.5sec) = total power used in mins ex 2.5mins

   let dischargeMultipler = (batteryLevel * vacuum.speed.min) / 60; // ex result = 2.5mins
}; 

// PICKUP HERE: Trying to figure out how to display remaining run time and have it update to mins left based on battery level. 
const disCharge = () => {
   // debugger;
   if (vacuum.batteryLevel > 0) {
      vacuum.batteryLevel -= 1;  
      runTimeDisplay.innerHTML = getTime[1];
      console.log("disCharge function ran, " + "battery Level= " + vacuum.batteryLevel + " " + updateTime());
      // console.log(updateTime()); 
   } else {
      // stop discharging
      clearInterval(powerUseRate);
      powerBtn.checked = false;
      powerBtnIconLight.style.color = '#333';
      chargeDisplayIcon.style.opacity = '0.0';
      //  chargeWrapper.style.opacity = '0.0';
      chargeCircles.forEach(circle => {
         circle.style.strokeDashoffset = 0;
      });
      allDisplaySpeedIcons.forEach(icon => {
         icon.style.opacity = '0.0';
      });
      runTimeDisplay.innerHTML = 'Battery is empty';
      clearInterval(disCharge);    
   }
};
const powerUseRate = () => {
   console.log(dischargeRateInterval);
   setInterval(disCharge, dischargeRateInterval);
   // console.log(dischargeRateInterval);
};
// Speed selection function and updates disCharge() interval timing
const speedSelection = () => {
   // debugger;
   if (speedSwitch.value === '1') {
      vacuum.speedSelected ='min';
      vacuum.lastSpeedSelected ='min';
      dischargeRateInterval = vacuum.speed.min * 1000; //2.5 * 1000 = 2500sec 
      minSpeedIcon.style.opacity = '1.0';
      stdSpeedIcon.style.opacity = '0.0';
      maxSpeedIcon.style.opacity = '0.0';
   } else if (speedSwitch.value === '2') {
      vacuum.speedSelected ='std';
      vacuum.lastSpeedSelected ='std';
      dischargeRateInterval = vacuum.speed.std * 1000; //5 * 1000 = 5000sec
      stdSpeedIcon.style.opacity = '1.0';
      minSpeedIcon.style.opacity = '0.0';
      maxSpeedIcon.style.opacity = '0.0';
   } else if (speedSwitch.value === '3') {
      vacuum.speedSelected ='max';
      vacuum.lastSpeedSelected ='max';
      dischargeRateInterval = vacuum.speed.max * 1000; //7.69 * 1000 = 769000sec
      minSpeedIcon.style.opacity = '0.0';
      stdSpeedIcon.style.opacity = '0.0';
      maxSpeedIcon.style.opacity = '1.0';
   }
   console.log(speedSwitch.value);
   return speedSwitch.value;
};
speedSwitch.addEventListener('change', speedSelection);



powerBtn.addEventListener('change', () => {
   if (powerBtn.checked) {
      vacuum.charging = false;
      vacuum.power = true;
      powerBtnIconLight.style.color = 'rgb(73, 179, 255)';

      speedSelection();
      powerUseRate();
      chargeWrapper.style.opacity = '1.0';
      console.log('Power is on');
      console.log(vacuum);
   } else {
      // debugger
      powerBtn.checked = false;
      vacuum.power = false;
      powerBtnIconLight.style.color = '#333';

      chargeCircles.forEach(circle => {
         circle.style.opacity = 0;
      });
      allDisplaySpeedIcons.forEach(icon => {
         icon.style.opacity = '0.0';
      });
      clearInterval(powerUseRate); 
      console.log('Power is off');
      console.log(vacuum);
   }
});


// ======= CHARGING RELATED FUNCTIONS AND LOGIC ============== //

chargeBtn.addEventListener('change', () => {
   if (chargeBtn.checked) {
      vacuum.power = false;
      vacuum.charging = true;
      chargeBtnIconLight.style.color = 'rgb(73, 179, 255)';
      chargeBtnIconLight.classList.add('charge-btn-animation');
      chargeWrapper.style.opacity = '1.0';
      charging();
      console.log('Charging strarted');
      console.log(vacuum);
   } else {
      // debugger
      chargeBtn.checked = false;
      vacuum.power = false;   
      vacuum.charging = false;
      chargeBtnIconLight.classList.remove('charge-btn-animation');
      chargeBtnIconLight.style.color = '#333';
      chargeCircles.forEach(circle => {
         circle.style.opacity = 0;
      });
      console.log('Charging stopped');
      console.log(vacuum);
   }
});

function charging() {
   // debugger;
   chargeIcon.style.opacity = 1;
   if (batteryLevel < 24 && vacuum.charging === true) {
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
      return;
   }
};

function test25() {
   if (vacuum.charging === true) {

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


//ADDED +++++++++++++++++++++++++++++++++++++++++++++++
// // Function to calculate the duration of a charging cycle based on speed setting
// function calculateChargingDuration(speedSetting) {
//    return SPEED_SETTINGS[speedSetting];
// }

// // Function to handle charging for a specific battery level threshold
// function handleCharging(threshold, speedSetting) {
//    chargeIcon.style.opacity = 1;
//    // Update UI
//    chargeCircles.forEach(circle => circle.style.opacity = 1);

//    // Calculate charging duration based on speed setting
//    const duration = calculateChargingDuration(speedSetting);

//    // Update battery level
//    updateBatteryLevel(batteryLevel + 1);

//    // Schedule next charging cycle
//    setTimeout(() => {
//        // Remove charging animation
//        chargeCircles.forEach(circle => circle.style.opacity = 0);

//        setTimeout(() => {
//            charging(speedSetting);
//        }, duration * 60 * 1000); // Convert duration to milliseconds
//    }, 4000);
// }

// // Main charging function
// function charging(speedSetting = 'std') {
//    const nextThreshold = BATTERY_SPEED_THRESHOLDS.find(entry => batteryLevel < entry.threshold);

//    if (power && nextThreshold) {
//        const nextSpeedSetting = nextThreshold.speed === 'min' ? 'min' : speedSetting;
//        handleCharging(nextThreshold.threshold, nextSpeedSetting);
//    } else {
//        chargeIcon.style.opacity = 0;
//        chargeCircles.forEach(circle => circle.style.opacity = 0);
//        console.log('Charging stopped');
//    }
// }

// // Initial call to start charging process
// charging();
// // ====================================================




// AI Code Below +++++++++++++++++++++++++++++++++++++++++++++++

// Constants for battery thresholds and corresponding speeds
// const BATTERY_SPEED_THRESHOLDS = [
//     { threshold: 25, speed: 'min' },
//     { threshold: 50, speed: 'std' },
//     { threshold: 75, speed: 'max' },
//     { threshold: 100, speed: 'max' } // Assuming a default speed of max for 100%
// ];

// // Constants for speed setting run times
// const SPEED_SETTINGS = {
//     min: 40,
//     std: 20,
//     max: 13
// };

// // DOM elements and initial state
// const chargeWrapper = document.getElementsByClassName('charge-ring-wrapper')[0];
// const chargeCircles = document.querySelectorAll('.charge-circle');
// const chargeIcon = document.getElementsByClassName('charging-icon')[0];
// const runTimeDisplay = document.getElementById('run-time-display');
// const powerBtn = document.getElementById('power-chk-box');
// const powerIconLight = document.getElementsByClassName('power-icon')[0];
// let minSpeedIcon = document.getElementsByClassName('min-speed')[0];
// const chargeBtn = document.getElementById('charge-btn');

// let batteryLevel = 33; // Start at 100%
// let power = false;
// let selectedSpeed = 'std'; // Default speed is standard

// // Function to update battery level and display
// function updateBatteryLevel(newLevel) {
//     batteryLevel = newLevel;
//     runTimeDisplay.innerHTML = batteryLevel;
//     console.log(batteryLevel + ' %');
// }

// // Function to calculate the duration of a charging cycle based on speed setting
// function calculateChargingDuration(speedSetting) {
//     return SPEED_SETTINGS[speedSetting];
// }

// // Function to handle consuming battery power
// function consumeBatteryPower() {
//    debugger;
//     const duration = calculateChargingDuration(selectedSpeed);
//     setInterval(() => {
//         if (power && batteryLevel > 0) {
//             updateBatteryLevel(batteryLevel - 1); // Decrease battery level by 1% based on speed
//         }
//     }, duration * 60 * 1000); // Convert duration to milliseconds
// }

// // Function to handle charging for a specific battery level threshold
// function handleCharging(threshold, speedSetting) {
//     chargeIcon.style.opacity = 1;
//     // Update UI
//     chargeCircles.forEach(circle => circle.style.opacity = 1);

//     // Calculate charging duration based on speed setting
//     const duration = calculateChargingDuration(speedSetting);

//     // Update battery level
//     updateBatteryLevel(batteryLevel + 1); // Increment battery level by 1% each cycle

//     // Schedule next charging cycle
//     setTimeout(() => {
//         // Remove charging animation
//         chargeCircles.forEach(circle => circle.style.opacity = 0);

//         setTimeout(() => {
//             charging(speedSetting);
//         }, duration * 60 * 1000); // Convert duration to milliseconds
//     }, 4000);
// }

// // Main charging function
// function charging(speedSetting = 'std') {
//     const nextThreshold = BATTERY_SPEED_THRESHOLDS.find(entry => batteryLevel < entry.threshold);

//     if (!power && nextThreshold) { // Charging can only happen when power is off
//         const nextSpeedSetting = nextThreshold.speed === 'min' ? 'min' : speedSetting;
//         handleCharging(nextThreshold.threshold, nextSpeedSetting);
//     } else {
//         chargeIcon.style.opacity = 0;
//         chargeCircles.forEach(circle => circle.style.opacity = 0);
//         console.log('Charging stopped');
//     }
// }

// // Event listener for power button
// powerBtn.addEventListener('change', () => {
//     if (powerBtn.checked) {
//         power = true;
//         powerIconLight.style.color = 'rgb(73, 179, 255)';
//         chargeWrapper.style.opacity = '1.0';
//         minSpeedIcon.style.opacity = '1.0';
//         console.log('Power is on');
//         consumeBatteryPower(); // Start consuming battery power when power is turned on
//         chargeBtn.disabled = true; // Disable charge button when power is on
//     } else {
//         power = false;
//         powerIconLight.style.color = '#333';
//         chargeWrapper.style.opacity = '0.0';
//         minSpeedIcon.style.opacity = '0.0';
//         chargeCircles.forEach(circle => {
//             circle.style.opacity = 0;
//         });
//         console.log('Power is off');
//         chargeBtn.disabled = false; // Enable charge button when power is off
//     }
// });

// // Event listener for charge button
// chargeBtn.addEventListener('click', () => {
//     if (!power) { // Charging can only happen when power is off
//         charging(selectedSpeed);
//     } else {
//         console.log('Cannot charge when power is on');
//     }
// });

// // Event listener for speed selection
// // Assuming you have radio buttons or a dropdown menu for selecting speed
// // Adjust the event listener accordingly
// document.querySelectorAll('input[name="speed"]').forEach(speedInput => {
//     speedInput.addEventListener('change', () => {
//         selectedSpeed = speedInput.value;
//         console.log(`Speed selected: ${selectedSpeed}`);
//     });
// });