
var multCount = 1;
var boostPrice = 10;
var emp2Unlock = 800;
var emp3Unlock = 17000;
var boostCount = 0;
var highScore = 0;
var isBoosted = false;

var backMusic = new Audio();
backMusic.src = "./sounds/chillmusicP.mp3";
backMusic.loop = true;
backMusic.volume = .4;


var clickSound = new Audio();
clickSound.src = "./sounds/shortClick.mp3";

var buttonSound = new Audio();
buttonSound.src = "./sounds/betterButton.mp3";

var dingSound = new Audio();
dingSound.src = "./sounds/ding-sound-effect.mp3";
dingSound.volume = .15;


class Cookie {
    constructor() {
        this.mult = 1;
        this.numCookies = 0;
        this.numEmp = 0;
        this.numEmp2 = -1;
        this.numEmp3 = -1;
        this.oMult = 1;
    }
}


c = new Cookie();
if( localStorage.getItem("numCookies") == null){
    alert("Hello! This is Potato Clicker. Click to get potatoes. Expand your buisness to get more potatoes. Click OK to start.");

}
else if( confirm( "Do you want to continue?")){
    loadValues();
    display();

}
else{ 
    localStorage.clear();

}


function saveValues(){
    localStorage.setItem( "numCookies", c.numCookies);
    localStorage.setItem( "highScore", highScore);
    localStorage.setItem( "numEmp", c.numEmp);
    localStorage.setItem( "numEmp2", c.numEmp2);
    localStorage.setItem( "numEmp3", c.numEmp3);
    localStorage.setItem( "mult", c.mult);
    localStorage.setItem( "oMult", c.oMult);
    var d = new Date();
    localStorage.setItem( "time", Math.floor(d.getTime()/1000));

}
function loadValues(){
    var x = localStorage.getItem("numCookies");
    highScore = parseInt( localStorage.getItem("highScore"));
    console.log( x )
    c.numCookies = parseInt(x);
    c.numEmp = parseInt( localStorage.getItem("numEmp"));
    c.numEmp2 = parseInt( localStorage.getItem("numEmp2"));
    c.numEmp3 = parseInt( localStorage.getItem("numEmp3"));
    c.mult = parseInt( localStorage.getItem("mult"));
    c.oMult = parseInt( localStorage.getItem("oMult"));
    if( localStorage.getItem("time") != null){
        var d = new Date();
        var timePassed =  Math.floor(d.getTime()/1000) - localStorage.getItem("time");
        console.log( timePassed);
        var passedCookies = c.numEmp*timePassed + (c.numEmp2+1)*(Math.floor(timePassed/7)*9) + (c.numEmp3+1)*(Math.floor(timePassed/25)*36);
        c.numCookies += passedCookies;
        alert( "You got " + passedCookies + " potatoes while you were away");
    }
    update();
}



/*
function setCookies(cname, cvalue, exdays) {
    console.log(c.numCookies);
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

}

function getCookies(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    var fieldStr = ca[0].substring(ca[0].indexOf("=") + 1);
    console.log(fieldStr);
    var fieldArray = fieldStr.split(" ");
    if (fieldArray != "" || fieldArray != null) {
        c.numCookies = parseInt(fieldArray[0]);
        highScore = parseInt(fieldArray[1]);
        c.mult = parseInt(fieldArray[2]);
        c.numEmp = parseInt(fieldArray[3]);
        c.numEmp2 = parseInt(fieldArray[4]);
        c.numEmp3 = parseInt(fieldArray[5]);
        c.oMult = parseInt(fieldArray[6]);
    }
    console.log(c.numCookies);
    return fieldStr;
}

function checkCookie() {
    var info = getCookies("cname");
    console.log(info);
    if (info != "") {
        alert("Welcome back");
    } else {
        if (info != "" && info != null) {
            setCookies("cname", c.numCookies + " " + highScore + " " + c.mult + " " + c.numEmp + " " + c.numEmp2 + " " + c.numEmp3 + " " + c.oMult, 50);
        }
    }
} */
window.addEventListener("DOMContentLoaded", event => {
    backMusic.play();
});
  
