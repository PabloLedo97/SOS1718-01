var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");


var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";

var dbFileName = __dirname + "/tvfees_stats.db";
var dbFileName2 = __dirname + "/goals-stats.db";
var dbFileName3 = __dirname+"/transferincomes_stats.db";
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





app.get(BASE_API_PATH + "/tvfees_stats", (req, res) => {
    console.log(Date() + " - GET /tvfees_stats");
    db.find({},(err,teams)=>{
    if(err){
        console.error("Error accesing DB");
        res.sendStatus(500);
    }
    res.send(initialteams);
});
    
});

app.post(BASE_API_PATH + "/tvfees_stats", (req, res) => {
    console.log(Date() + " - POST /tvfees_stats");
    var team = req.body;
    initialteams.push(team);
    res.sendStatus(201);
});

app.put(BASE_API_PATH + "/tvfees_stats", (req, res) => {
    console.log(Date() + " - PUT /tvfees_stats");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/tvfees_stats", (req, res) => {
    console.log(Date() + " - DELETE /tvfees_stats");
    initialteams = [];
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
res.send(initialteams);
});

});


app.get(BASE_API_PATH + "/tvfees_stats/:city", (req, res) => {
    var city = req.params.city;
    console.log(Date() + " - GET /tvfees_stats/" + city);

    res.send(initialteams.filter((t) => {
        return (t.city == city);
    })[0]);
});


app.get(BASE_API_PATH + "/tvfees_stats/:capacity", (req, res) => {
    var capacity = req.params.capacity;
    console.log(Date() + " - GET /tvfees_stats/" + capacity);

    res.send(initialteams.filter((t) => {
        return (t.capacity == capacity);
    })[0]);
});

