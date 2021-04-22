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
    checkPassiveActivated();
    var jsonData = loadJSON();
    var jsonWithSelectedPlan = jsonData['info']['foodPlan'][jsonData['userStats']['stats']['selectedPlan']];
    //goOut
    document.getElementById("goOutMoney").innerHTML = "Money : "+ (jsonData['info']['basic']['outside']['money'] +jsonWithSelectedPlan['money'] +14) +"$";
    document.getElementById("goOutMentHealth").innerHTML = "Mental Health : "+ (jsonData['info']['basic']['outside']['mental']+jsonWithSelectedPlan['mental']);
    document.getElementById("goOutHygiene").innerHTML = "Hygiene : "+ (jsonData['info']['basic']['outside']['hygiene']+jsonWithSelectedPlan['hygiene']);
    document.getElementById("goOutEnergy").innerHTML = "Energy : "+ (jsonData['info']['basic']['outside']['energy']+jsonWithSelectedPlan['energy']);
    //workout
    document.getElementById("workMoney").innerHTML = "Money : "+ (jsonData['info']['basic']['workout']['money']+jsonWithSelectedPlan['money']+14) +"$";
    document.getElementById("workMentHealth").innerHTML = "Mental Health : "+ (jsonData['info']['basic']['workout']['mental']+jsonWithSelectedPlan['mental']);
    document.getElementById("workHygiene").innerHTML = "Hygiene : "+ (jsonData['info']['basic']['workout']['hygiene']+jsonWithSelectedPlan['hygiene']);
    document.getElementById("workEnergy").innerHTML = "Energy : "+ (jsonData['info']['basic']['workout']['energy']+jsonWithSelectedPlan['energy']);
    //shower
    document.getElementById("showerMoney").innerHTML = "Money : "+ (jsonData['info']['basic']['shower']['money']+jsonWithSelectedPlan['money']+14) +"$";
    document.getElementById("showerMentHealth").innerHTML = "Mental Health : "+ (jsonData['info']['basic']['shower']['mental']+jsonWithSelectedPlan['mental']);
    document.getElementById("showerHygiene").innerHTML = "Hygiene : "+ (jsonData['info']['basic']['shower']['hygiene']+jsonWithSelectedPlan['hygiene']);
    document.getElementById("showerEnergy").innerHTML = "Energy : "+ (jsonData['info']['basic']['shower']['energy']+jsonWithSelectedPlan['energy']);
    //TV
    document.getElementById("watchMoney").innerHTML = "Money : "+(jsonData['info']['basic']['watch']['money']+jsonWithSelectedPlan['money']+14) +"$";
    document.getElementById("watchMentHealth").innerHTML = "Mental Health : "+ (jsonData['info']['basic']['watch']['mental']+jsonWithSelectedPlan['mental']);
    document.getElementById("watchHygiene").innerHTML = "Hygiene : "+ (jsonData['info']['basic']['watch']['hygiene']+jsonWithSelectedPlan['hygiene']);
    document.getElementById("watchEnergy").innerHTML = "Energy : "+ (jsonData['info']['basic']['watch']['energy']+jsonWithSelectedPlan['energy']);
    //Date
    document.getElementById("date").innerHTML = "Day number : "+ jsonData['userStats']['stats']['duration'];
    //Money 
    document.getElementById("amountMoneyTotal").innerHTML = "Total : "+ jsonData['userStats']['stats']['money'] +"$";
    //resetColorFoodPlan
    document.getElementById("foodPlanCheap").style.backgroundColor = "#087ca7";
    document.getElementById("foodPlanMedium").style.backgroundColor = "#087ca7";
    document.getElementById("foodPlanExpensive").style.backgroundColor = "#087ca7";

    switch(jsonData['userStats']['stats']['selectedPlan']){
        case "cheap":
            //highlight
            document.getElementById("foodPlanCheap").style.backgroundColor = "yellow";
            //Title 
            document.getElementById("foodPlanTitle").innerHTML = "Cheap";
            //stat
            document.getElementById("foodPlanMoney").innerHTML = "Money : "+ jsonData['info']['foodPlan']['cheap']['money'] +"$";
            document.getElementById("foodPlanMental").innerHTML = "Mental Health : "+ jsonData['info']['foodPlan']['cheap']['mental'];
            document.getElementById("foodPlanHygiene").innerHTML = "Hygiene : "+ jsonData['info']['foodPlan']['cheap']['hygiene'];
            document.getElementById("foodPlanEnergy").innerHTML = "Energy : "+ jsonData['info']['foodPlan']['cheap']['energy'];       
        break;
        case "medium":
            //highlight
            document.getElementById("foodPlanMedium").style.backgroundColor = "yellow";
            //Title 
            document.getElementById("foodPlanTitle").innerHTML = "Medium";
            //stat
            document.getElementById("foodPlanMoney").innerHTML = "Money : "+ jsonData['info']['foodPlan']['medium']['money'] +"$";
            document.getElementById("foodPlanMental").innerHTML = "Mental Health : "+ jsonData['info']['foodPlan']['medium']['mental'];
            document.getElementById("foodPlanHygiene").innerHTML = "Hygiene : "+ jsonData['info']['foodPlan']['medium']['hygiene'];
            document.getElementById("foodPlanEnergy").innerHTML = "Energy : "+ jsonData['info']['foodPlan']['medium']['energy']; 
        break;
        case "expensive":
            //highlight
            document.getElementById("foodPlanExpensive").style.backgroundColor = "yellow";
            //Title 
            document.getElementById("foodPlanTitle").innerHTML = "Expensive";
            //stat
            document.getElementById("foodPlanMoney").innerHTML = "Money : "+ jsonData['info']['foodPlan']['expensive']['money'] +"$";
            document.getElementById("foodPlanMental").innerHTML = "Mental Health : "+ jsonData['info']['foodPlan']['expensive']['mental'];
            document.getElementById("foodPlanHygiene").innerHTML = "Hygiene : "+ jsonData['info']['foodPlan']['expensive']['hygiene'];
            document.getElementById("foodPlanEnergy").innerHTML = "Energy : "+ jsonData['info']['foodPlan']['expensive']['energy'];
        break;
        default:
            console.log("Error : loadDataBeginning->switch : outside value");

    }

    if(jsonData["userStats"]["stats"]["hygiene"] > 100){
        jsonData["userStats"]["stats"]["hygiene"]=100;
    }
    if(jsonData["userStats"]["stats"]["energy"] > 100){
        jsonData["userStats"]["stats"]["energy"]=100;
    }
    if(jsonData["userStats"]["stats"]["mental"] > 100){
        jsonData["userStats"]["stats"]["mental"]=100;
    }

    drawPieChart("hygieneChart","Hygiene", getHygiene(),"yellow");
    drawPieChart("mentalChart","Mental Health", getMental(),"blue");
    drawPieChart("energieChart","Energy", getEnergy(),"red"); 
    
    move(checkPourcent(10*jsonData["userStats"]["stats"]["abilityLvl"]["social"]),"socialBar");
    move(checkPourcent(10*jsonData["userStats"]["stats"]["abilityLvl"]["computer"]),"computerBar");
    move(checkPourcent(10*jsonData["userStats"]["stats"]["abilityLvl"]["taichi"]),"taichiBar");
    move(checkPourcent(10*jsonData["userStats"]["stats"]["abilityLvl"]["stealth"]),"stealthBar");
    move(checkPourcent(10*jsonData["userStats"]["stats"]["abilityLvl"]["worker"]),"workerBar");



}

