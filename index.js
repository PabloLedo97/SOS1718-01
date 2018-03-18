var express = require("express");
var bodyParser = require("body-parser");
var  DataStore = require("nedb");

var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";
var dbFileName = __dirname+"/transferincomes_stats.db";

var app = express();

app.use(bodyParser.json());

app.get(BASE_API_PATH+"/help",(req,res)=>{
    res.redirect();
});


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
    
    
var db = new DataStore({
    filename: dbFileName,
    autoload:true
});

db.find({},(err, teams)=>{
    if(err){
        console.error("Error accesing DB");
        process.exit(1);
    }
    
    if(teams.length == 0){
        console.log("Empty DB");
        db.insert(myteams);
    }else{
        console.log("DB initialized with "+ myteams.length +" teams")
    }
});



// GET a la ruta base
app.get(BASE_API_PATH+"/transferincomes_stats",(req,res)=>{
    console.log(Date() + " - GET /transferincomes_stats");
    
    db.find({},(err, teams)=>{
    if(err){
        console.error("Error accesing DB");
        res.sendStatus(500);
        return;
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
    
    db.remove({});  
    
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
    
    db.update({"city": team.city},team,(err,numUpdated)=>{
        console.log("Updated: " +numUpdated);
    });
    
    res.sendStatus(200);
});


app.listen(port,()=>{
    console.log("Server ready on port "+port+"!");
}).on("error",(e)=>{
    console.log("Server NOT READY:"+e);
});

console.log("Server setting up...");

