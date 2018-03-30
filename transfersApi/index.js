var transfersApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = transfersApi;

transfersApi.register = function (app, db3){
    console.log("Registering routes for transfers API");
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
}