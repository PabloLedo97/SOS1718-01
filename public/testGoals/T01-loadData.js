var fs = require("fs");
var path = require("path");

describe('Data is loaded', function(){
    it('should show some teams', function(){
        browser
        .get('https://sos171801fsr-sos171801fsr.c9users.io/ManagerApp.html#!/goals-stats')
        .then(function(){
            element.all(by.repeater('team in teams'))
            .then(function(teams){
                browser.takeScreenshot()
                .then(function(png){
                    var stream = fs.createWriteStream(path.join(process.cwd(),'testGoals','output','T01.png'));
                    stream.write(new Buffer(png,'base64'));
                    stream.end();
                });
                
                expect(teams.length).toBeGreaterThan(0);
            });
        });
    });
});