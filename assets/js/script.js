//HTML elements to be edited by JS
var timerEl=$('#timer');
var rootEl=$('#root');
var title=$('#title');
var HSbutton = $('#highscore');
var titleStatesEl = $("#title");
var sideStatesEl = $("#side-menu");
// var playAgain = $('#playAgain');

title.text("Coding Quiz!");

var timeLeft = 40;

//These arrays we will use 
var scoresArray = [];
var namesArray = [];


//HSbutton.on('click', Highscores());


//Question flags. IF a question is answered correct, turns to true
var q1Flag = false;
var q2Flag = false;
var q3Flag = false;
var allCorrectFlag = true;



//These arrays will be filled via local storage
var names = [];
var scores = [];

var index = 0;

var HSflag = false;


//Main function, starts countdown and handles back end variables
function countdown(){
    HSbutton.on('click', function(event){
        HSflag = true;
        event.preventDefault();
        console.log("button clicked");
        //If index is not-initialised (ie there are no high scores) index will not be gotten from LS
        index = JSON.parse(localStorage.getItem("index"));

        if(index===1)
        {
            namesArray = JSON.parse(localStorage.getItem("names"));
            scoresArray = JSON.parse(localStorage.getItem("scores"));
            rootEl.text(namesArray[0] +  ": " + scoresArray[0]);
            title.text('Highscore').css({'font-size': '30px', 'color': 'blue'});
            timerEl.attr('data-state', 'hidden');
            
        }
        else if(index===0)
        {
            alert("No entries into highscore yet");
            console.log("entering index 0 option");
            return;
        }
        else
        {
            
            console.log("entering index > 1 option");
            title.text('Highscore').css({'font-size': '30px', 'color': 'blue'});
            //title.text("Highscores: <br>").css("font-size" , "30px");
            //Printing highscores

            namesArray = JSON.parse(localStorage.getItem("names"));
            scoresArray = JSON.parse(localStorage.getItem("scores"));
            rootEl.text(" ");
            sideStatesEl.attr('data-state', 'hidden');

            for (let i = 0; i < namesArray.length; i++) {
                for (let j = i+1; j < namesArray.length; j++) {
                    if (scoresArray[i] <  scoresArray[j]) {
                        var tempS = scoresArray[i];
                        var tempN = namesArray[i];
    
                        scoresArray[i] = scoresArray[j];
                        namesArray[i] = namesArray[j];
    
                        scoresArray[j] = tempS;
                        namesArray[j] = tempN;
                        
                    } 
                }  
            }

            localStorage.setItem("names", JSON.stringify(namesArray));
            localStorage.setItem("scores", JSON.stringify(scoresArray));

            for (let i = 0; i < index; i++) {
                console.log("names["+i+"] is: " + namesArray[i]);
                console.log("scores["+i+"] is: " +scoresArray[i]);

                
                
                rootEl.append(namesArray[i] +  ": " + scoresArray[i] + " <br>");     
            }
        }
    });

    // playAgain.on('click', function(event){
    //     event.preventDefault();
    //     var q1Flag = false;
    //     var q2Flag = false;
    //     var q3Flag = false;
    //     countdown();
    // });


    //Opens the first question element
    question1();


    

    var timeInterval = setInterval(function () {

        if (HSflag) {
            clearInterval(timeInterval);
        }

    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.text(timeLeft + ' seconds remaining');
      // Decrement `timeLeft` by 1
      timeLeft--;
    } 
    else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.text(timeLeft + ' second remaining');
      timeLeft--;
    } 
    else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.text('');
      // Use `clearInterval()` to stop the timer
      rootEl.text("");
      title.text("Try again!");
      clearInterval(timeInterval);
    }

    //If all flags below are true, enters this if statement to start highscore process
    if (q1Flag  &&  q2Flag  && q3Flag && allCorrectFlag)   {
        //Index tracker for total number of elements in highscore storage
        // var index = 0;

        index = JSON.parse(localStorage.getItem("index"));
        
        //Taking name and high score
        var Highscore = timeLeft;
        var Hname = prompt("Enter name");

        //A name has been added, therefore index has to be incremented and saved to local storage
        index++;
        localStorage.setItem("index", JSON.stringify(index));
        

   
        //If local storage is empty
        if (index===1) {
            console.log("First index being added now...");
            // namesArray.push(Hname);
            // scoresArray.push(Highscore);
            namesArray[0] = Hname;
            scoresArray[0] = Highscore;

            // console.log("namesArray " + namesArray);
            // console.log("scoresArray " + scoresArray);
        }
        else
        {
            //Importing names and scores from local storage
            names = JSON.parse(localStorage.getItem("names"));
            scores = JSON.parse(localStorage.getItem("scores"));

            for (let i = 0; i < names.length; i++) {
                console.log("names[i] is: " + names[i]);
                console.log("scores[i] is: " + scores[i]);
            }

            //Converting into proper arrays
            namesArray = names;
            scoresArray = scores;

            for (let i = 0; i < names.length; i++) {
                console.log("namesArray[i] is: " + namesArray[i]);
                console.log("scoresArray[i] is: " + scoresArray[i]);
            }

            // for (let i = 0; i < index; i++) {
            //     namesArray[i] = names[i];
            //     console.log("names[i] is " + names[i]);
            //     console.log("scores[i] is " + scores[i]);
            //     scoresArray[i] = scores[i];
            //     console.log("namesArray[i] is: " + namesArray[i]);
            //     console.log("scoresArray[i] is: " + scoresArray[i]);
            // }

            namesArray.push(Hname);
            scoresArray.push(Highscore);
            console.log("names is now: " + namesArray);
            console.log("scores is now: " + scoresArray);
        }
        

        // console.log("index is " + index);
        // console.log("High score is: " + Highscore);

        clearInterval(timeInterval);

        

        

        titleStatesEl.text("");
        sideStatesEl.text("");

        titleStatesEl.attr('data-state', 'hidden');
        sideStatesEl.attr('data-state', 'hidden');

    


        


        

      


        localStorage.setItem("names", JSON.stringify(namesArray));

        console.log("name[0] is: " + namesArray[0]);
  

        localStorage.setItem("scores", JSON.stringify(scoresArray));

        
        // console.log("The names array according to local storage is: " + localStorage.getItem("names"));


        // console.log("The scores array according to local storage is: " + localStorage.getItem("scores"));

        // console.log("About to enter for loop");

        if(index===1)
        {
            title.text('Highscore').css({'font-size': '30px', 'color': 'blue'});
            rootEl.append(namesArray[0] +  ": " + scoresArray[0]);
        }
        else
        {
            
            title.text('Highscore').css({'font-size': '30px', 'color': 'blue'});
            //title.text("Highscores: <br>").css("font-size" , "30px");
            //Printing highscores

            for (let i = 0; i < namesArray.length; i++) {
                for (let j = i+1; j < namesArray.length; j++) {
                    if (scoresArray[i] <  scoresArray[j]) {
                        var tempS = scoresArray[i];
                        var tempN = namesArray[i];
    
                        scoresArray[i] = scoresArray[j];
                        namesArray[i] = namesArray[j];
    
                        scoresArray[j] = tempS;
                        namesArray[j] = tempN;
                        
                    } 
                }  
            }

            localStorage.setItem("names", JSON.stringify(namesArray));
            localStorage.setItem("scores", JSON.stringify(scoresArray));

            for (let i = 0; i < names.length; i++) {
                console.log("names["+i+"] is: " + namesArray[i]);
                console.log("scores["+i+"] is: " +scoresArray[i]);
                rootEl.append(namesArray[i] +  ": " + scoresArray[i] + "<br>");
                
            }
        }

        
    }
    
  }, 1000); 
}