app.delete(BASE_API_PATH + "/tvfees_stats/:city", (req, res) => {
    var city = req.params.city;
    console.log(Date() + " - DELETE /tvfees_stats/" + city);

    initialteams = initialteams.filter((t) => {
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

    console.log(Date() + " - PUT /tvfees_stats/:city" + city);
   

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


//PACO
var initialteams2 = [
        { 
            "city" : "malaga",
            "year" : 2015,
            "team" : "malaga fc",
            "goals rightfoot": 20,
            "goals head" : 7,
            "goals penalty": 2
        },
        { 
            "city" : "sevilla",
            "year" : 2015,
            "team" : "sevilla",
            "goals rightfoot": 34,
            "goals head" : 7,
            "goals penalty": 6
        }
    ];

var db2 = new DataStore({
    filename:dbFileName2,
    autoload:true

});

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

app.get(BASE_API_PATH + "/goals-stats/loadInitialData", (req, res) => {
 console.log(Date() + " - GET /tvfees_stats/loadInitialData"+initialteams2);
 //db.insert(initialteams);
 db.find({},(err,teams)=>{
if(err){
 console.log("Error acccesing DB");
 process.exit(1);
return;
}
if(teams.length == 0){
        console.log("Empty DB");
        db.insert(initialteams2);
}
res.send(teams);
});

});

app.get(BASE_API_PATH+"/goals-stats",(req,res)=>{
    console.log(Date() + " - GET /teams");
    res.send(initialteams2);
    /*db.find({},(err,teams)=>{
    if(err){
        console.error("Error accesing DB");
        res.sendStatus(500);
    }
    res.send(teams);
});*/
});

app.post(BASE_API_PATH+"/goals-stats",(req,res)=>{
    console.log(Date() + " - POST /teams");
    var team = req.body;
    initialteams2.push(team);
    res.sendStatus(201);
});

app.put(BASE_API_PATH+"/goals-stats",(req,res)=>{
    console.log(Date() + " - PUT /teams");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH+"/goals-stats/",(req,res)=>{
    console.log(Date() + " - DELETE /teams");
    initialteams2 = [];
    res.sendStatus(200);
    initialteams2 = [];
    /*db.remove({});
    res.sendStatus(200);*/
});


app.get(BASE_API_PATH+"/goals-stats/:city",(req,res)=>{
    var city = req.params.city;
    console.log(Date() + " - GET /teams/"+city);
    
    res.send(initialteams2.filter((c)=>{
        return (c.city == city);
    }));
});

app.delete(BASE_API_PATH+"/goals-stats/:city",(req,res)=>{
    var city = req.params.city;
    console.log(Date() + " - DELETE /teams/"+city);
    
    initialteams2 = initialteams2.filter((c)=>{
        return (c.city != city);
    });
    
    res.sendStatus(200);
});

app.post(BASE_API_PATH+"/goals-stats/:city/",(req,res)=>{
    var city = req.params.city;
    console.log(Date() + " - POST /teams/"+city);
    res.sendStatus(405);
});

app.put(BASE_API_PATH+"/goals-stats/:city/:team",(req,res)=>{
    var city = req.params.city;
    var nombre = req.params.team;
    var team = req.body;
    
    console.log(Date() + " - PUT /teams/"+city);
    
    if(city != team.city || nombre != team.team){
        res.sendStatus(409);
        console.warn(Date()+" - Hacking attempt!");
        return;
    }
    
    initialteams2 = initialteams2.map((c)=>{
        if(c.city == team.city && c.team == team.team)
            return team;
        else
            return c;
    });
    
    res.sendStatus(200);
});


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
app.get(BASE_API_PATH+"/transferincomes_stats",(req,res)=>{
    console.log(Date() + " - GET /transferincomes_stats");
    
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
app.get(BASE_API_PATH+"/transferincomes_stats/loadInitialData",(req,res)=>{
    console.log(Date() + " - GET /transferincomes_stats/loadInitialData"+ myteams);
    
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
app.post(BASE_API_PATH+"/transferincomes_stats",(req,res)=>{
    console.log(Date() + " - POST /transferincomes_stats");
    var team = req.body;
    myteams.push(team);
    res.sendStatus(201);
});

//PUT a la ruta base
app.put(BASE_API_PATH+"/transferincomes_stats",(req,res)=>{
    console.log(Date() + " - PUT /transferincomes_stats");
    res.sendStatus(405);
});

//DELETE a la ruta base
app.delete(BASE_API_PATH+"/transferincomes_stats",(req,res)=>{
    console.log(Date() + " - DELETE /transferincomes_stats");
    myteams = [];
    
    db3.remove({});  
    
    res.sendStatus(200);
});

//GET a un recurso concreto
app.get(BASE_API_PATH+"/transferincomes_stats/:city",(req,res)=>{
    var city = req.params.city;
    console.log(Date() + " - GET /transferincomes_stats/"+city);
    res.send(myteams.filter((c)=>{
        return (c.city == city);
    }));
});

//DELETE a un recurso concreto
app.delete(BASE_API_PATH+"/transferincomes_stats/:city",(req,res)=>{
    var city = req.params.city;
    console.log(Date() + " - DELETE /transferincomes_stats/"+city);
    
    myteams = myteams.filter((c)=>{
        return (c.city != city);
    });
    
    res.sendStatus(200);
});

//POST a un recurso concreto
app.post(BASE_API_PATH+"/transferincomes_stats/:city",(req,res)=>{
    var city = req.params.city;
    console.log(Date() + " - POST /transferincomes_stats/"+city);
    res.sendStatus(405);
});

//PUT a un recurso concreto
app.put(BASE_API_PATH+"/transferincomes_stats/:city",(req,res)=>{
    var city = req.params.city;
    var team = req.body;
    
    console.log(Date() + " - PUT /transferincomes_stats/"+city);

    if(city != team.city){
        res.sendStatus(409);
        console.warn(Date()+" - Hacking attempt!");
        return;
    }
    
    db3.update({"city": team.city},team,(err,numUpdated)=>{
        console.log("Updated: " +numUpdated);
    });
    
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log("Server ready on port " + port + "!");
}).on("error", (e) => {
    console.log("Server NOT READY:" + e);
});

console.log("Server setting up...");
