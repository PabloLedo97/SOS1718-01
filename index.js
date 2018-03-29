var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");
var MongoClient = require("mongodb").MongoClient;

var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";

var goalsApi = require("./goalsApi");

var dbFileName = __dirname + "/tvfees-stats.db";

var dbFileName3 = __dirname+"/transferincomes-stats.db";

var mdbURL = "mongodb://goals-stats:12345@ds161148.mlab.com:61148/sos1718-fsr-sandbox";
var app = express();


app.use(bodyParser.json());

//PABLO
app.get(BASE_API_PATH + "/help", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/3897700/collection/RVnZfxiX");
});
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

    }
];
var db = new DataStore({
    filename:dbFileName,
    autoload:true

});

db.find({},(err,teams)=>{
    if(err){
        console.error("Error accesing DB");
        process.exit(1);
    }
    if(initialteams.length == 0){
        console.log("Empty DB");
        db.insert(initialteams);
        
    }else{
        console.log("DB initialized with " +initialteams.length  + " teams ");
        
    }
    
});





app.get(BASE_API_PATH + "/tvfees-stats", (req, res) => {
    console.log(Date() + " - GET /tvfees-stats");
    db.find({},(err,teams)=>{
    if(err){
        console.error("Error accesing DB");
        res.sendStatus(500);
    }
    res.send(initialteams);
});
    
});

app.post(BASE_API_PATH + "/tvfees-stats", (req, res) => {
    console.log(Date() + " - POST /tvfees-stats");
    var team = req.body;
    initialteams.push(team);
    res.sendStatus(201);
});

app.put(BASE_API_PATH + "/tvfees-stats", (req, res) => {
    console.log(Date() + " - PUT /tvfees-stats");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/tvfees-stats", (req, res) => {
    console.log(Date() + " - DELETE /tvfees-stats");
    initialteams = [];
    db.remove({});
    res.sendStatus(200);
});


app.get(BASE_API_PATH + "/tvfees-stats/loadInitialData", (req, res) => {
 console.log(Date() + " - GET /tvfees-stats/loadInitialData"+initialteams);
 db.insert(initialteams);
 db.find({},(err,teams)=>{
if(err){
 console.log("Error acccesing DB");
 process.exit(1);
return;
}
res.send(initialteams);
});

});


app.get(BASE_API_PATH + "/tvfees-stats/:city", (req, res) => {
    var city = req.params.city;
    console.log(Date() + " - GET /tvfees-stats/" + city);

    res.send(initialteams.filter((t) => {
        return (t.city == city);
    })[0]);
});


app.get(BASE_API_PATH + "/tvfees-stats/:capacity", (req, res) => {
    var capacity = req.params.capacity;
    console.log(Date() + " - GET /tvfees-stats/" + capacity);

    res.send(initialteams.filter((t) => {
        return (t.capacity == capacity);
    })[0]);
});

app.delete(BASE_API_PATH + "/tvfees-stats/:city", (req, res) => {
    var city = req.params.city;
    console.log(Date() + " - DELETE /tvfees-stats/" + city);

    initialteams = initialteams.filter((t) => {
        return (t.city != city);
    });

    res.sendStatus(200);
});

app.post(BASE_API_PATH + "/tvfees-stats/:city", (req, res) => {
    var city = req.params.city;
    console.log(Date() + " - POST /tvfees-stats/" + city);
    res.sendStatus(405);
});

app.put(BASE_API_PATH + "/tvfees-stats/:city", (req, res) => {
    var city = req.params.city;
    var team = req.body;

    console.log(Date() + " - PUT /tvfees-stats/:city" + city);
   

    if (city != team.city) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }
  res.sendStatus(200);
});


