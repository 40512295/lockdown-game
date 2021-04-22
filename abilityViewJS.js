function loadJSON(){
    return JSON.parse(localStorage.getItem('cookieLOCKDOWNGAME'));
}
function saveJSON(jsonData){
    localStorage.setItem('cookieLOCKDOWNGAME',JSON.stringify(jsonData));
}
function changeLevel(ability,newlvl){
    var data = loadJSON();
    data['userStats']['stats']['abilityLvl'][ability] = newlvl;
    saveJSON(data);
}


function loadDataBeginning(){
    var jsonData = loadJSON();
    var jsonWithSelectedPlan = jsonData['info']['foodPlan'][jsonData['userStats']['stats']['selectedPlan']];
    var nameOfAbility = jsonData['userStats']['refView'];
    var jsonSubAbility = jsonData['info']['ability'][nameOfAbility];
    var listName = ["firstSkill","secondSkill","thirdSkill"];
    //set title
    document.getElementById("nameOfAbility").innerHTML= "Ability : " + jsonSubAbility['name'];


    //learn menu : 
    //cheap
    document.getElementById("cheapMoney").innerHTML = "Money : "+ (jsonData['info']['learn']['cheap']['money'] +jsonWithSelectedPlan['money']*jsonData['info']['learn']['cheap']['duration'] +14)+"$";
    document.getElementById("cheapMentHealth").innerHTML = "Mental Health : "+ (jsonData['info']['learn']['cheap']['mental'] +jsonWithSelectedPlan['mental']*jsonData['info']['learn']['cheap']['duration']);
    document.getElementById("cheapEnergy").innerHTML = "Energy : "+ (jsonData['info']['learn']['cheap']['energy'] +jsonWithSelectedPlan['energy']*jsonData['info']['learn']['cheap']['duration']);
    document.getElementById("cheapDuration").innerHTML = "Duration : " + jsonData['info']['learn']['cheap']['duration']+" Day";
    //medium
    document.getElementById("mediumMoney").innerHTML = "Money : "+ (jsonData['info']['learn']['medium']['money'] +jsonWithSelectedPlan['money']*jsonData['info']['learn']['medium']['duration'] +14)+"$";
    document.getElementById("mediumMentHealth").innerHTML = "Mental Health : "+ (jsonData['info']['learn']['medium']['mental'] +jsonWithSelectedPlan['mental']*jsonData['info']['learn']['medium']['duration']);
    document.getElementById("mediumEnergy").innerHTML = "Energy : "+ (jsonData['info']['learn']['medium']['energy'] +jsonWithSelectedPlan['energy']*jsonData['info']['learn']['medium']['duration']);
    document.getElementById("mediumDuration").innerHTML = "Duration : " + jsonData['info']['learn']['medium']['duration']+" Day";
    //expensive
    document.getElementById("expensiveMoney").innerHTML = "Money : "+ (jsonData['info']['learn']['expensive']['money'] +jsonWithSelectedPlan['money']*jsonData['info']['learn']['expensive']['duration']+14)+"$";
    document.getElementById("expensiveMentHealth").innerHTML = "Mental Health : "+ (jsonData['info']['learn']['expensive']['mental']+jsonWithSelectedPlan['mental']*jsonData['info']['learn']['expensive']['duration']);
    document.getElementById("expensiveEnergy").innerHTML = "Energy : "+ (jsonData['info']['learn']['expensive']['energy']+jsonWithSelectedPlan['energy']*jsonData['info']['learn']['expensive']['duration']);
    document.getElementById("expensiveDuration").innerHTML = "Duration : " + jsonData['info']['learn']['expensive']['duration']+" Day";
    //hide
    document.getElementById("firstSkill").style.visibility = ("hidden");
    document.getElementById("secondSkill").style.visibility = ("hidden");
    document.getElementById("thirdSkill").style.visibility = ("hidden");
    //activeble skill
    for(var i = 0; i <jsonSubAbility['amountActive']; i++){
        if(jsonData['userStats']['stats']['abilityLvl'][nameOfAbility] >= jsonSubAbility['active'][i]['level']){
            document.getElementById(listName[i]).style.visibility = ("visible");
            document.getElementById(listName[i]+"Explain").innerHTML = jsonSubAbility['active'][i]['name'];
        }
    }
    //passive skill
    var idPassiveToShow = -1;
    if(jsonSubAbility['amountPassive']>0){
        for(var i = 0; i <jsonSubAbility['amountPassive']; i++){
            if(jsonData['userStats']['stats']['abilityLvl'][nameOfAbility] >= jsonSubAbility['passive'][i]['level']){
                idPassiveToShow = i;
            }
        }
        if(idPassiveToShow != -1){
            document.getElementById("passiveParagraph").innerHTML = jsonSubAbility['passive'][idPassiveToShow]['name'];
        }
    }
}

