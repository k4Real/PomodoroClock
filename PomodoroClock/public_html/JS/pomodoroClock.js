/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* configurable timer countdown, afterwards starts anotherr timer/
setInterval();

functions reset
min
sec

use 2 timer objects work and pause
set getter
start ?
stop ?
toSeconds

Ideas ; loading bar which fills up
*/
/*******************Class Timer*****************************/
class Timer {
    //Note; weird you can only assign constructo arguments once
    Constructor (min =0,sec=0) {
      this.min = min;
      this.sec = sec ;
      this.currentMin;
      this.currentSec;
      this.intervalID=0 ;
     
        
    }
    
    
    
    
    
    
    get timeString () {
        let output='';
        
        this.currentMin < 10 ? output += `0${this.currentMin}:`: output += `${this.currentMin}:` ;
        this.currentSec < 10 ? output += `0${this.currentSec}`: output += `${this.currentSec}` ;
       
        
        
        
        return output ;
    }
    
  start () {
      
      this.intervalID = setInterval ( ()=> {
          
  if(this.currentSec>0 &&this.currentMin >=0){
      
      
      
       this.currentSec -=1 ;
  }
  
  else if(this.currentMin>0) {
      
      this.currentMin -= 1;
      this.currentSec = 59;
      
      
  }
  else {
      
     this.currentMin =0;
     this.currentSec =0 ;
      
      
  }
  
  

      },1000) ;
          
               
  }
  
  stop() {
      
      
      clearInterval(this.intervalID);
      
      
      
  }
  
  
  setTimer (min,sec) {
      
      this.min = min;
      this.sec = sec;
      
      
      
  }
    
  addMin (min) {
      
    this.min +=min;  
      
  }  
   
 minusMin (min) {
     
     this.min -=min;
     
 }   
   
    reset (){
        
    this.currentMin = this.min ;  
    this.currentSec = this.sec ;  
        
    }
    
    
    
}

/******************************************/
let sessionLength = new Timer();
let sessionBreak = new Timer();
let updateID ;
let toggleNum = 0 ;


/*********************************/


sessionLength.setTimer(0,15);
sessionBreak.setTimer( 10, 8);
sessionLength.reset();





$('#sessionLength').on('click',()=> {
    
    $('#sessionLength').text(sessionLength.timeString) ;
    
});


$('#startStopButton').on('click',()=> {
    
    if(toggleNum === 0) 
    {
    $('#startStopButton').val("Stop");
   sessionLength.start() ;
  updateID =setInterval( function() {
       
  $("#currentCountdown").text(sessionLength.timeString);  
   
                                   }, 1000) ;
                                   
                                   
     toggleNum = 1;
} 
 else {
     
     
      $('#startStopButton') .val("Start"); 
    
sessionLength.stop();
clearInterval(updateID);
toggleNum =0;
     
     
 }

});