/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* configurable timer countdown, afterwards starts anotherr timer/
setInterval();
/ Comment out every project. 

Skills used bootstrap
functions reset
min
sec

use 2 timer objects work and pause
set getter
start ?
stop ?
toSeconds
totalSeconds function ?
use a constuctor to create a class.
https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript Accuracy problems date instead
Ideas ; loading bar which fills up, different colorr for both timers
Create update function, instead of calling it individual all the time
Update seconds buttons
*/
/*******************Class Timer*****************************/
class Timer {
    //Note; constructor needs to be written lowercase
    constructor(min = 0, sec = 0) {
        this.min = parseInt(min);
        this.sec = parseInt(sec);
        this.currentMin = this.min;
        this.currentSec = this.sec;
        this.intervalID = 0;
        this.finished = false;
        this.running = false;




    }
    
    get currentTotalSeconds() {
        
        
        
        return  parseFloat(this.currentMin*60 + this.currentSec) ;
        
        
        
    }
    
    
     get overallTotalSeconds() {
        
        
        
          return parseFloat(this.min*60 + this.sec) ;
        
        
        
    }
    
    
    
    get totalTimeString() {
        let output = '';

        this.min < 10 ? output += `0${this.min}:` : output += `${this.min}:`;
        this.sec < 10 ? output += `0${this.sec}` : output += `${this.sec}`;




        return output;
    }

     get completePercentage() {
         
         
         return (100-  (this.currentTotalSeconds/ this.overallTotalSeconds) *100)+"%" ;
     }


    get timeString() {
        let output = '';

        this.currentMin < 10 ? output += `0${this.currentMin}:` : output += `${this.currentMin}:`;
        this.currentSec < 10 ? output += `0${this.currentSec}` : output += `${this.currentSec}`;




        return output;
    }

    start() {

        //getTime is a good reference fo time
        this.running = true;

        let seconds = new Date().getTime();
        let last = seconds;

        // arrow functions don't  have their own this binding
        this.intervalID = setInterval(() => {
            let now = new Date().getTime();

            if ((now - last) >= 950) {
                last = now;
                if (this.currentSec > 0 && this.currentMin >= 0) {
                    this.currentSec--;
                } else if (this.currentSec == 0 && this.currentMin > 0) {

                    this.currentMin--;
                    this.currentSec = 59;

                } else {

                    this.stop();
                    this.finished = true;


                }
            }

        }, 250);




    }

    stop() {



        clearInterval(this.intervalID);
        this.running = false;
    }




    setTimer(min, sec) {

        this.min = parseInt(min);
        this.sec = parseInt(sec);
        this.currentMin = this.min;
        this.currentSec = this.sec;


    }

    addMin(min) {

        this.min += min;

    }

    minusMin(min) {
        if(this.min >0) {
        this.min -= min;
    }
    }
    
    addSec(sec) {

           if(this.sec <59) {
        this.sec += sec;
        
    }
    else {
        
        this.addMin(1) ;
         this.sec = 0;
    } 

    }

    minusSec(sec) {
        if(this.sec >0) {
        this.sec -= sec;
        
    }
    else {
        
        this.minusMin(1) ;
         this.sec = 59;
    }
    
    }
    
    
    

    reset() {
         
         
        this.stop(); 
        this.currentMin = this.min;
        this.currentSec = this.sec;
        this.finished = false;
        
   

    }



}

/********************End of Class timer**********************/
/********************Variables*******************************/


let sessionLength = new Timer();

let sessionBreak = new Timer();
let updateID;

let toggleNum = 0;


/********************Initialize*******************************/
sessionLength.setTimer(0, 15);
sessionBreak.setTimer(0, 8);
$('#sessionLength').text(sessionLength.totalTimeString);
$('#breakLength').text(sessionBreak.totalTimeString);
$('#currentCountdown').text(sessionLength.timeString);
 $('#loadingBar').attr('aria-valuemax', sessionLength.overallTotalSeconds) ;
 $('#loadingBar').attr('aria-valuenow', sessionLength.currentTotalSeconds );
 $('#loadingBar').css('width',sessionLength.completePercentage);
 




/********************Adding/Substracting to the break timer*******************************/
$('#minusBreak').on('click', () => {
    sessionBreak.minusMin(1);
    $('#breakLength').text(sessionBreak.totalTimeString);

});
$('#plusBreak').on('click', () => {
    sessionBreak.addMin(1);
    $('#breakLength').text(sessionBreak.totalTimeString);

});

