document.addEventListener('DOMContentLoaded',()=>{
    //selecting the elements
  
   const start_countdown = document.getElementById('start-countdown');
   const pause_countdown = document.getElementById('pause-countdown');
   const cancel_countdown = document.getElementById('cancel-countdown');
   const resume_countdown = document.getElementById('resume-countdown');
   console.log(start_countdown);
   console.log(pause_countdown);
   console.log(cancel_countdown);
   console.log(resume_countdown);


   //initial values
   let coundownTimer;
   let endTime;


   //function for updating the display
   const updateDisplay=(time)=>{
     const days = Math.floor(time/(1000*60*60*24));
     const hours = Math.floor((time%(1000*60*60*24))/(1000*60*60));
     const minutes = Math.floor((time%(1000*60*60))/(1000*60));
     const seconds = Math.floor((time%(1000*60))/1000);
    
     //padStart() will make string 01 if it has single character 
     document.getElementById('days').textContent = days.toString().padStart(2,"0");
     document.getElementById('hours').textContent = hours.toString().padStart(2,"0");
     document.getElementById('minutes').textContent = minutes.toString().padStart(2,"0");
     document.getElementById('seconds').textContent = seconds .toString().padStart(2,"0");

   }
   //function for reseting
   const resetDisplayAndButtons = ()=>{
    localStorage.removeItem("countdownTarget");
    document.getElementById('target-date').textContent = '';
    document.getElementById('days').textContent = "00";
    document.getElementById('hours').textContent = "00";
    document.getElementById('minutes').textContent = "00";
    document.getElementById('seconds').textContent = "00";

    start_countdown.disabled = false;
    pause_countdown.disabled = true;
    resume_countdown.disabled = true;
    cancel_countdown.disabled = true;
   }

   //function for starting the countdown
   const startCountDown = (duration , isResuming = false)=>{
    document.getElementById('timer-display').style.display = "flex";
    document.getElementById('message').style.display = "none"
      if(!isResuming){
        endTime = Date.now() + duration;
        coundownTimer = setInterval(()=>{
            const now = Date.now();
            const timeLeft = endTime - now;
            if(timeLeft<=0){ 
                clearInterval(coundownTimer);
                displayMessage("coundown finished");
                pause_countdown.disabled = true;
                start_countdown.disabled = false;
                resetDisplayAndButtons();
                return;
            }
            updateDisplay(timeLeft);
            pause_countdown.disabled =false;
            cancel_countdown.disabled = false;
        },1000)
      }
   }

   //function to display the message
   const displayMessage  = (message)=>{
    document.getElementById('message').style.display = "block"
    document.getElementById('message').textContent = message
    document.getElementById('timer-display').style.display = "none";
   }

   //function  for adding the event listeners
   //!start button
   start_countdown.addEventListener("click",()=>{
         const targetDateValue = document.getElementById('target-date').value;
         if(targetDateValue){
            const targetDate = new Date(targetDateValue);
            console.log(targetDate);
        
            const now  = new Date();
            console.log(now);
            if(targetDate>now){
                 const duration = targetDate - now;
                 localStorage.setItem('countdownTarget', targetDate.toString());
                 startCountDown(duration);
                 start_countdown.disabled=true;
                 pause_countdown.disabled=false;
                 cancel_countdown.disabled=false;
                 resume_countdown.disabled=true;
            }else{
                alert("please select future date");
            }
         }else{
            alert("please select the target date");
         }
   });
   //!pause button
   pause_countdown.addEventListener("click",()=>{
        clearInterval(coundownTimer);
        resume_countdown.disabled=false;
        pause_countdown.disabled = true;
   });
   //!cancel button
   cancel_countdown.addEventListener("click",()=>{
     clearInterval(coundownTimer);
     resetDisplayAndButtons();
   });
   //!resume button 
 resume_countdown.addEventListener("click",()=>{
        const duration = endTime - Date.now();
        startCountDown(duration);
        resume_countdown.disabled=true;
        pause_countdown.disabled = false;
   });

   //function to load saved date from the localstorage 
   const savedDate = localStorage.getItem('countdownTarget');
   if(savedDate){
    const targetDate = new Date(savedDate);
    const now = new Date();
    if(targetDate>now){
        const duration  = targetDate- now;
        startCountDown(duration);
        start_countdown.disabled = true;
        pause_countdown.disabled= false;
        cancel_countdown.disabled = false;
    }else{
       resetDisplayAndButtons();
    }
   }
});