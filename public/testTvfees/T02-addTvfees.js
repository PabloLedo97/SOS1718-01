var fs = require("fs");
var path = require("path");
var config= require("./config");

describe('Add team', function(){
    it('should add a new team', function(){
        browser
        .get(config.getAppUrl())
        .then(function(){
            element.all(by.repeater('team in teams'))
            .then(function(initialteams){
                browser.driver.sleep(2000);
                
                element(by.model('newteam.city')).sendKeys('sevilla');
                element(by.model('newteam.year')).sendKeys('2015');
                element(by.model('newteam.team')).sendKeys('real-betis');
                element(by.model('newteam.capacity')).sendKeys('60000');
                element(by.model('newteam.attotal')).sendKeys('120000');
                element(by.model('newteam.ataverage')).sendKeys('550000');
                
                element(by.buttonText('Add')).click().then(function(){
                    element.all(by.repeater('team in teams')).then(function (teams){
                        expect(teams.length).toEqual(initialteams.length+1);
                    });
                });
                browser.takeScreenshot()
                .then(function(png){
                    var stream = fs.createWriteStream(path.join(process.cwd(),'public/testTvfees','output','Img02.png'));
                    stream.write(new Buffer(png,'base64'));
                    stream.end();
                });
        
            });
        });
    });
});