function onFoodPlanChange(idPlan){
    var jsonData = loadJSON();
    switch(idPlan){
        case  "foodPlanCheap":
            jsonData['userStats']['stats']['selectedPlan'] = "cheap";
        break;
        
        case  "foodPlanMedium":
            jsonData['userStats']['stats']['selectedPlan'] = "medium";
        break;

        case  "foodPlanExpensive":
            jsonData['userStats']['stats']['selectedPlan'] = "expensive";
        break;
        default:
            console.log("Error : onFoodPlanChange->switch : outside value");
    }
    saveJSON(jsonData);
    loadDataBeginning();
}

function checkPassiveActivated(){
    var jsonData = loadJSON();
    
    if(!jsonData['userStats']['passiveAvtivated']['taichi_1']){//not activated
        if(jsonData['userStats']['stats']['abilityLvl']['taichi']>=jsonData['info']['ability']['taichi']['passive'][0]['level']){
            jsonData['userStats']['passiveAvtivated']['taichi_1'] = true;
            searchAndReplaceStatJson(jsonData['info'],"mental",0.67);
            searchAndReplaceStatJson(jsonData['info'],"hygiene",0.67);
        }

    }
    if(!jsonData['userStats']['passiveAvtivated']['taichi_2']){//not activated
        if(jsonData['userStats']['stats']['abilityLvl']['taichi']>=jsonData['info']['ability']['taichi']['passive'][1]['level']){
            jsonData['userStats']['passiveAvtivated']['taichi_2'] = true;
            searchAndReplaceStatJson(jsonData['info'],"mental",0.34328358);
            searchAndReplaceStatJson(jsonData['info'],"hygiene",0.34328358);
        }

    }

    if(!jsonData['userStats']['passiveAvtivated']['worker_1']){//not activated
        if(jsonData['userStats']['stats']['abilityLvl']['worker']>=jsonData['info']['ability']['worker']['passive'][0]['level']){
            jsonData['userStats']['passiveAvtivated']['worker_1'] = true;
            searchAndReplaceStatJson(jsonData['info'],"money",0.67);
        }

    }

    if(!jsonData['userStats']['passiveAvtivated']['worker_2']){//not activated
        if(jsonData['userStats']['stats']['abilityLvl']['worker']>=jsonData['info']['ability']['worker']['passive'][1]['level']){
            jsonData['userStats']['passiveAvtivated']['worker_2'] = true;
            searchAndReplaceStatJson(jsonData['info'],"money",0.34328358);
        }

    }
    saveJSON(jsonData);
}

