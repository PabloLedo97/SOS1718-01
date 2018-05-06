var fs = require("fs");
var path = require("path");

describe('Add team', function(){
    it('should add a new team', function(){
        browser
        .get('https://sos1718-01.herokuapp.com/ManagerApp.html#!/transfers-stats')
        .then(function(){
            element.all(by.repeater('team in teams'))
            .then(function(myteams){
                browser.driver.sleep(2000);
                
                element(by.model('newteam.city')).sendKeys('villareal');
                element(by.model('newteam.year')).sendKeys('2015');
                element(by.model('newteam.team')).sendKeys('villareal fc');
                element(by.model('newteam.timaxexp')).sendKeys('1');
                element(by.model('newteam.tilessexp')).sendKeys('1');
                element(by.model('newteam.tispa')).sendKeys('1');
                
                element(by.buttonText('Add')).click().then(function(){
                    element.all(by.repeater('team in teams')).then(function (teams){
                        expect(teams.length).toEqual(myteams.length+1);
                    });
                });
                browser.takeScreenshot()
                .then(function(png){
                    var stream = fs.createWriteStream(path.join(process.cwd(),'testTransfers','output','t02.png'));
                    stream.write(new Buffer(png,'base64'));
                    stream.end();
                });
        
            });
        });
    });
});