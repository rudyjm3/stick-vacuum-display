const vacuum = {
   power: false,
   charging: false,
   batteryLevel: 100,
   speed: {
      min: 2.4, // Formula: 4mins * 60sec = 240sec / 100 = 2.4sec for every 1%
      std: 1.2, // 2mins * 60sec = 120sec / 100 = 1.2sec for every 1%
      max: 0.9 // 1min 30sec(1.5) * 60sec = 90sec / 100 =  0.9sec for every 1%
   },
   selectedSpeed: 'min',
   lastSpeedSelected: '',
   chargeRate: function() {
      const chargeRate = 3000; // this will be the ms for the setInteval
      console.log('Charge setIntervale rate: ' + chargeRate);
      return chargeRate;
   },
   dischargeRate: function() {
      const batteryLevel = this.batteryLevel;
      const selectedSpeed = this.selectedSpeed; 
      const speed = this.speed[selectedSpeed];
      console.log(speed);
      const dischargeRate = speed * 1000; // this will be the ms for the setInteval
      console.log('Discharge setIntervale rate: ' + dischargeRate);
      return dischargeRate;
   },
   runTimeRemaining: function(dischargeRate) {
      if (this.selectedSpeed === 'min') {
         return Math.ceil((this.batteryLevel / 1) * this.speed.min / 60);
      } else if (this.selectedSpeed ==='std') {
         return Math.ceil((this.batteryLevel / 1) * this.speed.std / 60);
      } else if (this.selectedSpeed ==='max') {
         return Math.ceil((this.batteryLevel / 1) * this.speed.max / 60);
      }
   },
};


const updateTime = () => {
   const date = new Date();// Get the current time
   let hours = date.getHours();
   const minutes = date.getMinutes();
   const seconds = date.getSeconds();
   const millisceconds = date.getMilliseconds();
   function addLeadingZero(num) { 
      return (num < 10) ? `0${num}` : num;
    }; 
   const formattedMinutes = addLeadingZero(minutes);
   const formattedSeconds = addLeadingZero(seconds);
   const formattedMilliseconds = addLeadingZero(millisceconds);
   const ampm = hours >= 12 ? 'PM' : 'AM';// Determine AM/PM
   // Convert to 12-hour format
   hours = hours % 12 || 12; // Handle midnight (0 hours)
   //Format the time as a string
   const time = `${hours}:${formattedMinutes}:${formattedSeconds}: ${ampm}`;
   // console.log(time);
   return [time, formattedMinutes];//convert to number
};


const chargeWrapper = document.getElementsByClassName('charge-ring-wrapper')[0];
const chargeCircles = document.querySelectorAll('.charge-circle');
// console.log(chargeCircles);
const cir1 = document.getElementById('circle-1');
const cir2 = document.getElementById('circle-2');
const cir3 = document.getElementById('circle-3');
const cir4 = document.getElementById('circle-4');

const speedSwitch = document.getElementById('speed-selection-switch');
const chargeDisplayIcon = document.getElementsByClassName('display-charging-icon')[0];
const runTimeDisplay = document.getElementById('run-time-display');

const allDisplaySpeedIcons = document.querySelectorAll('.speed-icons-display');
const minSpeedIcon = document.getElementsByClassName('min-speed')[0];
const stdSpeedIcon = document.getElementsByClassName('std-speed')[0];
const maxSpeedIcon = document.getElementsByClassName('max-speed')[0];

const powerBtn = document.getElementById('power-chk-box');
const chargeBtn = document.getElementById('charge-chk-box');
const powerBtnIconLight = document.getElementsByClassName('power-btn-icon')[0];
const chargeBtnIconLight = document.getElementsByClassName('charge-btn-icon')[0];

const getTime = updateTime();
let dischargeRateInterval;

const discharge = () => {
   runTimeDisplay.innerHTML = vacuum.runTimeRemaining();
   console.log('Current Battery Level = ' + vacuum.batteryLevel);
   console.log('Current Run Time ='+ runTimeDisplay.innerHTML);
   console.log('Time stamp = ' + updateTime()[0]);
   if (vacuum.batteryLevel <= 0) {
      clearInterval(dischargeRateInterval);
       powerBtn.checked = false;
       powerBtnIconLight.classList.remove('powerBtn-active');
       chargeBtn.checked = false;
       chargeBtnIconLight.classList.remove('active-icon');
       chargeWrapper.classList.remove('active-charge');
       chargeDisplayIcon.classList.remove('active-icon');
       runTimeDisplay.innerHTML = vacuum.runTimeRemaining();
       allDisplaySpeedIcons.forEach(icon => {
         icon.classList.remove('active-speed');
      });  
       console.log('Battery Level = 0');
   }
   vacuum.batteryLevel -= 1;
};

const charge = () => {
   
   // if (vacuum.power = true && vacuum.batteryLevel < 100) {
   //    clearInterval(dischargeRateInterval);
   //     powerBtn.checked = false;
   //     powerBtnIconLight.classList.remove('powerBtn-active');
   //     chargeBtn.checked = false;
   //     chargeBtnIconLight.classList.remove('active-icon');
   //     chargeWrapper.classList.remove('active-charge');
   //     chargeDisplayIcon.classList.remove('active-icon');
   //     runTimeDisplay.innerHTML = vacuum.runTimeRemaining();
   //     allDisplaySpeedIcons.forEach(icon => {
   //       icon.classList.remove('active-speed');
   //    });  
   //     console.log('Battery Level = 0');
   // }
   vacuum.batteryLevel += 1;
   console.log(vacuum.batteryLevel)
};
// let chargeRateInterval = setInterval(charge, vacuum.chargeRate());