function learnAbility(id){
    var jsonData = loadJSON();
    var categorie = "learn";
    var nameOfAbility = jsonData['userStats']['refView'];
    jsonData["userStats"]["stats"]["abilityLvl"][nameOfAbility]+=1;

    jsonData["userStats"]["recapStats"]["money"] =0;
    jsonData["userStats"]["recapStats"]["hygiene"] =0;
    jsonData["userStats"]["recapStats"]["energy"] =0;
    jsonData["userStats"]["recapStats"]["mental"] =0;
    jsonData["userStats"]["recapStats"]["duration"] =0;

    //const 
    jsonData["userStats"]["stats"]["money"] += 14;
    jsonData["userStats"]["recapStats"]["money"] += 14;
    //stat
    jsonData["userStats"]["stats"]["money"] += jsonData["info"][categorie][id]["money"];
    //jsonData["userStats"]["stats"]["hygiene"] += jsonData["info"][categorie][id]["hygiene"];
    jsonData["userStats"]["stats"]["energy"] += jsonData["info"][categorie][id]["energy"];
    jsonData["userStats"]["stats"]["mental"] += jsonData["info"][categorie][id]["mental"];
    jsonData["userStats"]["stats"]["duration"] += jsonData["info"][categorie][id]["duration"];
    //recap
    jsonData["userStats"]["recapStats"]["money"] += jsonData["info"][categorie][id]["money"];
    //jsonData["userStats"]["recapStats"]["hygiene"] += jsonData["info"][categorie][id]["hygiene"];
    jsonData["userStats"]["recapStats"]["energy"] += jsonData["info"][categorie][id]["energy"];
    jsonData["userStats"]["recapStats"]["mental"] += jsonData["info"][categorie][id]["mental"];
    jsonData["userStats"]["recapStats"]["duration"] += jsonData["info"][categorie][id]["duration"];
    //actionRef
    jsonData["userStats"]["recapStats"]["refAction"] = jsonData["info"][categorie][id]["refAction"];
    //foodPlan
    var food = jsonData['userStats']['stats']['selectedPlan'];
    //stat
    jsonData["userStats"]["stats"]["money"] += jsonData["info"]["foodPlan"][food]["money"]*jsonData["userStats"]["recapStats"]["duration"];
    jsonData["userStats"]["stats"]["hygiene"] += jsonData["info"]["foodPlan"][food]["hygiene"]*jsonData["userStats"]["recapStats"]["duration"];
    jsonData["userStats"]["stats"]["energy"] += jsonData["info"]["foodPlan"][food]["energy"]*jsonData["userStats"]["recapStats"]["duration"];
    jsonData["userStats"]["stats"]["mental"] += jsonData["info"]["foodPlan"][food]["mental"]*jsonData["userStats"]["recapStats"]["duration"];
    //recap
    jsonData["userStats"]["recapStats"]["money"] += jsonData["info"]["foodPlan"][food]["money"]*jsonData["userStats"]["recapStats"]["duration"];
    jsonData["userStats"]["recapStats"]["hygiene"] += jsonData["info"]["foodPlan"][food]["hygiene"]*jsonData["userStats"]["recapStats"]["duration"];
    console.log(jsonData["info"]["foodPlan"][food]["hygiene"]+"/"+jsonData["userStats"]["recapStats"]["duration"]+"/"+jsonData["info"]["foodPlan"][food]["hygiene"]*jsonData["userStats"]["recapStats"]["duration"]);
    jsonData["userStats"]["recapStats"]["energy"] += jsonData["info"]["foodPlan"][food]["energy"]*jsonData["userStats"]["recapStats"]["duration"];
    jsonData["userStats"]["recapStats"]["mental"] += jsonData["info"]["foodPlan"][food]["mental"]*jsonData["userStats"]["recapStats"]["duration"];

    saveJSON(jsonData);
    window.location.href="dayRecapView.html";
}

