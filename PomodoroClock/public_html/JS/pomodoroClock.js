/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* configurable timer countdown, afterwards starts anotherr timer/
setInterval();
/ Comment out every project. 
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
Ideas ; loading bar which fills up
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
    get totalTimeString() {
        let output = '';

        this.min < 10 ? output += `0${this.min}:` : output += `${this.min}:`;
        this.sec < 10 ? output += `0${this.sec}` : output += `${this.sec}`;




        return output;
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

        this.min -= min;

    }

    reset() {

        this.currentMin = this.min;
        this.currentSec = this.sec;
        this.finished = false;
        this.started = false;

    }



}

/********************End of Class timer**********************/
/********************Variables*******************************/


let sessionLength = new Timer();
let sessionBreak = new Timer();
let updateID;

let toggleNum = 0;


/********************Interaction*******************************/


sessionLength.setTimer(1, 15);
sessionBreak.setTimer(0, 8);

/********************Adding/Substracting to the break timer*******************************/
$('#minusBreak').on('click', () => {
    sessionBreak.minusMin(1);
    $('#breakLength').text(sessionBreak.totalTimeString);

});
$('#plusBreak').on('click', () => {
    sessionBreak.addMin(1);
    $('#breakLength').text(sessionBreak.totalTimeString);

});
/********************Interaction*******************************/


$('#sessionLength').on('click', () => {

    $('#sessionLength').text(sessionLength.timeString);

});

/********************Starting and stopping the timer*******************************/
$('#startStopButton').on('click', () => {


    //  only runs as long as session time is not 0:00

    if (toggleNum === 0) {
        $('#startStopButton').val("Stop");
        toggleNum = 1;
        // check if session length is finished if yes start sessionBreak
        sessionLength.finished ? sessionBreak.start() : sessionLength.start();
        updateID = setInterval(function() {

            // start with running session
            if (sessionLength.finished === false) {

                // if session is not rrunning already run it
                if (sessionLength.running === false) {

                    sessionLength.start();
                    toggleNum = 1;

                }
                $("#currentCountdown").text(sessionLength.timeString);




            }
            // if session is done, run break timer  if it is not done yet  
            else if (sessionBreak.finished === false) {


                // check if it is running if not start it
                if (sessionBreak.running === false) {

                    sessionBreak.start();


                }

                $("#currentCountdown").text(sessionBreak.timeString);



            }
            // if both are done, reset both and the start/stop button   
            else {
                sessionBreak.reset();
                sessionLength.reset();
                $('#startStopButton').val("Start");
                toggleNum = 0;
                clearInterval(updateID);
            }




        }, 1000);


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


$('#resetButton').on('click', () => {




    sessionLength = new Timer(0, 15);
    sessionBreak = new Timer(0, 8);

    toggleNum = 0;



    $('#currentCountdown').text(sessionLength.timeString);

});