$('#minusSecBreak').on('click', () => {
    sessionBreak.minusSec(1);
    $('#breakLength').text(sessionBreak.totalTimeString);

});
$('#plusSecBreak').on('click', () => {
    sessionBreak.addSec(1);
    $('#breakLength').text(sessionBreak.totalTimeString);

});

/********************Adding/Substracting to the session timer*******************************/
$('#minusSession').on('click', () => {
    sessionLength.minusMin(1);
    $('#sessionLength').text(sessionLength.totalTimeString);

});
$('#plusSession').on('click', () => {
    sessionLength.addMin(1);
    $('#sessionLength').text(sessionLength.totalTimeString);

});

$('#minusSecSession').on('click', () => {
    sessionLength.minusSec(1);
    $('#sessionLength').text(sessionLength.totalTimeString);

});
$('#plusSecSession').on('click', () => {
    sessionLength.addSec(1);
    $('#sessionLength').text(sessionLength.totalTimeString);

});


/********************Interaction*******************************/


$('#sessionLength').on('click', () => {

    $('#sessionLength').text(sessionLength.timeString);

});

/********************Starting and stopping the timer*******************************/
$('#startStopButton').on('click', () => {


    
// runs if button is stopped
    if (toggleNum === 0) {
        $('#startStopButton').val("Stop");
        toggleNum = 1;
        // check if session length is finished if yes start sessionBreak
        sessionLength.finished ? sessionBreak.start() : sessionLength.start();
        updateID = setInterval(function() {
                
            // start with running session
            if (sessionLength.finished === false) {
                // chnage loading bar color to blue
                    $('#loadingBar').addClass('bg-info').removeClass('bg-success') ;
                // if session is not rrunning already run it
                if (sessionLength.running === false) {

                    sessionLength.start();
                    toggleNum = 1;

                }
                $("#currentCountdown").text(sessionLength.timeString); 
               $('#loadingBar').attr('aria-valuemax', sessionLength.overallTotalSeconds) ;
                 
              $('#loadingBar').attr('aria-valuenow', sessionLength.currentTotalSeconds );
                      $('#loadingBar').css('width',sessionLength.completePercentage);
             

            }
            // if session is done, run break timer  if it is not done yet  
            else if (sessionBreak.finished === false) {
                // chnage loading bar color to red
                     

                // check if it is running if not start it
                if (sessionBreak.running === false) {

                    sessionBreak.start();


                }

                $("#currentCountdown").text(sessionBreak.timeString);
            $('#loadingBar').attr('aria-valuemax', sessionBreak.overallTotalSeconds) ;
         
              $('#loadingBar').attr('aria-valuenow', sessionBreak.currentTotalSeconds );
               $('#loadingBar').css('width',sessionBreak.completePercentage);
                 $('#loadingBar').removeClass('bg-info').addClass('bg-success') ;



            }
            // if both are done, reset both and the start/stop button   
            else {
                sessionBreak.reset();
                sessionLength.reset();
                $('#startStopButton').val("Start");
                toggleNum = 0;
                clearInterval(updateID);
                 $('#currentCountdown').text(sessionLength.timeString);
                  $('#loadingBar').attr('aria-valuemax', sessionLength.overallTotalSeconds) ;
              $('#loadingBar').attr('aria-valuenow', sessionLength.currentTotalSeconds );
                    $('#loadingBar').css('width',sessionLength.completePercentage);     
                      $('#loadingBar').addClass('bg-info').removeClass('bg-success') ;
            } 




        }, 1000);

// if button is running
    } else {


        $('#startStopButton').val("Start");
        if (sessionLength.finished !== true) {
            sessionLength.stop();
        }
        if (sessionBreak.finished !== true) {
            sessionBreak.stop();
        }


        clearInterval(updateID);
        toggleNum = 0;
       

    }




});

// reset both timers manually
$('#resetButton').on('click', () => {



   clearInterval(updateID);
    sessionLength.reset();
    sessionBreak.reset();
 
    toggleNum = 0;


     $('#startStopButton').val("Start");
    $('#currentCountdown').text(sessionLength.timeString);
    $('#loadingBar').attr('aria-valuemax', sessionLength.overallTotalSeconds) ;
              $('#loadingBar').attr('aria-valuenow', sessionLength.currentTotalSeconds );
                     $('#loadingBar').css('width',sessionLength.completePercentage);
  $('#loadingBar').addClass('bg-info').removeClass('bg-success') ;
});