function searchAndReplaceStatJson(jsonData,name, pourcentChange){
    for(var key in jsonData){
        console.log(key)
        var jsonSub = jsonData[key];
        if(key!="ability"){
            for(var key2 in jsonSub){
                //console.log(key2)
                var jsonSubSub = jsonSub[key2];
                if(jsonSubSub[name] < 0){
                    jsonSubSub[name] = Math.round(jsonSubSub[name]*pourcentChange);
                }
            }
        }
    }
}

function basicActivity(id){
    var jsonData = loadJSON();
    jsonData["userStats"]["recapStats"]["money"] =0;
    jsonData["userStats"]["recapStats"]["hygiene"] =0;
    jsonData["userStats"]["recapStats"]["energy"] =0;
    jsonData["userStats"]["recapStats"]["mental"] =0;
    jsonData["userStats"]["recapStats"]["duration"] =0;

    //const 
    jsonData["userStats"]["stats"]["money"] += 14;
    jsonData["userStats"]["recapStats"]["money"] += 14;
    //stat
    jsonData["userStats"]["stats"]["money"] += jsonData["info"]["basic"][id]["money"];
    jsonData["userStats"]["stats"]["hygiene"] += jsonData["info"]["basic"][id]["hygiene"];
    jsonData["userStats"]["stats"]["energy"] += jsonData["info"]["basic"][id]["energy"];
    jsonData["userStats"]["stats"]["mental"] += jsonData["info"]["basic"][id]["mental"];
    jsonData["userStats"]["stats"]["duration"] += jsonData["info"]["basic"][id]["duration"];
    //recap
    jsonData["userStats"]["recapStats"]["money"] += jsonData["info"]["basic"][id]["money"];
    jsonData["userStats"]["recapStats"]["hygiene"] += jsonData["info"]["basic"][id]["hygiene"];
    jsonData["userStats"]["recapStats"]["energy"] += jsonData["info"]["basic"][id]["energy"];
    jsonData["userStats"]["recapStats"]["mental"] += jsonData["info"]["basic"][id]["mental"];
    jsonData["userStats"]["recapStats"]["duration"] += jsonData["info"]["basic"][id]["duration"];
    //actionRef
    jsonData["userStats"]["recapStats"]["refAction"] = jsonData["info"]["basic"][id]["refAction"];
    //foodPlan
    var food = jsonData["userStats"]["stats"]["selectedPlan"];
    console.log(food);
    //stat
    jsonData["userStats"]["stats"]["money"] += jsonData["info"]["foodPlan"][food]["money"];
    jsonData["userStats"]["stats"]["hygiene"] += jsonData["info"]["foodPlan"][food]["hygiene"];
    jsonData["userStats"]["stats"]["energy"] += jsonData["info"]["foodPlan"][food]["energy"];
    jsonData["userStats"]["stats"]["mental"] += jsonData["info"]["foodPlan"][food]["mental"];
    //recap
    jsonData["userStats"]["recapStats"]["money"] += jsonData["info"]["foodPlan"][food]["money"];
    jsonData["userStats"]["recapStats"]["hygiene"] += jsonData["info"]["foodPlan"][food]["hygiene"];
    jsonData["userStats"]["recapStats"]["energy"] += jsonData["info"]["foodPlan"][food]["energy"];
    jsonData["userStats"]["recapStats"]["mental"] += jsonData["info"]["foodPlan"][food]["mental"];

    if(jsonData["userStats"]["stats"]["hygiene"] > 100){
        jsonData["userStats"]["stats"]["hygiene"]=100;
    }
    if(jsonData["userStats"]["stats"]["energy"] > 100){
        jsonData["userStats"]["stats"]["energy"]=100;
    }
    if(jsonData["userStats"]["stats"]["mental"] > 100){
        jsonData["userStats"]["stats"]["mental"]=100;
    }
    
    
    if(id=="outside"){
        jsonData = checkNotCaught(jsonData);
    }
    saveJSON(jsonData);
    window.location.href="./dayRecapView.html";
}
function checkNotCaught(jsonData){
    var caughtUnder=((11 - jsonData["userStats"]["stats"]["abilityLvl"]["stealth"])*5)/100;
    if(Math.random()<=caughtUnder){
        jsonData["userStats"]["recapStats"]["refAction"] = -8;
    }
    return jsonData;
}