// SPEED SELECTION FUNCTIONS
const speedSelection = (speed) => {

   console.log(speed); // speedSwitch.value (0, 1, or 2)
   if (speed ==='0') {
      clearInterval(dischargeRateInterval);
      vacuum.runTimeRemaining();
      vacuum.selectedSpeed ='min';
      vacuum.lastSpeedSelected ='min';
      allDisplaySpeedIcons.forEach(icon => {
         icon.classList.remove('active-speed');
      });  
      minSpeedIcon.classList.add('active-speed');
      dischargeRateInterval = setInterval(discharge, vacuum.dischargeRate());
   } else if (speed ==='1') {
      clearInterval(dischargeRateInterval);
      vacuum.runTimeRemaining();
      vacuum.selectedSpeed ='std';
      vacuum.lastSpeedSelected ='std';
      allDisplaySpeedIcons.forEach(icon => {
         icon.classList.remove('active-speed');
      });
      stdSpeedIcon.classList.add('active-speed');
      dischargeRateInterval = setInterval(discharge, vacuum.dischargeRate());
   } else if (speed ==='2') {
      clearInterval(dischargeRateInterval);
      vacuum.runTimeRemaining();
      vacuum.selectedSpeed ='max';
      vacuum.lastSpeedSelected ='max';
      allDisplaySpeedIcons.forEach(icon => {
         icon.classList.remove('active-speed');
      });
      maxSpeedIcon.classList.add('active-speed');
      dischargeRateInterval = setInterval(discharge, vacuum.dischargeRate());
   }
};

speedSwitch.addEventListener('change', () => {
   // if (vacuum.power === true && vacuum.batteryLevel > 0) {
   //    speedSelection(speedSwitch.value);
   //    console.log(vacuum.selectedSpeed);
   // } else {
   //    switch (speedSwitch.value) {
   //       case '0':
   //          vacuum.selectedSpeed ='min';
   //          break;
   //       case '1':
   //          vacuum.selectedSpeed ='std';
   //          break;
   //       case '2':
   //          vacuum.selectedSpeed ='max';
   //          break;
   //       default:
   //          vacuum.selectedSpeed ='min';
   //          break;
   //    }
   //    console.log('Speed selected: ' + vacuum.selectedSpeed);
   // }

   switch (speedSwitch.value) {
      case '0':
         vacuum.selectedSpeed = vacuum.speed.min;
         console.log(vacuum.selectedSpeed);
         break;
      case '1':
         vacuum.selectedSpeed = vacuum.speed.std;
         console.log(vacuum.selectedSpeed);
         break;
      case '2':
         vacuum.selectedSpeed = vacuum.speed.max;
         console.log(vacuum.selectedSpeed);
         break;
      default:
         vacuum.selectedSpeed = vacuum.speed.min;
         console.log(vacuum.selectedSpeed);
         break;
   }
});

// POWER BUTTON FUNCTIONS
powerBtn.addEventListener('change', () => {
   // debugger;
   if (powerBtn.checked && vacuum.batteryLevel > 0) {
      powerBtnIconLight.classList.add('powerBtn-active');
      vacuum.power = true;
      console.log('Power is on');
      dischargeRateInterval = setInterval(discharge, vacuum.dischargeRate());
   } else if (powerBtn.checked && vacuum.batteryLevel <= 0) {
      runTimeDisplay.innerHTML = `<p style="font-size:2.5rem; text-align:center; color: red;">Battery 0% <br> Please charge</p>`;
      powerBtn.checked = false;
   } else {
      powerBtnIconLight.classList.remove('powerBtn-active');
      vacuum.power = false;
      console.log('Power is off');
      clearInterval(dischargeRateInterval);
      clearInterval(dischargeRateInterval);
      runTimeDisplay.innerHTML = ' ';
      allDisplaySpeedIcons.forEach(icon => {
         icon.classList.remove('active-speed');
      });
   }
});

let chargeRateInterval
// CHARGE BUTTON FUNCTIONS
chargeBtn.addEventListener('change', () => {
   if (chargeBtn.checked && vacuum.batteryLevel < 100) {
      chargeBtnIconLight.classList.add('btn-animation');
      chargeWrapper.classList.add('active-charge');
      chargeDisplayIcon.style.opacity = '1';
      vacuum.charge = true;
       chargeRateInterval = setInterval(charge, vacuum.chargeRate());
      console.log('Charging is on');
   } else {
      clearInterval(chargeRateInterval);
      chargeBtnIconLight.classList.remove('btn-animation');
      chargeWrapper.classList.remove('active-charge');
      chargeDisplayIcon.style.opacity = '0';
      vacuum.charge = false;
      console.log('Charging is off');
   }
});


/*When battery is at 100%: Min speed setting = 40mins (4min demo time) run time before battery level is 0, 
Std speed setting= 20mins (2min demo time) run time before battery level is 0, 
Max speed setting= 13mins (1min 30sec demo time) run time before battery level is 0 

Recharge rate: 1 min to charge battery to 100%

|| Possible speed to power used formula: 

4 mins * 60 = 240 secs / 100(Full battery level) = 2.4 secs * 1000 = 2400 millisceconds.
it would take 100 intervals of 24sec to get to 40 mins.
100% / 40min = 2.5mins for every 1% of battery power. 
100% / 20min = 5mins for every 1% of battery power. 
100% / 13min = 7.69mins for every 1% of battery power.
*/