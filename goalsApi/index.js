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
    
var buscador = function(base, aux_set, param_city, param_year, param_team, param_rightfoot, param_head, param_penalty) {

        //console.log("Búsqueda con parametros: stadium = " + param_stadium + ", date = " + param_date + ", hit = " + param_hit + ", run = " + param_run + ", error = " + param_error + ".");

        

        if ( param_city != undefined || param_team == undefined ||  param_rightfoot != undefined || param_head != undefined || param_penalty != undefined || param_year != undefined) {

            for (var j = 0; j < base.length; j++) {

                var year = parseInt(base[j].year);
                var city = base[j].city;
                var team = base[j].team;
                var rightfoot = base[j].rightfoot;
                var head = base[j].head;
                var penalty = base[j].penalty;

                // City
                if ( param_city != undefined || param_team == undefined || param_rightfoot == undefined || param_head == undefined || param_penalty == undefined || param_year == undefined) {

                    if ( param_city == city) {
                        aux_set.push(base[j]);
                    }

                    //Team
                }
                if ( param_city == undefined || param_team != undefined || param_rightfoot == undefined || param_head == undefined || param_penalty == undefined || param_year == undefined) {

                    if ( param_team == team) {
                        aux_set.push(base[j]);
                    }

                    
                }
                  // Rightfoot
                else if ( param_city == undefined || param_team == undefined || param_rightfoot != undefined || param_head == undefined || param_penalty == undefined || param_year == undefined) {

                    if (param_rightfoot == rightfoot) {
                        aux_set.push(base[j]);
                    }
                }
                  // Head
                
                else if (param_city == undefined || param_team == undefined || param_rightfoot == undefined || param_head != undefined || param_penalty == undefined || param_year == undefined) {

                    if (param_head == head) {
                        aux_set.push(base[j]);
                    }

                    //Penalty
                }
                else if (param_city == undefined || param_team == undefined || param_rightfoot == undefined || param_head == undefined || param_penalty != undefined || param_year == undefined) {

                    if (param_penalty == penalty) {
                        aux_set.push(base[j]);
                    }

                    // Year
                }
                else if (param_city == undefined || param_team == undefined || param_rightfoot == undefined || param_head == undefined || param_penalty == undefined || param_year != undefined) {

                    if (param_year == year ) {
                        aux_set.push(base[j]);
                    }

                    // Rightfoot, head, penalty
                }
                else if (param_city == undefined || param_team == undefined || param_rightfoot != undefined || param_head != undefined || param_penalty != undefined || param_year == undefined) {

                    if (param_rightfoot == rightfoot && param_head == head && param_penalty == penalty) {
                        aux_set.push(base[j]);
                    }
        
                }
            }

        }


        return aux_set;

    };
    
   
    
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

/*app.get(BASE_API_PATH+"/goals-stats",(req,res)=>{
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
});*/

app.post(BASE_API_PATH+"/goals-stats",(req,res)=>{
    console.log(Date() + " - POST /teams");
    var newteam = req.body;
     if(!newteam.city || !newteam.year || !newteam.team || !newteam.rightfoot || !newteam.head || !newteam.penalty || !Object.keys(newteam).length != 6){
        console.log("Warning : new GET request ");
        res.sendStatus(400);
    } 
   
    
     
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
//Busqueda
app.get(BASE_API_PATH + "/goals-stats", function(request, response) {
                //if (!checkApiKey(request, response)) return;

        console.log("INFO: New GET request to /baseball-stats ");

        /*PRUEBA DE BUSQUEDA */
        var limit = parseInt(request.query.limit);
        var offset = parseInt(request.query.offset);
        var year = parseInt(request.query.year);
        var city = request.query.city;
        var team = request.query.team;
        var rightfoot = request.query.rightfoot;
        var head = request.query.head;
        var penalty = request.query.penalty;
        var aux = [];
        var aux2 = [];
        var aux3 = [];


        if (limit || offset >= 0) {
            db2.find({}).skip(offset).limit(limit).toArray(function(err, filteredTeams) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                    return;
                }
                else {
                    if (filteredTeams.length === 0) {
                        response.sendStatus(404); //No content
                        return;
                    }
                    console.log("INFO: Sending countries:: " + JSON.stringify(filteredTeams, 2, null));
                    if ( city || year || team || rightfoot || head || penalty) {

                        aux = buscador(filteredTeams, aux, city, year, team , rightfoot, head, penalty);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);
                            //console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(aux, 2, null));
                            //console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(baseballstats, 2, null));
                            //console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(aux2, 2, null));
                            response.send(aux2);
                        }
                        else {

                            response.send(aux3); // No content 
                            return;
                        }
                    }
                    else {
                        response.send(filteredTeams);
                    }
                }
            });

        }
        else {

            db2.find({}).toArray(function(err, filteredTeams) {
                if (err) {
                    console.error('ERROR from database');
                    response.sendStatus(500); // internal server error
                }
                else {
                    if (filteredTeams.length === 0) {

                        response.send(filteredTeams);
                        return;
                    }
                    //console.log("INFO: Sending baseball-stats: " + JSON.stringify(baseballstats, 2, null));
                    if ( city || year || team|| rightfoot || head || penalty) {
                        aux = buscador(filteredTeams, aux, city, year, team, rightfoot, head, penalty);
                        if (aux.length > 0) {
                            response.send(aux);
                        }
                        else {
                            response.sendStatus(404); //No content
                            return;
                        }
                    }
                    else {
                        response.send(filteredTeams);
                    }
                }
            });
        }

    });
};