function gotoAbilityView(key){
    var jsonData = loadJSON();
    jsonData['userStats']['refView']=key;
    saveJSON(jsonData);
    window.location.href="abilityView.html";
}
function getMoney(){
    return loadJSON()["userStats"]["stats"]["money"] ;
}
function getMental(){
    return loadJSON()["userStats"]["stats"]["mental"] ;
}
function getHygiene(){
    return loadJSON()["userStats"]["stats"]["hygiene"] ;
}
function getEnergy(){
    return loadJSON()["userStats"]["stats"]["energy"] ;
}

function drawPieChart(id,name,pourcentChange,couleur){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Pac Man', 'Percentage'],
          ['', checkPourcent(pourcentChange)],
          ['', checkPourcent(100-pourcentChange)]
        ]);

        var options = {
          legend: 'none',
          pieSliceText: 'none',
          backgroundColor: 'black',
          pieStartAngle: 0,
          tooltip: { trigger: 'none' },
          slices: {
            0: { color: couleur },
            1: { color: 'transparent' }
          }
        };

        var chart = new google.visualization.PieChart(document.getElementById(id));
        chart.draw(data, options);
      }
}

function checkPourcent(int){
    if(int>100){
        return 100;
    }
    else if(int<0){
        return 0;
    }
    else{
        return int;
    }
}


function move(max,barName) { //https://www.w3schools.com/howto/howto_js_progressbar.asp
    var i = 0;
    if (i == 0) {
        i = 1;
        var elem = document.getElementById(barName);
        var width = 1;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= max) {
                clearInterval(id);
                i = 0;
            } else {
                width++;
                elem.style.width = width + "%";
            }
        }
    }
}
