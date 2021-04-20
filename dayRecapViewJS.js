
function loadDataBeginning(){
    var jsonData = JSON.parse(localStorage.getItem('cookieLOCKDOWNGAME'));
    var statmentP;
    var urlImage;
    document.getElementById("moneyJS").innerHTML = "Money : "+ jsonData["userStats"]["recapStats"]["money"] +"$";
    document.getElementById("mentalHealthJS").innerHTML = "Mental Health : "+ jsonData["userStats"]["recapStats"]['mental'];
    document.getElementById("hygieneJS").innerHTML = "Hygiene : "+ jsonData["userStats"]["recapStats"]['hygiene'];
    document.getElementById("energyJS").innerHTML = "Energy : "+ jsonData["userStats"]["recapStats"]['energy'];
    document.getElementById("durationJS").innerHTML = "Duration : "+ jsonData["userStats"]["recapStats"]['duration'] + "day";
    
    
    console.log("begin :"+jsonData["userStats"]["recapStats"]["refAction"]);
    if(checkBellowZero(jsonData)){
        //dead
        console.log("bellow zero");
        jsonData["userStats"]["recapStats"]["refAction"] = -1;
    }
    else if(jsonData["userStats"]["stats"]["duration"]>=182){
        //win end of confinment
        console.log("end confi");
        jsonData = returnWhenBellowZero(jsonData);
    }
    switch(jsonData["userStats"]["recapStats"]["refAction"]){
        case -8:
            //dead caught outside
            statmentP = "You get arrested by the police for not respecting the lockdown. The government hangs you.";
            urlImage = "./image/hang.png";
        break;
        case -7:
            //dead caught hacking
            statmentP = "You get arrested by the police for hacking. The government hangs you.";
            urlImage = "./image/hang.png";
        break;
        case -6:
            //dead caught stealing
            statmentP = "You are arrested by the police for theft. The government hangs you.";
            urlImage = "./image/hang.png";
        break;
        case -5:
            //dead mental
            statmentP = "The lockdown drives you crazy and you decide to jump off the top of your building. ";
            urlImage = "./image/skull.jpg";
        break;
        case -4:
            //dead energy
            statmentP = "You don't have enough energy and you will die of fatigue. ";
            urlImage = "./image/skull.jpg";
        break;
        case -3:
            //dead hygiene
            statmentP = "Your hygiene is deplorable. You catch the virus and die from it ";
            urlImage = "./image/virus.png";
        break;
        case -2:
            //dead money
            statmentP = "You don't have enough money to buy food. You die ";
            urlImage = "./image/skull.jpg";
        break;
        case -1:
            //dead
            statmentP = "You died";
            urlImage = "./image/skull.jpg";
        break;
        case 0:
            //workout
            statmentP = "Keep going like that and you might make it to the next Olympic Games";
            urlImage = "./image/workout.png";
        break;
        case 1:
            //shower
            statmentP = "Your shower makes you feel good. You feel clean. ";
            urlImage = "./image/shower.png";
        break;
        case 2:
            //tv
            statmentP = "Again and again in front of your TV. You are starting to get bored of the lockdown. ";
            urlImage = "./image/tv.jpg";
        break;
        case 3:
            //go out
            statmentP = "You step outside and breathe free space. Luckily the police didn't catch you";
            urlImage = "./image/outside.jpg";
        break;
        case 4:
            //social : win make a coup
            statmentP = "Your popularity is exploding! The people support you and reverse the government with you. You are crowned and reign over the country.";
            urlImage = "./image/king.jpg";
            jsonData["userStats"]["recapStats"]["refAction"] = -104;
        break;
        case 5:
            //computer : make video
            console.log("test");
            statmentP = "You celebrate a video and earn money. (tip: increase your social ability to earn more money)";
            urlImage = "./image/makevideo.jpg";
        break;
        case 6:
            //computer hack people
            statmentP = "You hack people and make money. Luckily the police didn't catch you.";
            urlImage = "./image/hack.jpg";
        break;
        case 7:
            //computer hack gouv : win
            statmentP = "You hack into the government and uncover a plot. The government is at the origin of the virus and already has a cure. Its goal: lock up the population to stop the demonstrations against the government.";
            urlImage = "./image/hack.jpg";
            jsonData["userStats"]["recapStats"]["refAction"] = -107;
        break;
        case 8:
            //taichi : win
            statmentP = "You have finally understood the world. A great power summerge you which allows you to change the world. You decide to remove the virus which leads to the end of the lockdown.";
            urlImage = "./image/taichi.jpg";
            jsonData["userStats"]["recapStats"]["refAction"] = -108;
        break;
        case 9:
            //stealth : steal
            statmentP = "You steal your neighbor and earn money. Luckily the police didn't catch you.";
            urlImage = "./image/steal.jpg";
        break;
        case 10:
            //stealth : win leave country
            statmentP = "You are fed up with your country and you decide to run away. In your country, there is no virus or dictatorship. It is paradise.";
            urlImage = "./image/plane.jpg";
            jsonData["userStats"]["recapStats"]["refAction"] = -110;
        break;
        case 11:
            //worker : win : find cure
            statmentP = "After days of hard work you found miracle cure that eradicated the virus.";
            urlImage = "./image/cure.png";
            jsonData["userStats"]["recapStats"]["refAction"] = -111;
        break;
        case 12:
            //learn cheap
            statmentP = "You learn new skills which allow you to acquire skills.";
            urlImage = "./image/learn.jpg";
        break;
        case 13:
            //learn medium
            statmentP = "You learn new skills which allow you to acquire skills.";
            urlImage = "./image/learn.jpg";
        break;
        case 14:
            //learn expensive
            statmentP = "You learn new skills which allow you to acquire skills.";
            urlImage = "./image/learn.jpg";
        break;
    }
    document.getElementById("recapParagraphJS").innerHTML = statmentP;
    document.getElementById("imageJS").src = urlImage;
    console.log("end :"+jsonData["userStats"]["recapStats"]["refAction"])
    saveJSON(jsonData);
    
}

function checkFunction(){
    var jsonData = loadJSON();
    
    if(jsonData["userStats"]["recapStats"]["refAction"] < 0){
        window.location.href='index.html'
    }
    else{
        window.location.href='mainView.html'
    }
    
}

function checkBellowZero(jsonData){
    return jsonData["userStats"]["stats"]["money"] <=0 ||
    jsonData["userStats"]["stats"]["hygiene"] <=0 ||
    jsonData["userStats"]["stats"]["energy"] <=0 ||
    jsonData["userStats"]["stats"]["mental"] <=0;
}
function returnWhenBellowZero(jsonData){
    if(jsonData["userStats"]["stats"]["money"] <=0){
        jsonData["userStats"]["recapStats"]["refAction"] =-2;
    }
    else if(jsonData["userStats"]["stats"]["hygiene"] <=0){
        jsonData["userStats"]["recapStats"]["refAction"] =-3;
    }
    else if(jsonData["userStats"]["stats"]["energy"] <=0){
        jsonData["userStats"]["recapStats"]["refAction"] =-4;
    }
    else if(jsonData["userStats"]["stats"]["mental"] <=0){
        jsonData["userStats"]["recapStats"]["refAction"] =-5;
    }
    return jsonData;
}


function loadJSON(){
    return JSON.parse(localStorage.getItem('cookieLOCKDOWNGAME'));
}
function saveJSON(jsonData){
    localStorage.setItem('cookieLOCKDOWNGAME',JSON.stringify(jsonData));
}

