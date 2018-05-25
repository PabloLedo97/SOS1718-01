exports.config = {
    seleniumAddress: "http://localhost:8910",
    specs: ['t01-loadDataTransfers.js','t02-addTeamTransfers.js'],
    capabilities:{
        'browserName': 'phantomjs'
    },
    
    params: {
        host: 'localhost',
        port: '8080'
    }
};

exports.getAppUrl = function(){
    return "http://"+browser.params.host+":"+browser.params.port; 
}