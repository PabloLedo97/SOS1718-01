var tvfeesstats = {};
var BASE_API_PATH = "/api/v1";

module.exports = tvfeesstats;



//PABLO
tvfeesstats.register = function(app, db) {
    console.log("Register routes for tvfeesstats API");

    app.get(BASE_API_PATH + "/tvfees-stats/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3897700/sos1718-01-tvfees-stats/RVu1Gq87");
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

        },
        {
            "city": "madrid",
            "year": 2015,
            "team": "club atlético de madrid",
            "capacity": 54907,
            "at-total": 366144,
            "at-average": 45768

        },
        {
            "city": "madrid",
            "year": 2015,
            "team": "real madrid cf",
            "capacity": 81044,
            "at-total": 546089,
            "at-average": 68261

        },
        {
            "city": "valencia",
            "year": 2015,
            "team": "valencia cf",
            "capacity": 55000,
            "at-total": 303895,
            "at-average": 37987

        }
    ];

    app.get(BASE_API_PATH + "/tvfees-stats", (req, res) => {
        console.log(Date() + " - GET /tvfees-stats");
        db.find({}).toArray((err, teams) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            res.send(teams.map((t)=>{
                delete t._id;
                return t;
            }));
});
});

    

    app.post(BASE_API_PATH + "/tvfees-stats", (req, res) => {
        console.log(Date() + " - POST /tvfees-stats");
        var nuevoteam = req.body;
        initialteams.push(nuevoteam);
        res.sendStatus(201);
        if(!nuevoteam){
            console.log("Bad Request");
            res.sendStatus(400 );
        }
        db.find({"city" : nuevoteam.city}).toArray((err,filterTeams)=>{
         if(err){
             console.error("Error accesing DB");
             res.sendStatus(500);
         } 
         if(filterTeams.length>0){
             console.log("Warning: Conflicto");
             res.sendStatus(409);
         }else{
             db.insert(nuevoteam);
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
         if(!city){
            console.log("Bad Request");
            res.sendStatus(400 );
        }
        db.find({"city " : city}).toArray((err,filterTeams)=>{
            if(err){
                console.log("Error Accesing DB");
                res.sendStatus(500);
            }else{
             if(filterTeams.length>0){
                 res.send(filterTeams.map((t)=>{
                     delete t._id;
                     return t;
                 }));
             }else{
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
        
         if(!city || !capacity){
            console.log("Bad Request");
            res.sendStatus(400 );
        }
        db.find({"city " : city, "capacity" : capacity}).toArray((err,filterTeams)=>{
            if(err){
                console.log("Error Accesing DB");
                res.sendStatus(500);
            }else{
             if(filterTeams.length>0){
                 res.send(filterTeams.map((t)=>{
                     delete t._id;
                     return t;
                 }));
             }else{
                 console.log("Not found");
                 res.sendStatus(404);
             }
            }
            
        });
        
    });
       

    app.delete(BASE_API_PATH + "/tvfees-stats/:city", (req, res) => {
        var city = req.params.city;
        console.log(Date() + " - DELETE /tvfees-stats/" + city);

        db.remove({"city": city});

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
      db.update({"city" : team.city,},team);
   
        
        res.sendStatus(200);
    
});
};