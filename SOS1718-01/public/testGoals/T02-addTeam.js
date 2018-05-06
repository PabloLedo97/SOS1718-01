var fs = require("fs");
var path = require("path");

describe('Add team', function(){
    it('should add a new team', function(){
        browser
        .get('https://sos1718-01.herokuapp.com/ManagerApp.html#!/goals-stats')
        .then(function(){
            element.all(by.repeater('team in teams'))
            .then(function(initialteams2){
                browser.driver.sleep(2000);
                
                element(by.model('newteam.city')).sendKeys('madrid');
                element(by.model('newteam.year')).sendKeys('2015');
                element(by.model('newteam.team')).sendKeys('realmadrid-fc');
                element(by.model('newteam.rightfoot')).sendKeys('25');
                element(by.model('newteam.head')).sendKeys('17');
                element(by.model('newteam.penalty')).sendKeys('11');
                
                element(by.buttonText('Add')).click().then(function(){
                    element.all(by.repeater('team in teams')).then(function (teams){
                        expect(teams.length).toEqual(initialteams2.length + 1);
                    });
                });
                browser.takeScreenshot()
                .then(function(png){
                    var stream = fs.createWriteStream(path.join(process.cwd(),'testGoals','output','T02.png'));
                    stream.write(new Buffer(png,'base64'));
                    stream.end();
                });
        
            });
        });
    });
});