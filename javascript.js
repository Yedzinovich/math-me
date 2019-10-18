var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

document.getElementById("startreset").onclick = function(){
    if(playing == true){
        location.reload();
    }
    else{
        score = 0;
        playing = true;
        
        document.getElementById("scorevalue").innerHTML = score;
        
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        hide("gameover");
        
        document.getElementById("startreset").innerHTML = "Reset Game";
        
        startCountdown();
        
        generateQA();
    }
}

for(var i = 1; i < 5; i++){
    document.getElementById("box" + i).onclick = function(){
        if(playing){
            if(this.innerHTML == correctAnswer){
                score += 1;
                document.getElementById("scorevalue").innerHTML = score;

                //hide wrong box
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000);

                //generate another question
                generateQA();
            }
            else{
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
            }
        }
    }
    
}



//-------------functions------------------------------------------------------ 
function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game over!</p><p>Your score is "+ score +".</p>"
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
        
    }, 1000);
}

//stop counter
function stopCountdown(){
    clearInterval(action);
}

//hide element
function hide(Id){
    document.getElementById(Id).style.display = "none";
}

//show element
function show(Id){
    document.getElementById(Id).style.display = "block";
}

//generate question and miltiple choice answer
function generateQA(){
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + " x " + y;
    
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
    
    var answers = [correctAnswer];
    
    for(var i = 1; i < 5; i++){
        if(i !== correctPosition){
            
            var wrongAnswer;
            do{
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            }
            while(answers.indexOf(wrongAnswer) > -1);
            
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
            
        }
 
    }
}