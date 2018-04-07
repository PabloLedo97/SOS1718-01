var tvfeesstatsApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = tvfeesstatsApi;



//PABLO
tvfeesstatsApi.register = function(app, db) {
    console.log("Register routes for tvfees-stats API");

    app.get(BASE_API_PATH + "/tvfees-stats/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3897700/sos1718-01-tvfees-stats/RVu1Gq87");
    });
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
    
 var buscador1 = function(base1, auxil_set, param_city, param_year, param_team, param_capacity, param_attotal, param_ataverage) {


        

        if ( param_city != undefined || param_year != undefined || param_team != undefined ||  param_capacity != undefined || param_attotal != undefined || param_ataverage != undefined ) {

            for (var k = 0; k < base1.length; k++) {

                var year = parseInt(base1[k].year);
                var city = base1[k].city;
                var team = base1[k].team;
                var capacity = base1[k].capacity;
                var attotal = base1[k].attotal;
                var ataverage = base1[k].ataverage;

                // City
                if (param_city != undefined  ) {

                    if ( param_city == city) {
                        auxil_set.push(base1[k]);
                    }

                    //Team
                }
                if ( param_city == undefined  && param_team != undefined) {

                    if ( param_team == team) {
                        auxil_set.push(base1[k]);
                    }

                    
                }
                  // Capacity
                else if ( param_city == undefined  && param_team == undefined && param_capacity != undefined && param_attotal == undefined && param_ataverage == undefined) {

                    if (param_capacity == capacity) {
                        auxil_set.push(base1[k]);
                    }
                }
                  // Attotal
                
                else if (param_city == undefined /*&& param_year == undefined*/ && param_team == undefined && param_capacity == undefined && param_attotal != undefined && param_ataverage == undefined) {

                    if (param_attotal == attotal) {
                        auxil_set.push(base1[k]);
                    }

                    //Ataverage
                }
                else if (param_city == undefined /*&& param_year == undefined*/ && param_team == undefined && param_capacity == undefined && param_attotal == undefined && param_ataverage != undefined) {

                    if (param_ataverage == ataverage) {
                        auxil_set.push(base1[k]);
                    }

                  
                }/* //Year
                else if (param_city == undefined && param_year != undefined && param_team == undefined && param_rightfoot == undefined && param_head == undefined && param_penalty == undefined) {

                    if (param_year == year ) {
                        aux_set.push(base[j]);
                    }

                    // Capacity, attotal, ataverage
                }*/
                else if (param_city == undefined /*&& param_year == undefined*/ && param_team == undefined && param_capacity != undefined && param_attotal != undefined && param_ataverage != undefined) {

                    if (param_capacity == capacity && param_attotal == attotal && param_ataverage == ataverage) {
                        auxil_set.push(base1[k]);
                    }
        
                }
            }

        }


        return auxil_set;

    };   
    

    
 /*   app.get(BASE_API_PATH + "/tvfees-stats", (req, res) => {
        console.log(Date() + " - GET /tvfees-stats");
        db.find({}).toArray((err, teams) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            res.send(teams.map((t) => {
                delete t._id;
                return t;
            }));
        });
    });

*/

    app.post(BASE_API_PATH + "/tvfees-stats", (req, res) => {
        console.log(Date() + " - POST /tvfees-stats");
        var newteam = req.body;
        /*if(!newteam.city|| !newteam.year || !newteam.team || !newteam["capacity"] || !newteam["at-total"] || !newteam["at-average"] || Object.keys(newteam).length != 6){
              res.sendStatus(400);
              return;
          }*/
        db.find({ "city": newteam.city }).toArray((err, filterTeams) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
            }
            if (filterTeams.length > 0) {
                console.log("Warning: Conflicto");
                res.sendStatus(409);
            }
            else {
                db.insert(newteam);
                res.sendStatus(201);
            }
        });

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
        console.log(Date() + " - GET /tvfees-stats/loadInitialData" + initialteams);
        db.insert(initialteams);
        db.find({}, (err, teams) => {
            if (err) {
                console.log("Error acccesing DB");
                process.exit(1);
                return;
            }
            res.send(initialteams);
        });

    });
    app.get(BASE_API_PATH + "/tvfees-stats/:city", (req, res) => {
        var city = req.params.city;
        console.log(Date() + " - GET /tvfees-stats" + city);
        if (!city) {
            console.log("Bad Request");
            res.sendStatus(400);
        }
        db.find({ "city ": city }).toArray((err, filterTeams) => {
            if (err) {
                console.log("Error Accesing DB");
                res.sendStatus(500);
            }
            else {
                if (filterTeams.length > 0) {
                    res.send(filterTeams.map((t) => {
                        delete t._id;
                        return t;
                    }));
                }
                else {
                    console.log("Not found");
                    res.sendStatus(404);
                }
            }

        });

    });


    app.get(BASE_API_PATH + "/tvfees-stats/city/:capacity", (req, res) => {
        var city = req.params.city;
        var capacity = req.params.capacity;
        console.log(Date() + " - GET /tvfees-stats/" + city + "/" + capacity);

        if (!city || !capacity) {
            console.log("Bad Request");
            res.sendStatus(400);
        }
        db.find({ "city ": city, "capacity": capacity }).toArray((err, filterTeams) => {
            if (err) {
                console.log("Error Accesing DB");
                res.sendStatus(500);
            }
            else {
                if (filterTeams.length > 0) {
                    res.send(filterTeams.map((t) => {
                        delete t._id;
                        return t;
                    }));
                }
                else {
                    console.log("Not found");
                    res.sendStatus(404);
                }
            }

        });

    });


    app.delete(BASE_API_PATH + "/tvfees-stats/:city", (req, res) => {
        var city = req.params.city;
        console.log(Date() + " - DELETE /tvfees-stats/" + city);

        db.remove({ "city": city });

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


        console.log(Date() + " - PUT /tvfees/" + team);


        if (city != team.city) {
            res.sendStatus(409);
            console.warn(Date() + " - Hacking attempt!");
            return;
        }
        db.update({ "city": team.city, }, team);


        res.sendStatus(200);

    });
    //Busqueda de recursos
    app.get(BASE_API_PATH + "/tvfees-stats", function(request, response) {
        console.log("New Request to /tvfees-stats");
        /*PRUEBA DE BUSQUEDA */
        var limit = parseInt(request.query.limit);
        var offset = parseInt(request.query.offset);
        var year = parseInt(request.query.year);
        var city = request.query.city;
        var team = request.query.team;
        var capacity = request.query.capacity;
        var attotal = request.query.attotal;
        var ataverage = request.query.ataverage;
        var auxil = [];
        var auxil2 = [];
        var auxil3 = [];
        if (limit || offset >= 0) {
            db.find({}).skip(offset).limit(limit).toArray(function(err, filterTeams) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                    return;
                }
                else {
                    if (filterTeams.length === 0) {
                        response.sendStatus(404); //No content
                        return;
                    }
                    console.log("INFO: Sending teams :: " + JSON.stringify(filterTeams, 2, null));
                    if (city || year || team || capacity || attotal || ataverage) {

                        auxil = buscador1(filterTeams, auxil, city, year, team, capacity, attotal, ataverage);

                        if (auxil.length > 0) {
                            auxil2 = auxil.slice(offset, offset + limit);

                            response.send(auxil2);
                        }
                        else {

                            response.send(auxil3); // No content 
                            return;
                        }
                    }
                    else {
                        response.send(filterTeams);
                    }
                }
            });
        }
        else {

            db.find({}).toArray(function(err, filterTeams) {
                if (err) {
                    console.error('ERROR from database');
                    response.sendStatus(500); // internal server error
                }
                else {
                    if (filterTeams.length === 0) {

                        response.send(filterTeams);
                        return;
                    }
                    if (city || year || team || capacity || attotal || ataverage) {
                        auxil = buscador1(filterTeams, auxil, city, year, team, capacity, attotal, ataverage);
                        if (auxil.length > 0) {
                            response.send(auxil);
                        }
                        else {
                            response.sendStatus(404); //No content
                            return;
                        }
                    }
                    else {
                        response.send(filterTeams);
                    }
                }
            });
        }

    });
};