countdown();

function question1(){
        rootEl.text('What is the name of css?').css({'font-size': '20px', 'display': 'flex', 'justify-content': 'center', 'position': 'absolute', 'top': '200px', 'left': '200px'});

        rootEl.append('<button class = "select-btn o1 btn btn-primary"> Cascading style sheets </button>').css('display' , 'block');
        rootEl.append('<button class = "select-btn o2 btn btn-primary"> Caesar Salad sucks </button>').css('display' , 'block');

        rootEl.on('click', '.o1', function(){
            console.log("correct");
            q1Flag=true;
            question2();
        });

        rootEl.on('click', '.o2', function(){
            console.log("incorrect");

            timeLeft = timeLeft - 20;
            q1Flag=true;

        });
}

function question2(){
        rootEl.text('What is the language named after a snake?').css({'font-size': '20px', 'display': 'flex', 'justify-content': 'center', 'position': 'absolute', 'top': '200px', 'left': '200px'});

        rootEl.append('<button class = "select-btn o3 btn btn-primary"> Anaconda </button>').css('display' , 'block');
        rootEl.append('<button class = "select-btn o4 btn btn-primary"> Python </button>').css('display' , 'block');

        rootEl.on('click', '.o3', function(){
            console.log("incorrect");
            timeLeft = timeLeft - 20;
            q2Flag=true;

        });

        rootEl.on('click', '.o4', function(){
            console.log("correct");
            q2Flag=true;
            question3();
        });

}

function question3(){
    rootEl.text('Is C a high level or low level language').css({'font-size': '20px', 'display': 'flex', 'justify-content': 'center', 'position': 'absolute', 'top': '200px', 'left': '200px'});

    rootEl.append('<button class = "select-btn o5 btn btn-primary"> High level </button>').css('display' , 'block');
    rootEl.append('<button class = "select-btn o6 btn btn-primary"> Low level </button>').css('display' , 'block');

    rootEl.on('click', '.o5', function(){
        q3Flag=true;
        console.log("correct");

        rootEl.text(" ");
    });

    rootEl.on('click', '.o6', function(){
        console.log("incorrect");

        timeLeft = timeLeft - 20;
        q3Flag=true;
    });
}










