exports.config = {
    seleniumAddress: 'http://localhost:8910',
    specs: ['T01-loadData.js','T02-addTvfees.js'],
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
  return "http://" + browser.params.host + ":" + browser.params.port + browser.params.nombreapi;  
};