//PACO
var initialteams2 = [
        { 
            "city" : "malaga",
            "year" : 2015,
            "team" : "malaga-fc",
            "goals rightfoot": 20,
            "goals head" : 7,
            "goals penalty": 2
        },
        { 
            "city" : "sevilla",
            "year" : 2015,
            "team" : "sevilla-fc",
            "goals rightfoot": 34,
            "goals head" : 7,
            "goals penalty": 6
        },
         { 
            "city" : "sevilla",
            "year" : 2015,
            "team" : "real-betis-balompie",
            "goals rightfoot": 19,
            "goals head" : 9,
            "goals penalty": 3
        },
         { 
            "city" : "bilbao",
            "year" : 2015,
            "team" : "athletic-club-bilbao",
            "goals rightfoot": 31,
            "goals head" : 17,
            "goals penalty": 3
        },
         { 
            "city" : "villareal",
            "year" : 2015,
            "team" : "villareal-cf",
            "goals rightfoot": 28,
            "goals head" : 1,
            "goals penalty": 3
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
    
    
var db3 = new DataStore({
    filename: dbFileName3,
    autoload:true
});

db3.find({},(err, teams)=>{
    if(err){
        console.error("Error accesing DB");
        process.exit(1);
    }
    
    if(teams.length == 0){
        console.log("Empty DB");
        db3.insert(myteams);
    }else{
        console.log("DB initialized with "+ myteams.length +" teams");
    }
});



// GET a la ruta base
app.get(BASE_API_PATH+"/transferincomes-stats",(req,res)=>{
    console.log(Date() + " - GET /transferincomes-stats");
    
    db3.find({},(err, teams)=>{
    if(err){
        console.error("Error accesing DB");
        res.sendStatus(500);
        return;
    }
    
         res.send(myteams);
    });
});

//GET de LoadInitialData
app.get(BASE_API_PATH+"/transferincomes-stats/loadInitialData",(req,res)=>{
    console.log(Date() + " - GET /transferincomes-stats/loadInitialData"+ myteams);
    
    db3.insert(myteams);
    db3.find({},(err, teams)=>{
    if(err){
        console.error("Error accesing DB");
        process.exit(1);
        return;
    }
    if(teams.length == 0){
        console.log("Empty DB");
        db3.insert(myteams)
    }
         res.send(myteams);
    });
});

//POST a la ruta base
app.post(BASE_API_PATH+"/transferincomes-stats",(req,res)=>{
    console.log(Date() + " - POST /transferincomes-stats");
    var team = req.body;
    myteams.push(team);
    res.sendStatus(201);
});

//PUT a la ruta base
app.put(BASE_API_PATH+"/transferincomes-stats",(req,res)=>{
    console.log(Date() + " - PUT /transferincomes-stats");
    res.sendStatus(405);
});

//DELETE a la ruta base
app.delete(BASE_API_PATH+"/transferincomes-stats",(req,res)=>{
    console.log(Date() + " - DELETE /transferincomes-stats");
    myteams = [];
    
    db3.remove({});  
    
    res.sendStatus(200);
});

//GET a un recurso concreto
app.get(BASE_API_PATH+"/transferincomes-stats/:city",(req,res)=>{
    var city = req.params.city;
    console.log(Date() + " - GET /transferincomes-stats/"+city);
    res.send(myteams.filter((c)=>{
        return (c.city == city);
    }));
});

//DELETE a un recurso concreto
app.delete(BASE_API_PATH+"/transferincomes-stats/:city",(req,res)=>{
    var city = req.params.city;
    console.log(Date() + " - DELETE /transferincomes-stats/"+city);
    
    myteams = myteams.filter((c)=>{
        return (c.city != city);
    });
    
    res.sendStatus(200);
});

//POST a un recurso concreto
app.post(BASE_API_PATH+"/transferincomes-stats/:city",(req,res)=>{
    var city = req.params.city;
    console.log(Date() + " - POST /transferincomes-stats/"+city);
    res.sendStatus(405);
});

//PUT a un recurso concreto
app.put(BASE_API_PATH+"/transferincomes-stats/:city",(req,res)=>{
    var city = req.params.city;
    var team = req.body;
    
    console.log(Date() + " - PUT /transferincomes-stats/"+city);

    if(city != team.city){
        res.sendStatus(409);
        console.warn(Date()+" - Hacking attempt!");
        return;
    }
    
    myteams = myteams.map((c)=>{
        if(c.city == team.city)
            return team;
        else
            return c;
    });
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log("Server ready on port " + port + "!");
}).on("error", (e) => {
    console.log("Server NOT READY:" + e);
});

console.log("Server setting up...");
