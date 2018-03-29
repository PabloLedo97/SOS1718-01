var goalsApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = goalsApi;

goalsApi.register = function (app,db2) {
    console.log("Register routes for goals API");
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
    
    app.get(BASE_API_PATH + "/goals-stats/loadInitialData", (req, res) => {
 console.log(Date() + " - GET /tvfees_stats/loadInitialData"+initialteams2);
 //db.insert(initialteams);
 db2.find({}).toArray((err,teams)=>{
    if(err){
        console.log("Error acccesing DB");
        process.exit(1);
        return;
        }
    if(teams.length == 0){
        console.log("Empty DB");
        db2.insert(initialteams2);
    }
    res.send(teams.map((c)=> {
            delete c._id;
            return c;
        }));
});

});

app.get(BASE_API_PATH+"/goals-stats",(req,res)=>{
    //console.log(Date() + " - GET /teams");
    //res.send(initialteams2);
    db2.find({}).toArray((err,teams)=>{
    if(err){
        console.error("Error accesing DB");
        res.sendStatus(500);
        return;
    }
     res.send(teams.map((c)=> {
            delete c._id;
            return c;
        }));
});
});

app.post(BASE_API_PATH+"/goals-stats",(req,res)=>{
    console.log(Date() + " - POST /teams");
    var team = req.body;
    db2.insert(team);
    res.sendStatus(201);
});

app.put(BASE_API_PATH+"/goals-stats",(req,res)=>{
    console.log(Date() + " - PUT /teams");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH+"/goals-stats",(req,res)=>{
    console.log(Date() + " - DELETE /teams");
    db2.remove({});
    res.sendStatus(200);
    
});


app.get(BASE_API_PATH+"/goals-stats/:city",(req,res)=>{
    var city = req.params.city;
    console.log(Date() + " - GET /teams/"+city);
    
    db2.find({ "city" : city}).toArray((err,teams)=>{
    if(err){
        console.error("Error accesing DB");
        res.sendStatus(500);
    }
    res.send(teams.map((c)=> {
            delete c._id;
            return c;
        }));
    });
});

app.delete(BASE_API_PATH+"/goals-stats/:city",(req,res)=>{
    var city = req.params.city;
    console.log(Date() + " - DELETE /teams/"+city);
    
    db2.remove({"city" : city});
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
   
    db2.update({"city" : team.city, "team" : team.team},team);
    res.sendStatus(200);
});
};