function createJsonCache(){
    document.getElementById("button").style.visibility = "hidden"; 
    var file = {
        "userStats":{
            "stats":{
                "money":1000,
                "hygiene":100,
                "energy":100,
                "mental":100,
                "duration":0,
                "selectedPlan":"cheap",
                "abilityLvl":{
                    "social":0,
                    "computer":0,
                    "taichi":0,
                    "stealth":0,
                    "worker":0
                }
            },
            "recapStats":{
                "money":100,
                "hygiene":100,
                "energy":100,
                "mental":100,
                "duration":0,
                "refAction":0
            },
            "passiveAvtivated":{
                "taichi_1":false,
                "taichi_2":false,
                "stealth_1":false,
                "worker_1":false,
                "worker_2":false
            },
            "refView":"none"
        },
        "info":{
            "basic":{
                "workout":{
                    "money":-50,
                    "hygiene":-10,
                    "energy":-50,
                    "mental":100,
                    "duration":1,
                    "refAction":0
                },
                "shower":{
                    "money":-40,
                    "hygiene":100,
                    "energy":15,
                    "mental":0,
                    "duration":1,
                    "refAction":1
                },
                "watch":{
                    "money":0,
                    "hygiene":0,
                    "energy":0,
                    "mental":0,
                    "duration":1,
                    "refAction":2
                },
                "outside":{
                    "money":0,
                    "hygiene":-10,
                    "energy":-25,
                    "mental":100,
                    "duration":1,
                    "refAction":3
                }
            },
            "ability":{
                "social":{
                    "name":"Social Interaction",
                    "amountActive":1,
                    "active":[
                        {
                            "name":"Make a coup",
                            "level":10,
                            "refAction":4
                        }
                    ],
                    "amountPassive":0
                },
                "computer":{
                    "name":"Computer Science",
                    "amountActive":3,
                    "active":[
                        {
                            "name":"Make video and earn money depending on Social interaction",
                            "level":3,
                            "refAction":5
                        },
                        {
                            "name":"Hack people and steal from them",
                            "level":6,
                            "refAction":6
                        },
                        {
                            "name":"Hack government and learn the truth of the virus",
                            "level":10,
                            "refAction":7
                        }
                    ],
                    "amountPassive":0
                },
                "taichi":{
                    "name":"Tai Chi",
                    "amountActive":1,
                    "active":[
                        {
                            "name":"Unlock Tai Chi's power and destroy the virus",
                            "level":10,
                            "refAction":8
                        }
                    ],
                    "amountPassive":2,
                    "passive":[
                        {
                            "level":4,
                            "name":"cost of mental health and hygiene reduce by 33%",
                            "refName":"taichi_1"
                        },
                        {
                            "level":7,
                            "name":"cost of mental health and hygiene reduce by 77%",
                            "refName":"taichi_2"
                        }
                    ]
                },
                "stealth":{
                    "name":"Stealth",
                    "amountActive":2,
                    "active":[
                        {
                            "level":4,
                            "name":"Steal from your neighbours",
                            "refAction":9
                        },
                        {
                            "level":10,
                            "name":"Leave the country",
                            "refAction":10
                        }
                    ],
                    "amountPassive":1,
                    "passive":[
                        {
                            "level":1,
                            "name":"chances of being caught stealing or going outside are decreased",
                            "refName":"stealth_1"
                        }
                    ]
                },
                "worker":{
                    "name":"Worker",
                    "amountActive":1,
                    "active":[
                        {
                            "level":10,
                            "name":"You find a treatment against the virus",
                            "refAction":11
                        }
                    ],
                    "amountPassive":2,
                    "passive":[
                        {
                            "level":4,
                            "name":"Cost of learning an ability is reduce by 33%",
                            "refName":"worker_1"
                        },
                        {
                            "level":7,
                            "name":"Cost of learning an ability is reduce by 77%",
                            "refName":"worker_2"
                        }
                    ]
                }
            },
            "learn":{
                "cheap":{
                    "money":-50,
                    "hygiene":0,
                    "energy":-30,
                    "mental":-20,
                    "duration":1,
                    "refAction":12
                },
                "medium":{
                    "money":-150,
                    "hygiene":0,
                    "energy":-20,
                    "mental":0,
                    "duration":3,
                    "refAction":13
                },
                "expensive":{
                    "money":-250,
                    "hygiene":0,
                    "energy":-10,
                    "mental":40,
                    "duration":6,
                    "refAction":14
                }
            },
            "foodPlan":{
                "cheap":{
                    "money":-12,
                    "hygiene":-10,
                    "energy":4,
                    "mental":-11
                },
                "medium":{
                    "money":-16,
                    "hygiene":-2,
                    "energy":10,
                    "mental":-5
                },
                "expensive":{         
                    "money":-25,
                    "hygiene":4,
                    "energy":12,
                    "mental":-1
                }
            }
        }
    };
    var awardFile = {
        "social":false,
        "computer":false,
        "taichi":false,
        "stealth":false,
        "worker":false,
        "endLockdown":false
    }; 
    var fileString = JSON.stringify(file);
    var awardfileString = JSON.stringify(awardFile);
    localStorage.setItem('cookieLOCKDOWNGAME',fileString);
    var cookieAward = localStorage.getItem('awardLOCKDOWNGAME');
    if(cookieAward==null){
        console.log("non existant");
        localStorage.setItem('awardLOCKDOWNGAME',awardfileString);
    }
    else{
        var jsonAward=JSON.parse(localStorage.getItem('awardLOCKDOWNGAME'));
        console.log(jsonAward);
        if(jsonAward["social"]==true){
            document.getElementById("award-social").src="./image/award-social.png";
        }
        if(jsonAward["computer"]==true){
            document.getElementById("award-computer").src="./image/award-computer.png";
        }
        if(jsonAward["taichi"]==true){
            document.getElementById("award-taichi").src="./image/award-taichi.png";
        }
        if(jsonAward["stealth"]==true){
            document.getElementById("award-stealth").src="./image/award-stealth.png";
        }
        if(jsonAward["worker"]==true){
            document.getElementById("award-worker").src="./image/award-worker.png";
        }
        if(jsonAward["endLockdown"]==true){
            document.getElementById("award-worker").src="./image/award-end.png";
        }
    }
    document.getElementById("button").style.visibility = "visible";
    
    
}
