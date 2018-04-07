var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");

var MongoClient = require("mongodb").MongoClient;

var goalsApi = require("./goalsApi");
var tvfeesstats = require("./tvfeesstatsApi");
var transfersApi = require("./transfersApi");

var port = (process.env.PORT || 1607);
//var dbFileName3 = __dirname+"/transferincomes-stats.db";
var mdbURL2 = "mongodb://transfers:sos1718@ds155529.mlab.com:55529/sos1718-mls-sandbox";

//var dbFileName2 = __dirname + "/goals-stats.db";
var mdbURL = "mongodb://goals-stats:12345@ds161148.mlab.com:61148/sos1718-fsr-sandbox";

//var dbFileName = __dirname + "/tvfees-stats.db";
var mdbURL1= "mongodb://db01:db01@ds227459.mlab.com:27459/sos1718-01-tvfees-stats";


var app = express();
app.use("/",express.static(__dirname+"/public"));
app.use(bodyParser.json());

//PABLO
var initialteams = [{
        "city": "barcelona",
        "year": 2015,
        "team": "fc barcelona",
        "capacity": 99354,
        "at-total": 590555,
        "at-average": 73819

    },
    {
        "city": "bilbao",
        "year": 2015,
        "team": "athletic club de bilbao",
        "capacity": 53000,
        "at-total": 334648,
        "at-average": 41831

    },
    {
        "city": "madrid",
        "year": 2015,
        "team": "club atlético de madrid",
        "capacity": 54907,
        "at-total": 366144,
        "at-average": 45768

    },
    {
        "city": "madrid",
        "year": 2015,
        "team": "real madrid cf",
        "capacity": 81044,
        "at-total": 546089,
        "at-average": 68261

    },
    {
        "city": "valencia",
        "year": 2015,
        "team": "valencia cf",
        "capacity": 55000,
        "at-total": 303895,
        "at-average": 37987

    }
];

/*var db = new DataStore({
filename:dbFileName,
 autoload:true
});*/

MongoClient.connect(mdbURL1, { native_parser: true }, (err, mlabs) => {
if (err) {
    console.log("Error acccesing DB" + err);
    process.exit(1);
}

console.log("Connected to DB in mlabs");

var database = mlabs.db("sos1718-01-tvfees-stats");
var db = database.collection("tvfees-stats");



db.find({}, (err, teams) => {
    if (err) {
        console.error("Error accesing DB");
        process.exit(1);
    }
    if (initialteams.length == 0) {
        console.log("Empty DB");
        db.insert(initialteams);

    }
    else {
        console.log("DB has  " + initialteams.length + " teams ");

    }


});

tvfeesstats.register(app,db);
});
/*
db.find({}, (err, teams) => {
    if (err) {
        console.error("Error accesing DB");
        process.exit(1);
    }
    if (initialteams.length == 0) {
        console.log("Empty DB");
        db.insert(initialteams);

    }
    else {
        console.log("DB initialized with " + initialteams.length + " teams ");

    }
tvfeesstats.register(app,db);
*/


//PACO
var initialteams2 = [
        { 
            "city" : "malaga",
            "year" : 2015,
            "team" : "malaga-fc",
            "goalsrightfoot": 20,
            "goalshead" : 7,
            "goalspenalty": 2
        },
        { 
            "city" : "sevilla",
            "year" : 2015,
            "team" : "sevilla-fc",
            "goalsrightfoot": 34,
            "goalshead" : 7,
            "goalspenalty": 6
        },
         { 
            "city" : "sevilla",
            "year" : 2015,
            "team" : "real-betis-balompie",
            "goalsrightfoot": 19,
            "goalshead" : 9,
            "goalspenalty": 3
        },
         { 
            "city" : "bilbao",
            "year" : 2015,
            "team" : "athletic-club-bilbao",
            "goalsrightfoot": 31,
            "goalshead" : 17,
            "goalspenalty": 3
        },
         { 
            "city" : "villareal",
            "year" : 2015,
            "team" : "villareal-cf",
            "goalsrightfoot": 28,
            "goalshead" : 1,
            "goalspenalty": 3
        }
    ];

/*var db2 = new DataStore({
    filename:dbFileName2,
    autoload:true

});*/

MongoClient.connect(mdbURL,{native_parser:true},(err,mlabs) =>{
    if (err){
        console.error("Error accesing DB:" + err);
        process.exit(1);
    }
        console.log("connected to DB in mlabs");
        
        var database = mlabs.db("sos1718-fsr-sandbox");
        var db2 = database.collection("goals-stats");
        
        db2.find({}).toArray((err,teams)=>{
            if(err){
                console.error("Error accesing DB");
                process.exit(1);
             }
            if(teams.length == 0){
                console.log("Empty DB");
                db2.insert(initialteams2);
        
                }else{
                    console.log("DB has " + teams.length  + " teams ");
                }
    
        });
    goalsApi.register(app,db2);
    
});
/*
goalsApi.register(app,db2);

db2.find({},(err,teams)=>{
    if(err){
        console.error("Error accesing DB");
        process.exit(1);
    }
    if(teams.length == 0){
        console.log("Empty DB");
        db2.insert(initialteams2);
        
    }else{
        console.log("DB initialized with " + teams.length  + " teams ");
    }
    
});

*/

//MANU
var myteams = [
    {
        "city": "madrid",
        "year": 2015,
        "team": "real madrid cf",
        "ti-maxexp": 31.5,
        "ti-lessexp": 6,
        "ti-spa": 12    
    },
    {
        "city": "madrid",
        "year": 2015,
        "team": "atletico madrid",
        "ti-maxexp": 35,
        "ti-lessexp": 15,
        "ti-spa": 0
    },
    {
        "city": "vigo",
        "year": 2015,
        "team": "celta de vigo ",
        "ti-maxexp": 10,
        "ti-lessexp": 2,
        "ti-spa": 17.3
    },
    {
        "city": "barcelona",
        "year": 2015,
        "team": "fc barcelona",
        "ti-maxexp": 34,
        "ti-lessexp": 17,
        "ti-spa": 17
    },
    {
        "city": "malaga",
        "year": 2015,
        "team": "malaga cf",
        "ti-maxexp": 3.5,
        "ti-lessexp": 3.5,
        "ti-spa": 0
    },
    {
        "city": "sevilla",
        "year": 2015,
        "team": "sevilla fc",
        "ti-maxexp": 9.75,
        "ti-lessexp": 4,
        "ti-spa": 0   
    }
    ];


    MongoClient.connect(mdbURL2,{native_parser:true},(err,mlabs) =>{
    if (err){
        console.error("Error accesing DB:" + err);
        process.exit(1);
    }
        console.log("connected to DB in mlabs");
        
    var database = mlabs.db("sos1718-mls-sandbox");
    var db3 = database.collection("teams");

    db3.find({}).toArray((err, teams) => {
        if (err) {
            console.error("Error accesing DB");
            process.exit(1);
        }

        if (teams.length == 0) {
            console.log("Empty DB");
            db3.insert(myteams);
        }
        else {
            console.log("DB initialized with " + myteams.length + " teams");
        }
    });

    transfersApi.register(app, db3);
});

app.listen(port, () => {
    console.log("Server ready on port " + port + "!");
}).on("error", (e) => {
    console.log("Server NOT READY:" + e);
});
