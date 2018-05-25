exports.config = {
    seleniumAddress: 'http://localhost:8910',
    specs: ['T00-ApiTvfees.js','T01-loadData.js','T02-addTvfees.js'],
    capabalities: {
        'browserName' : 'phantomjs'
    },
 params: {
        host:'localhost',
        port:'8080',
        nombreapi: "/ManagerApp.html#!/tvfees-stats"
       
    }
};

exports.getAppUrl = function(){
  console.log("https://" + browser.params.host +browser.params.nombreapi);
    return "https://" + browser.params.host + browser.params.nombreapi;
};