backMusic.play();

var temp2 = c.numEmp2;
var temp3 = c.numEmp3;
if (c.numEmp2 == -1)
    temp2 = 0;
if (c.numEmp3 == -1)
    temp3 = 0;
var perSecond = c.oMult * (c.numEmp + (temp2 * 9) / 7 + (temp3 * 35) / 25).toFixed(1);
console.log(c.numEmp + ", " + temp2 + ", " + temp3);

function update() {
    temp2 = c.numEmp2;
    temp3 = c.numEmp3;
    if (c.numEmp2 == -1)
        temp2 = 0;
    if (c.numEmp3 == -1)
        temp3 = 0;
    perSecond = c.oMult * (c.numEmp + (temp2 * 9) / 7 + (temp3 * 35) / 25).toFixed(1);
    display();
}

setInterval(function () {
    if (!isBoosted)
        c.numCookies += c.numEmp * 3 * c.oMult;
    else
        c.numCookies += c.numEmp * 30 * c.oMult;
    display();
    if (c.numEmp > 0)
        dingSound.play();
}, 3000);

setInterval(function () {
    if (c.numEmp2 > -1)
        if (!isBoosted)
            c.numCookies += c.numEmp2 * 9 * c.oMult;
        else
            c.numCookies += c.numEmp2 * 90 * c.oMult;
    display();
    if (c.numEmp2 > 0)
        dingSound.play();

}, 7000);

setInterval(function () {
    if (c.numEmp3 > -1)
        if (!isBoosted)
            c.numCookies += c.numEmp3 * 36 * c.oMult;
        else
            c.numCookies += c.numEmp3 * 360 * c.oMult;
    display();
    if (c.numEmp3 > 0)
        dingSound.play();

}, 25000);

setInterval( function(){
    document.getElementById("body").classList.toggle("difBody");
}, 10000);


function incCookies() {

    if (!isBoosted)
        c.numCookies += c.mult * c.oMult;
    else
        c.numCookies += c.mult * 10 * c.oMult;

    display();
}

function incOMult() {
    var cont = confirm("Are you sure?");
    if (cont) {
        c.oMult += Math.floor(c.numCookies / 10000);
        c.numCookies = 0;
        c.numEmp = 0;
        c.numEmp2 = -1;
        var boostCount = 0;
        c.mult = 1;
        multCount = 1;
        console.log("oTest");
        display();
    }
}

function sellEmp() {
    buttonSound.play();
    if (c.numEmp == 0)
        alert("No workers")
    else {
        c.numEmp--;
        c.numCookies++;
    }
    update();
    display();
}

function sellEmp2() {
    if (c.numEmp2 == -1)
        alert("???")
    else if (c.numEmp2 == 0)
        alert("No farms");
    else {
        c.numEmp2--;
        c.numCookies += 3;
    }
    update();
    display();
}

function sellEmp3() {
    if (c.numEmp3 == -1)
        alert("???")
    else if (c.numEmp3 == 0)
        alert("No factories");
    else {
        c.numEmp3--;
        c.numCookies += 3;
    }
    update();
    display();
}


function incMult() {
    var thresh = (c.mult+1)/2 * 50;
    if (c.numCookies >= thresh) {
        console.log(multCount);
        c.numCookies -= thresh;
        c.mult += 2;
    }
    // else
    // alert("Not enough potatoes")
    display();
}

