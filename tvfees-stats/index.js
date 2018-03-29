var tvfeesstats = {};
var BASE_API_PATH = "/api/v1";

module.exports = tvfeesstats;



//PABLO
tvfeesstats.register = function (app,db) {
    console.log("Register routes for tvfeesstats API");

app.get(BASE_API_PATH + "/help", (req, res) => {
    res.redirect("hola");
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
        "capacity":54907 ,
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


db.find({}, (err, teams) => {
    if (err) {
        console.error("Error accesing DB");
        process.exit(1);
    }
    if (initialteams.length == 0) {
        console.log("Empty DB");
        db.insert(initialteams);

    }
    else {
        console.log("DB initialized with " + initialteams.length + " teams ");

    }

});





app.get(BASE_API_PATH + "/tvfees-stats", (req, res) => {
    console.log(Date() + " - GET /tvfees-stats");
    db.find({}).toArray((err, teams) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        }

        res.send(initialteams.map((t)=>{
            delete t._id;
            return t;
        }));
    });

});

app.get("/test", (req, res) => {
    res.sendStatus(201);
});

app.post(BASE_API_PATH + "/tvfees-stats", (req, res) => {
    console.log(Date() + " - POST /tvfees-stats");
    var team = req.body;
    initialteams.push(team);
    res.send(team);
    res.sendStatus(201);
});

app.put(BASE_API_PATH + "/tvfees-stats", (req, res) => {
    console.log(Date() + " - PUT /tvfees-stats");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/tvfees-stats", (req, res) => {
    console.log(Date() + " - DELETE /tvfees-stats");
    initialteams = [];
    db.remove({},{multi:true});
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
    console.log(Date() + " - GET /tvfees-stats/" + city);

    db.find({"city" : city}).toArray((err, teams) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        }

        res.send(initialteams.map((t)=>{
            delete t._id;
            return t;
        })[0]);
    });

});

app.get(BASE_API_PATH + "/tvfees-stats/:city", (req, res) => {
    var city = req.params.city;
    console.log(Date() + " - GET /tvfees-stats/" + city);

    db.find({"city" : city}).toArray((err, teams) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        }

        res.send(initialteams.map((t)=>{
            delete t._id;
            return t;
        }));
    });

});





app.delete(BASE_API_PATH + "/tvfees-stats/:city", (req, res) => {
    var city = req.params.city;
    console.log(Date() + " - DELETE /tvfees-stats/" + city);

    initialteams = initialteams.filter((t) => {
        return (t.city != city);
    });

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

    initialteams = initialteams.map((t)=>{
        if(t.city == team.city)
            return team;
        else
            return t;
    });

    res.sendStatus(200);
});
};

