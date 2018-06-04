var transfersApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = transfersApi;

var myteams = [{
        "city": "madrid",
        "year": 2015,
        "team": "real-madrid-cf",
        "timaxexp": 31.5,
        "tilessexp": 6,
        "tispa": 12
    },
    {
        "city": "madrid",
        "year": 2015,
        "team": "atletico-madrid",
        "timaxexp": 35,
        "tilessexp": 15,
        "tispa": 0
    },
    {
        "city": "vigo",
        "year": 2015,
        "team": "celta-de-vigo ",
        "timaxexp": 10,
        "tilessexp": 2,
        "tispa": 17.3
    },
    {
        "city": "barcelona",
        "year": 2015,
        "team": "fc-barcelona",
        "timaxexp": 34,
        "tilessexp": 17,
        "tispa": 17
    },
    {
        "city": "malaga",
        "year": 2015,
        "team": "malaga-cf",
        "timaxexp": 3.5,
        "tilessexp": 3.5,
        "tispa": 0
    },
    {
        "city": "sevilla",
        "year": 2015,
        "team": "sevilla-fc",
        "timaxexp": 9.75,
        "tilessexp": 4,
        "tispa": 0
    }
];

// adios

transfersApi.register = function(app, db3) {
    console.log("Registering routes for transfers API...");

    var buscador = function(base, aux_set, param_city, param_year, param_team, param_timaxexp, param_tilessexp, param_tispa) {

       

        if (param_city != undefined || param_year != undefined || param_team != undefined || param_timaxexp != undefined || param_tilessexp != undefined || param_tispa != undefined) {

            for (var j = 0; j < base.length; j++) {

                var year = parseInt(base[j].year);
                var city = base[j].city;
                var team = base[j].team;
                var timaxexp = base[j].timaxexp;
                var tilessexp = base[j].tilessexp;
                var tispa = base[j].tispa;

                // City
                if (param_city != undefined && param_year == undefined && param_team == undefined && param_timaxexp == undefined && param_tilessexp == undefined && param_tispa == undefined) {

                    if (param_city == city) {
                        aux_set.push(base[j]);
                    }

                    //Team
                }
                if (param_city == undefined && param_year == undefined && param_team != undefined && param_timaxexp == undefined && param_tilessexp == undefined && param_tispa == undefined ) {

                    if (param_team == team) {
                        aux_set.push(base[j]);
                    }


                }
                // TiMaxExp
                else if (param_city == undefined && param_year == undefined && param_team == undefined && param_timaxexp != undefined && param_tilessexp == undefined && param_tispa == undefined) {

                    if (param_timaxexp == timaxexp) {
                        aux_set.push(base[j]);
                    }
                }
                // TiLessExp

                else if (param_city == undefined && param_year == undefined && param_team == undefined && param_timaxexp == undefined && param_tilessexp != undefined && param_tispa == undefined) {

                    if (param_tilessexp == tilessexp) {
                        aux_set.push(base[j]);
                    }

                    //TiSpa
                }
                else if (param_city == undefined && param_year == undefined && param_team == undefined && param_timaxexp == undefined && param_tilessexp == undefined && param_tispa != undefined) {

                    if (param_tispa == tispa) {
                        aux_set.push(base[j]);
                    }


                }
                 //Year
                                else if (param_city == undefined && param_year != undefined && param_team == undefined && param_timaxexp == undefined && param_tilessexp == undefined && param_tispa == undefined) {

                                    if (param_year == year ) {
                                        aux_set.push(base[j]);
                                    }

                                    // TiMaxExp, TiLessExp, TiSpa
                                }
                else if (param_city == undefined && param_year == undefined && param_team == undefined && param_timaxexp != undefined && param_tilessexp != undefined && param_tispa != undefined) {

                    if (param_timaxexp == timaxexp && param_tilessexp == tilessexp && param_tispa == tispa) {
                        aux_set.push(base[j]);
                    }

                }
            }
        }

        return aux_set;
    };


    app.get(BASE_API_PATH + "/transferincomes-stats/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/4049934/pruebas-postman/RVu1GqWA");
    });

    //GET de LoadInitialData
    app.get(BASE_API_PATH + "/transferincomes-stats/loadInitialData", (req, res) => {
        console.log(Date() + " - GET /transferincomes-stats/loadInitialData" + myteams);

        //db3.insert(myteams);
        db3.find({}).toArray((err, teams) => {
            if (err) {
                console.error("Error accesing DB");
                process.exit(1);
                return;
            }
            if (teams.length == 0) {
                console.log("Empty DB");
                db3.insert(myteams);
            }
            res.send(teams.map((c) => {
                delete c._id;
                return c;
            }));
        });
    });

    // GET a la ruta base
   /* app.get(BASE_API_PATH + "/transferincomes-stats", (req, res) => {
        console.log(Date() + " - GET /transferincomes-stats");
        //res.send(myteams);
        db3.find({}).toArray((err, teams) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.send(teams.map((c) => {
                delete c._id;
                return c;
            }));
        });
    });
*/

    //POST a la ruta base
    app.post(BASE_API_PATH + "/transferincomes-stats", (req, res) => {
        console.log(Date() + " - POST /transferincomes-stats");
        var newteam = req.body;
        if (!newteam.city || !newteam.year || !newteam.team || !newteam.timaxexp || !newteam.tilessexp || !newteam.tispa || Object.keys(newteam).length != 6) {
            console.log("Warning : new GET request ");
            res.sendStatus(400);
        } else {
        db3.find({ "city": newteam.city }).toArray((err, filteredTeams) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
            }
            if (filteredTeams.length > 0) {
                console.log("WARNING");
                res.sendStatus(409); //conflict
            }
            else {
                db3.insert(newteam);
                res.sendStatus(201);
            }
        });
        }
    });

    //PUT a la ruta base
    app.put(BASE_API_PATH + "/transferincomes-stats", (req, res) => {
        console.log(Date() + " - PUT /transferincomes-stats");
        res.sendStatus(405);
    });

    //DELETE a la ruta base
    app.delete(BASE_API_PATH + "/transferincomes-stats", (req, res) => {
        console.log(Date() + " - DELETE /transferincomes-stats");
        db3.remove({});
        res.sendStatus(200);
    });

    //GET a un recurso concreto
    app.get(BASE_API_PATH + "/transferincomes-stats/:city", (req, res) => {
        var city = req.params.city;
        console.log(Date() + " - GET /transferincomes-stats/" + city);
        if (!city) {
            console.log("Warning : new GET request");
            res.sendStatus(400);
        }
        db3.find({ "city": city }).toArray((err, filteredTeams) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
            }
            else {
                if (filteredTeams.length > 0) {
                    res.send(filteredTeams.map((c) => {
                        delete c._id;
                        return c;
                    }));
                }
                else {
                    console.log("WARNING");
                    res.sendStatus(404);
                }
            }
        });
    });

    //GET realizando filtrado
    app.get(BASE_API_PATH + "/transferincomes-stats/:city/:team", (req, res) => {
        var city = req.params.city;
        var team = req.params.team;
        //var year = req.params.year;
        console.log(Date() + " - GET /transferincomes-stats/" + city + "/" + team);
        if (!city || !team) {
            console.log("Warning : new GET request ");
            res.sendStatus(400);
        }
        db3.find({ "city": city, "team": team }).toArray((err, filteredTeams) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
            }
            else {
                if (filteredTeams.length > 0) {
                    res.send(filteredTeams.map((c) => {
                        delete c._id;
                        return c;
                    }));
                }
                else {
                    console.log("WARNING");
                    res.sendStatus(404);
                }
            }
        });
    });

    //DELETE a un recurso concreto
    app.delete(BASE_API_PATH + "/transferincomes-stats/:city", (req, res) => {
        var city = req.params.city;
        console.log(Date() + " - DELETE /transferincomes-stats/" + city);

        db3.remove({ "city": city });
        res.sendStatus(200);
    });

    //POST a un recurso concreto
    app.post(BASE_API_PATH + "/transferincomes-stats/:city", (req, res) => {
        var city = req.params.city;
        console.log(Date() + " - POST /transferincomes-stats/" + city);
        res.sendStatus(405);
    });

    //PUT a un recurso concreto
    app.put(BASE_API_PATH + "/transferincomes-stats/:city/:team", (req, res) => {
        var city = req.params.city;
        var nombre = req.params.team;
        var team = req.body;

        console.log(Date() + " - PUT /transferincomes-stats/" + city);

        if (city != team.city || nombre != team.team) {
            res.sendStatus(400);
            console.warn(Date() + " - Hacking attempt!");
            return;
        }

        db3.update({ "city": team.city, "team": team.team }, team);
        res.sendStatus(200);
    });

    //Búsqueda
    app.get(BASE_API_PATH + "/transferincomes-stats", function(request, response) {
        
        console.log("INFO: New GET request to /transferincomes-stats");

        /*PRUEBA DE BÚSQUEDA*/
        var limit = parseInt(request.query.limit);
        var offset = parseInt(request.query.offset);
        var year = request.query.year;
        var city = request.query.city;
        var team = request.query.team;
        var timaxexp = request.query.timaxexp;
        var tilessexp = request.query.tilessexp;
        var tispa = request.query.tispa;
        var aux = [];
        var aux2 = [];
        var aux3 = [];

        if (limit >=0 || offset >= 0) {
            db3.find({}).skip(offset).limit(limit).toArray(function(err, filteredTeams) {
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
                    console.log("INFO: Sending teams :: " + JSON.stringify(filteredTeams, 2, null));
                    if (city || year || team || timaxexp || tilessexp || tispa) {

                        aux = buscador(filteredTeams, aux, city, year, team, timaxexp, tilessexp, tispa);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);
                            
                            response.send(aux2);
                        }
                        else {
                            response.send(aux3); //No content
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
            db3.find({}).toArray(function(err, filteredTeams) {
                if (err) {
                    console.error('ERROR from database');
                    response.sendStatus(500); // internal server error
                }
                else {
                    if (filteredTeams.length === 0) {

                        response.send(filteredTeams);
                        return;
                    }
                    
                    if (city || year || team || timaxexp || tilessexp || tispa) {
                        aux = buscador(filteredTeams, aux, city, year, team, timaxexp, tilessexp, tispa);
                        if (aux.length > 0) {
                            response.send(aux);
                        }
                        else {
                            response.sendStatus(404); //No content
                            return;
                        }
                    }
                    else {
                        response.send(filteredTeams.map((c)=>{
                            delete c._id;
                            return c;
                        }));
                    }
                }
            });
        }
    });
};
