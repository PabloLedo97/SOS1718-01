exports.config = {
    seleniumAddress: 'http://localhost:8910',
    specs: ['T01-loadData.js','T02-addTeam.js'],
    capabalities: {
        'browserName' : 'phantomjs'
    },

 params: {
        host:'localhost',
        port:'8080',
        nombreapi: "/ManagerApp.html#!/goals-stats"
    }

};


exports.getAppUrl = function(){
  return "http://" + browser.params.host + ":" + browser.params.port + browser.params.nombreapi;  
};