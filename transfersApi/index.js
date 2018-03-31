var transfersApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = transfersApi;

transfersApi.register = function (app, db3){
    console.log("Registering routes for transfers API...");
    
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
   
    
    app.get(BASE_API_PATH + "/transferincomes-stats/docs",(req,res) => {
    res.redirect(); 
});
    
    //GET de LoadInitialData
app.get(BASE_API_PATH+"/transferincomes-stats/loadInitialData",(req,res)=>{
    console.log(Date() + " - GET /transferincomes-stats/loadInitialData"+ myteams);
    
    //db3.insert(myteams);
    db3.find({}).toArray((err, teams)=>{
    if(err){
        console.error("Error accesing DB");
        process.exit(1);
        return;
    }
    if(teams.length == 0){
        console.log("Empty DB");
        db3.insert(myteams);
    }
         res.send(teams.map((c)=>{
             delete c._id;
             return c;
         }));
    });
});
    
    // GET a la ruta base
app.get(BASE_API_PATH+"/transferincomes-stats",(req,res)=>{
    console.log(Date() + " - GET /transferincomes-stats");
    //res.send(myteams);
    db3.find({}).toArray((err, teams)=>{
    if(err){
        console.error("Error accesing DB");
        res.sendStatus(500);
        return;
    }
    
         res.send(teams.map((c)=>{
             delete c._id;
             return c;
         }));
    });
});



//POST a la ruta base
app.post(BASE_API_PATH+"/transferincomes-stats",(req,res)=>{
    console.log(Date() + " - POST /transferincomes-stats");
    var newteam = req.body;
    if(!newteam){
        console.log("Warning : new GET request");
        res.sendStatus(400);
    }
    db3.find({ "city" : newteam.city}).toArray((err,filteredTeams)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
        }
        if(filteredTeams.length>0){
            console.log("WARNING");
            res.sendStatus(409); //conflict
        }else{
            db3.insert(newteam);
            res.sendStatus(201);
        }
    });
});

//PUT a la ruta base
app.put(BASE_API_PATH+"/transferincomes-stats",(req,res)=>{
    console.log(Date() + " - PUT /transferincomes-stats");
    res.sendStatus(405);
});

//DELETE a la ruta base
app.delete(BASE_API_PATH+"/transferincomes-stats",(req,res)=>{
    console.log(Date() + " - DELETE /transferincomes-stats");
    db3.remove({});  
    res.sendStatus(200);
});

//GET a un recurso concreto
app.get(BASE_API_PATH+"/transferincomes-stats/:city",(req,res)=>{
    var city = req.params.city;
    console.log(Date() + " - GET /transferincomes-stats/"+city);
    if(!city){
        console.log("Warning : new GET request");
        res.sendStatus(400);
    }
    db3.find({ "city" : city}).toArray((err,filteredTeams)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
        }else{
            if(filteredTeams.length>0){
                res.sendStatus(filteredTeams.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }else{
                console.log("WARNING");
                res.sendStatus(404);
            }
        }
        });
    });
    
//GET realizando filtrado
app.get(BASE_API_PATH+"/transferincomes-stats/:city/:team",(req,res)=>{
    var city = req.params.city;
    var team = req.params.team;
    //var year = req.params.year;
    console.log(Date() + " - GET /transferincomes-stats/"+city+ "/" + team);
    if(!city || !team){
        console.log("Warning : new GET request ");
        res.sendStatus(400);
    }
    db3.find({ "city" : city, "team" : team}).toArray((err,filteredTeams)=>{
    if(err){
        console.error("Error accesing DB");
        res.sendStatus(500);
    }else{
        if(filteredTeams.length>0){
            res.send(filteredTeams.map((c)=> {
                delete c._id;
                return c;
            }));
        }else{
            console.log("WARNING");
            res.sendStatus(404);
        }
    }
    });
});
    
//DELETE a un recurso concreto
app.delete(BASE_API_PATH+"/transferincomes-stats/:city",(req,res)=>{
    var city = req.params.city;
    console.log(Date() + " - DELETE /transferincomes-stats/"+city);
    
    db3.remove({"city" : city});
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
    var nombre = req.params.team;
    var team = req.body;
    
    console.log(Date() + " - PUT /transferincomes-stats/"+city);

    if(city != team.city || nombre != team.team){
        res.sendStatus(409);
        console.warn(Date()+" - Hacking attempt!");
        return;
    }
    
    db3.update({"city" : team.city, "team" : team.team},team);
    res.sendStatus(200);
});
};