function useAbility(skillNb){
    var jsonData = loadJSON();
    var nameOfAbility = jsonData['userStats']['refView'];
    var jsonSubAbility = jsonData['info']['ability'][nameOfAbility];

    jsonData["userStats"]["recapStats"]["money"] =0;
    jsonData["userStats"]["recapStats"]["hygiene"] =0;
    jsonData["userStats"]["recapStats"]["energy"] =0;
    jsonData["userStats"]["recapStats"]["mental"] =0;
    jsonData["userStats"]["recapStats"]["duration"] =0;

    //duration
    jsonData["userStats"]["recapStats"]["duration"] =1;
    jsonData["userStats"]["stats"]["duration"] += 1;

    //const 
    jsonData["userStats"]["stats"]["money"] += 14;
    jsonData["userStats"]["recapStats"]["money"] += 14;
    
    //actionRef
    jsonData["userStats"]["recapStats"]["refAction"] = jsonSubAbility["active"][skillNb]["refAction"];
    //foodPlan
    var food = jsonData['userStats']['stats']['selectedPlan'];
    //stat
    jsonData["userStats"]["stats"]["money"] += jsonData["info"]["foodPlan"][food]["money"]*jsonData["userStats"]["recapStats"]["duration"];
    jsonData["userStats"]["stats"]["hygiene"] += jsonData["info"]["foodPlan"][food]["hygiene"]*jsonData["userStats"]["recapStats"]["duration"];
    jsonData["userStats"]["stats"]["energy"] += jsonData["info"]["foodPlan"][food]["energy"]*jsonData["userStats"]["recapStats"]["duration"];
    jsonData["userStats"]["stats"]["mental"] += jsonData["info"]["foodPlan"][food]["mental"]*jsonData["userStats"]["recapStats"]["duration"];
    //recap
    jsonData["userStats"]["recapStats"]["money"] += jsonData["info"]["foodPlan"][food]["money"]*jsonData["userStats"]["recapStats"]["duration"];
    jsonData["userStats"]["recapStats"]["hygiene"] += jsonData["info"]["foodPlan"][food]["hygiene"]*jsonData["userStats"]["recapStats"]["duration"];
    console.log(jsonData["info"]["foodPlan"][food]["hygiene"]+"/"+jsonData["userStats"]["recapStats"]["duration"]+"/"+jsonData["info"]["foodPlan"][food]["hygiene"]*jsonData["userStats"]["recapStats"]["duration"]);
    jsonData["userStats"]["recapStats"]["energy"] += jsonData["info"]["foodPlan"][food]["energy"]*jsonData["userStats"]["recapStats"]["duration"];
    jsonData["userStats"]["recapStats"]["mental"] += jsonData["info"]["foodPlan"][food]["mental"]*jsonData["userStats"]["recapStats"]["duration"];


    
    if(nameOfAbility == "computer" && skillNb == 0){
        jsonData=makeVideo(jsonData);
    }
    else if(nameOfAbility == "computer" && skillNb == 1){
        jsonData=hackPeople(jsonData);
    }
    else if(nameOfAbility == "stealth" && skillNb == 0){
        jsonData=stealPeople(jsonData);
    }

    saveJSON(jsonData);
    window.location.href="dayRecapView.html";
}

function makeVideo(jsonData){
    var moneyMade = 10*jsonData["userStats"]["stats"]["abilityLvl"]["social"];
    moneyMade += moneyMade*(Math.random()-0.5);

    moneyMade = Math.round(moneyMade);

    jsonData["userStats"]["stats"]["money"] += moneyMade;
    jsonData["userStats"]["recapStats"]["money"] += moneyMade;

    return jsonData;
}
function hackPeople(jsonData){
    var moneyMade = 30*jsonData["userStats"]["stats"]["abilityLvl"]["computer"];
    moneyMade += moneyMade*(Math.random()-0.5);

    moneyMade = Math.round(moneyMade);

    jsonData["userStats"]["stats"]["money"] += moneyMade;
    jsonData["userStats"]["recapStats"]["money"] += moneyMade;

    if(gotCaught(jsonData["userStats"]["stats"]["abilityLvl"]["computer"])){
        jsonData["userStats"]["recapStats"]["refAction"] =-7;
    }

    return jsonData;
}
function stealPeople(jsonData){
    var moneyMade = 10*jsonData["userStats"]["stats"]["abilityLvl"]["stealth"];
    moneyMade += moneyMade*(Math.random()-0.5);

    moneyMade = Math.round(moneyMade);

    jsonData["userStats"]["stats"]["money"] += moneyMade;
    jsonData["userStats"]["recapStats"]["money"] += moneyMade;

    if(gotCaught(jsonData["userStats"]["stats"]["abilityLvl"]["stealth"])){
        jsonData["userStats"]["recapStats"]["refAction"] =-6;
    }

    return jsonData;
}

function gotCaught(lvl){
    var caughtUnder=((11 - lvl)*5)/100;
    return(Math.random()<=caughtUnder)
}
