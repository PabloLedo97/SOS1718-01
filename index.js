var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");
var path = require("path");

var MongoClient = require("mongodb").MongoClient;

var goalsApi = require("./goalsApi");

var transfersApi = require("./transfersApi");

var port = (process.env.PORT || 1607);
//var dbFileName3 = __dirname+"/transferincomes-stats.db";
var mdbURL2 = "mongodb://transfers:sos1718@ds155529.mlab.com:55529/sos1718-mls-sandbox";

//var dbFileName2 = __dirname + "/goals-stats.db";
var mdbURL = "mongodb://goals-stats:12345@ds161148.mlab.com:61148/sos1718-fsr-sandbox";

//var dbFileName = __dirname + "/tvfees-stats.db";



var app = express();
app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());


var tvfeesstatsApi = require("./tvfeesstatsApi");



//var dbFileName = __dirname + "/tvfees-stats.db";
var mdbURL1 = "mongodb://db01:db01@ds227459.mlab.com:27459/sos1718-01-tvfees-stats";
//


app.use(bodyParser.json());

//PABLO
var initialteams = [{
        "city": "barcelona",
        "year": 2015,
        "team": "fc-barcelona",
        "capacity": 99354,
        "attotal": 590555,
        "ataverage": 73819

    },
    {
        "city": "bilbao",
        "year": 2015,
        "team": "athletic-club-de-bilbao",
        "capacity": 53000,
        "attotal": 334648,
        "ataverage": 41831

    },
    {
        "city": "madrid",
        "year": 2015,
        "team": "club-atlético-de-madrid",
        "capacity": 54907,
        "attotal": 366144,
        "ataverage": 45768

    },
    {
        "city": "madrid",
        "year": 2015,
        "team": "real-madrid-cf",
        "capacity": 81044,
        "attotal": 546089,
        "ataverage": 68261

    },
    {
        "city": "valencia",
        "year": 2015,
        "team": "valencia-cf",
        "capacity": 55000,
        "attotal": 303895,
        "ataverage": 37987

    }
];

MongoClient.connect(mdbURL1, { native_parser: true }, (err, mlabs) => {
    if (err) {
        console.error("Error accesing DB:" + err);
        process.exit(1);
    }
    console.log("connected to DB in mlabs");

    var database = mlabs.db("sos1718-01-tvfees-stats");
    var db = database.collection("tvfees-stats");

    db.find({}).toArray((err, teams) => {
        if (err) {
            console.error("Error accesing DB");
            process.exit(1);
        }
        if (teams.length == 0) {
            console.log("Empty DB");
            db.insert(initialteams);

        }
        else {
            console.log("DB has " + teams.length + " teams ");
        }

    });
    tvfeesstatsApi.register(app, db);

});
































//PACO
var initialteams2 = [{
        "city": "malaga",
        "year": 2015,
        "team": "malaga-fc",
        "rightfoot": 20,
        "head": 7,
        "penalty": 2
    },
    {
        "city": "sevilla",
        "year": 2015,
        "team": "sevilla-fc",
        "rightfoot": 34,
        "head": 7,
        "penalty": 6
    },
    {
        "city": "sevilla",
        "year": 2015,
        "team": "real-betis-balompie",
        "rightfoot": 19,
        "head": 9,
        "penalty": 3
    },
    {
        "city": "bilbao",
        "year": 2015,
        "team": "athletic-club-bilbao",
        "rightfoot": 31,
        "head": 17,
        "penalty": 3
    },
    {
        "city": "villareal",
        "year": 2015,
        "team": "villareal-cf",
        "rightfoot": 28,
        "head": 1,
        "penalty": 3
    }
];

/*var db2 = new DataStore({
    filename:dbFileName2,
    autoload:true

});*/

MongoClient.connect(mdbURL, { native_parser: true }, (err, mlabs) => {
    if (err) {
        console.error("Error accesing DB:" + err);
        process.exit(1);
    }
    console.log("connected to DB in mlabs");

    var database = mlabs.db("sos1718-fsr-sandbox");
    var db2 = database.collection("goals-stats");

    db2.find({}).toArray((err, teams) => {
        if (err) {
            console.error("Error accesing DB");
            process.exit(1);
        }
        if (teams.length == 0) {
            console.log("Empty DB");
            db2.insert(initialteams2);

        }
        else {
            console.log("DB has " + teams.length + " teams ");
        }

    });
    goalsApi.register(app, db2);

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
var myteams = [{
        "city": "madrid",
        "year": 2015,
        "team": "real madrid cf",
        "timaxexp": 31.5,
        "tilessexp": 6,
        "tispa": 12
    },
    {
        "city": "madrid",
        "year": 2015,
        "team": "atletico madrid",
        "timaxexp": 35,
        "tilessexp": 15,
        "tispa": 0
    },
    {
        "city": "vigo",
        "year": 2015,
        "team": "celta de vigo ",
        "timaxexp": 10,
        "tilessexp": 2,
        "tispa": 17.3
    },
    {
        "city": "barcelona",
        "year": 2015,
        "team": "fc barcelona",
        "timaxexp": 34,
        "tilessexp": 17,
        "tispa": 17
    },
    {
        "city": "malaga",
        "year": 2015,
        "team": "malaga cf",
        "timaxexp": 3.5,
        "tilessexp": 3.5,
        "tispa": 0
    },
    {
        "city": "sevilla",
        "year": 2015,
        "team": "sevilla fc",
        "timaxexp": 9.75,
        "tilessexp": 4,
        "tispa": 0
    }
];


MongoClient.connect(mdbURL2, { native_parser: true }, (err, mlabs) => {
    if (err) {
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
