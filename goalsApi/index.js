var goalsApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = goalsApi;

goalsApi.register = function (app,db2) {
    console.log("Register routes for goals API");
    
    var insertar = function(elementos, array, limit, offset) {
        var i = offset;
        var j = limit;
        while (j > 0) {
            array.push(elementos[i]);
            j--;
            i++;
        }
        return elementos;
    };
    
    var initialteams2 = [
        { 
            "city" : "malaga",
            "year" : 2015,
            "team" : "malaga-fc",
            "rightfoot": 20,
            "head" : 7,
            "penalty": 2
        },
        { 
            "city" : "sevilla",
            "year" : 2015,
            "team" : "sevilla-fc",
            "rightfoot": 34,
            "head" : 7,
            "penalty": 6
        },
         { 
            "city" : "sevilla",
            "year" : 2015,
            "team" : "real-betis-balompie",
            "rightfoot": 19,
            "head" : 9,
            "penalty": 3
        },
         { 
            "city" : "bilbao",
            "year" : 2015,
            "team" : "athletic-club-bilbao",
            "rightfoot": 31,
            "head" : 17,
            "penalty": 3
        },
         { 
            "city" : "villareal",
            "year" : 2015,
            "team" : "villareal-cf",
            "rightfoot": 28,
            "head" : 1,
            "penalty": 3
        }
    ];
    
    app.get(BASE_API_PATH + "/goals-stats/docs",(req,res) => {
    res.redirect("https://documenter.getpostman.com/view/3935248/RVu1Gqez");
});
    
    app.get(BASE_API_PATH + "/goals-stats/loadInitialData", (req, res) => {
 console.log(Date() + " - GET /goals-stats/loadInitialData"+initialteams2);
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
    var newteam = req.body;
     if(!newteam.city || !newteam.year || !newteam.team || !newteam.rightfoot || !newteam.head || !newteam.penalty || !Object.keys(newteam).length != 6){
        console.log("Warning : new GET request ");
        res.sendStatus(400);
    } 
   
    
      /* var url = req.query;
        var city = url.city;
        var year = url.year;
        var goalsrightfoot = url["goals rightfoot"];
        var goalshead = url["goals head"];
        var goalspenalty = url["goals penalty"];

        //variables de paginación
        var limit = parseInt(url.limit);
        var offset = parseInt(url.offset);
        var elementos = [];


        if (limit > 0 && offset >= 0){
            console.log("INFO: New GET request to /builders");
            db2.find({}).skip(offset).limit(limit).toArray((err, teams) => {
                if (err){
                    console.error("WARNING: Error getting data from DB");
                    res.sendStatus(500); //Internal server error
                }else{
                    var filtered = teams.filter((param) => {
                        if ((city == undefined || param.city == city) && (year == undefined || param.year == year) && 
                        (goalsrightfoot == undefined || param["goals rightfoot"] == goalsrightfoot) 
                        && (goalshead = undefined || param["goals head"] == goalshead) 
                        && (goalspenalty == undefined || param["goals penalty"] == goalspenalty)) {
                            return param;
                        }
                    });
                }
                if (filtered.length > 0) {
                    elementos = insertar(filtered, elementos, limit, offset);
                    res.send(elementos);
                }else{
                    console.log("WARNING: Error getting data from DB");
                    res.sendStatus(404); //Not found
                }
            });
          
}else{*/
    db2.find({ "city" : newteam.city}).toArray((err,filteredTeams)=>{
    if(err){
        console.error("Error accesing DB");
        res.sendStatus(500);
    }
    if(filteredTeams.length>0){
            console.log("WARNING");
            res.sendStatus(409); //conflict
        }else{
            db2.insert(newteam);
            res.sendStatus(201);
        }
    
    });
//}
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
    if(!city){
        console.log("Warning : new GET request ");
        res.sendStatus(400);
    }
    db2.find({ "city" : city}).toArray((err,filteredTeams)=>{
    if(err){
        console.error("Error accesing DB");
        res.sendStatus(500);
    }else {
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

app.get(BASE_API_PATH+"/goals-stats/:city/:team",(req,res)=>{
    var city = req.params.city;
    var team = req.params.team;
    //var year = parseInt(req.params.year);
    console.log(Date() + " - GET /teams/"+city+ "/" + team);
    if(!city || !team){
        console.log("Warning : new GET request ");
        res.sendStatus(400);
    }
    db2.find({ "city" : city, "team" : team}).toArray((err,filteredTeams)=>{
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
        res.sendStatus(400);
        console.warn(Date()+" - Hacking attempt!");
        return;
    }
   
    db2.update({"city" : team.city, "team" : team.team},team);
    res.sendStatus(200);
});
};