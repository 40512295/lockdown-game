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