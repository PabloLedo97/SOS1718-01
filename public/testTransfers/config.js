exports.config = {
    seleniumAddress: "http://localhost:8910",
    specs: ['t00-API.js','t01-loadDataTransfers.js','t02-addTeamTransfers.js'],
    capabalities:{
        'browserName': 'phantomjs'
    },
    
    params: {
        host: 'localhost',
        port: '8080',
        nombreapi: "/ManagerApp.html#!/transfers-stats"
    }
};

exports.getAppUrl = function(){
    return "http://"+browser.params.host+":"+browser.params.port+browser.params.nombreapi; 
};