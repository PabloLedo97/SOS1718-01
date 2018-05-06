var express = require("express");
var port = (process.env.PORT || 1607);

var app = express();

var BASE_API_PATH= "/api/v1";

app.use("/",express.static(__dirname+"/public"));

var contacts = [
    {"name": "pablo",
    "phone": 12345
    },
    {
        "name": "pepe",
        "phone": 6789
    }
    ];

app.get(BASE_API_PATH+"/contacts", (req,res)=>{
    console.log("new request to /time");
    res.send(new Date());
});

app.listen(port,()=>{
    console.log("server ready on port "+port+"!");
}).on("error",(e)=>{
    console.log("Server NOT READY:"+e);
});

console.log("Server setting up...")