function move(a, speed) {
    var elem = document.getElementById(a);
    var width = 1;
    var id = setInterval(frame, speed);
    function frame() {
        if (width >= 100) {
            width = 1;
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}

function incEmp() {
    var thresh = (c.numEmp + 1) * 2;
    if (c.numCookies >= thresh) {
        c.numCookies -= thresh;
        c.numEmp++;
    }
    //else
    //alert("Not enough potatoes");
    update();
    display();
}

function incEmp2() {
    if (c.numEmp2 > -1) {
        var thresh = (c.numEmp2 + 1) * 6;
        console.log(thresh);
        if (c.numCookies >= thresh) {
            c.numCookies -= thresh;
            c.numEmp2++;
        }
        //else
        // alert("Not enough potatoes");
    }
    else {
        console.log('test');
        if (c.numCookies >= emp2Unlock) {
            c.numCookies -= emp2Unlock;
            c.numEmp2++;
        }
        //else
        //alert("Not enough potatoes");
    }
    update();
    display();
}
function incEmp3() {
    if (c.numEmp3 > -1) {
        var thresh = (c.numEmp3 + 1) * 38;
        console.log(thresh);
        if (c.numCookies >= thresh) {
            c.numCookies -= thresh;
            c.numEmp3++;
        }
        // else
        //alert("Not enough potatoes");
    }
    else {
        console.log('test');
        if (c.numCookies >= emp3Unlock) {
            c.numCookies -= emp3Unlock;
            c.numEmp3++;
        }
        //  else
        // alert("Not enough potatoes");
    }
    update();
    display();
}


function cookieBoost() {
    console.log("test");
    if (c.numCookies >= boostPrice * Math.pow(10, boostCount)) {
        boostTimer();
        c.numCookies -= boostPrice * Math.pow(10, boostCount);
        display();
    }
    // else
    // alert("Not enough potatoes");

}

function boostTimer() {

    var countdown = 10;
    //document.getElementById("body").classList.add("boostedBody");
    document.getElementById("boostNum").innerHTML = "Boost: Active";
    backMusic.playbackRate = 1.3;
    var timer = setInterval(function () {
        document.getElementById("boost").style.pointerEvents = 'none';
        isBoosted = true;
        document.getElementById("boostTimer").innerHTML = "Timer: " + countdown;
        countdown--;

    }, 1000);
    setTimeout(function () {
        backMusic.playbackRate = 1;
        backMusic.volume = .4;
        document.getElementById("body").classList.remove("boostedBody");
        boostCount++;
        isBoosted = false;
        document.getElementById("boostNum").innerHTML = "Boost: Inactive";
        clearInterval(timer);
        document.getElementById("boost").style.pointerEvents = 'auto';
        document.getElementById("boostTimer").innerHTML = "";
        display();
    }, 12000);

}


function display() {
    saveValues();
    highScore = Math.max(c.numCookies, highScore);
    document.getElementById("highScore").innerHTML = "High Score: " + highScore;
    document.getElementById("boost").innerHTML = "Buy a boost: " + boostPrice * Math.pow(10, boostCount) + "p";
    document.getElementById("numCookies").innerHTML = "Number of potatoes: " + c.numCookies + " (" + perSecond + "p per second)";
    // document.getElementById("perSecond").innerHTML = perSecond + "p per second";
    document.getElementById("mult").innerHTML = "Increase click mutiplier: " + (c.mult+1)/2 * 50 + "p";
    document.getElementById("emp").innerHTML = "Hire worker: " + (c.numEmp + 1) * 2 + "p";
    if (c.numEmp2 > -1) {
        document.getElementById("emp2").innerHTML = "Buy farm: " + (c.numEmp2 + 1) * 6 + "p";
        document.getElementById("emp2Num").innerHTML = "Farms: " + c.numEmp2;
        document.getElementById("emp2Sell").innerHTML = "Sell: 3p"
    }
    if (c.numEmp3 > -1) {
        document.getElementById("emp3").innerHTML = "Buy factory: " + (c.numEmp3 + 1) * 38 + "p";
        document.getElementById("emp3Num").innerHTML = "Factories: " + c.numEmp3;
        document.getElementById("emp3Sell").innerHTML = "Sell: 19p"
    }
    document.getElementById("empNum").innerHTML = "Workers: " + c.numEmp;
    document.getElementById("multNum").innerHTML = "Click Multiplier: x" + c.mult;
    document.getElementById("oMultNum").innerHTML = "Overall Multiplier: x" + c.oMult;
    document.getElementById("multNum").innerHTML = "Click Multiplier: x" + c.mult;

}