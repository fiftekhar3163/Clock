class AlarmClock {
    constructor() {
      this.clockElement = document.getElementById('clock');
      this.alarmForm = document.getElementById('alarmForm');
      this.alarmSound = document.getElementById('alarmSound');
      this.alarmSet = false;
  
      this.updateClock();
      this.alarmForm.addEventListener('submit', this.handleAlarmFormSubmit.bind(this));
    }
  
    updateClock() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      this.clockElement.textContent = `${hours}:${minutes}:${seconds}`;

      if (this.alarmSet && now.getHours() === parseInt(document.getElementById('alarm-hour').textContent) &&
          now.getMinutes() === parseInt(document.getElementById('alarm-minutes').textContent)) {
        this.alarmSound.play();
        this.clockElement.style.color = 'red';
        setTimeout(() => {
          this.clockElement.style.color = 'white';
        }, 5000); // Change back to white after 5 seconds
        this.alarmSet = false;
      }
  
      setTimeout(this.updateClock.bind(this), 1000);
    }
  
    handleAlarmFormSubmit(event) {
      event.preventDefault();
      const hour = parseInt(document.getElementById('hour').value);
      const minute = parseInt(document.getElementById('minute').value);
      const alarmDetails = document.getElementById("alarm-details");
      if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        alert('Please enter valid hour (0-23) and minute (0-59)');
        return;
      }

      alarmDetails.style.display="block";
      document.getElementById("alarm-hour").innerHTML=hour;
      document.getElementById("alarm-minutes").innerHTML=`${minute < 10 ? `0${minute}`:minute}`
      document.getElementById('hour').value="";
      document.getElementById('minute').value="";
      this.alarmSet = true;
    }
  }
  
  new AlarmClock();
  