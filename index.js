var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");


var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";

var dbFileName = __dirname + "/tvfees_stats.db";

var app = express();

app.use(bodyParser.json());

app.get(BASE_API_PATH + "/help", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/3897700/sos1718-01-tvfees_stats/RVnZfxiX");
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
    if(teams.length == 0){
        console.log("Empty DB");
        db.insert(initialteams);
        
    }else{
        console.log("DB initialized with " + teams.length  + " teams ");
    }
    
});





app.get(BASE_API_PATH + "/tvfees_stats", (req, res) => {
    console.log(Date() + " - GET /tvfees_stats");
    db.find({},(err,teams)=>{
    if(err){
        console.error("Error accesing DB");
        res.sendStatus(500);
    }
    res.send(teams);
});
    
});

app.post(BASE_API_PATH + "/tvfees_stats", (req, res) => {
    console.log(Date() + " - POST /tvfees_stats");
    var team = req.body;
    teams.push(team);
    res.sendStatus(201);
});

app.put(BASE_API_PATH + "/tvfees_stats", (req, res) => {
    console.log(Date() + " - PUT /tvfees_stats");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/tvfees_stats", (req, res) => {
    console.log(Date() + " - DELETE /tvfees_stats");
    teams = [];
    db.remove({});
    res.sendStatus(200);
});


app.get(BASE_API_PATH + "/tvfees_stats/loadInitialData", (req, res) => {
 console.log(Date() + " - GET /tvfees_stats/loadInitialData"+initialteams);
 db.insert(initialteams);
 db.find({},(err,teams)=>{
if(err){
 console.log("Error acccesing DB");
 process.exit(1);
return;
}
res.send(teams);
});

});


app.get(BASE_API_PATH + "/tvfees_stats/:city", (req, res) => {
    var city = req.params.city;
    console.log(Date() + " - GET /tvfees_stats/" + city);

    res.send(teams.filter((t) => {
        return (t.city == city);
    })[0]);
});

app.delete(BASE_API_PATH + "/tvfees_stats/:city", (req, res) => {
    var city = req.params.city;
    console.log(Date() + " - DELETE /tvfees_stats/" + city);

    teams = teams.filter((t) => {
        return (t.city != city);
    });

    res.sendStatus(200);
});

app.post(BASE_API_PATH + "/tvfees_stats/:city", (req, res) => {
    var city = req.params.city;
    console.log(Date() + " - POST /tvfees_stats/" + city);
    res.sendStatus(405);
});

app.put(BASE_API_PATH + "/tvfees_stats/:city", (req, res) => {
    var city = req.params.city;
    var team = req.body;

    console.log(Date() + " - PUT /tvfees_stats/" + city);
    db.update({"city": team.city},team,(err,numUpdated)=>{
        console.log("Updated: " + numUpdated);
        
    });

    if (city != team.city) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }
db.update({"city": team.city},team,(err,numUpdated)=>{
        console.log("Updated: " + numUpdated);
        
    });
    res.sendStatus(200);
});


app.listen(port, () => {
    console.log("Server ready on port " + port + "!");
}).on("error", (e) => {
    console.log("Server NOT READY:" + e);
});

console.log("Server setting up...");
