var fs = require("fs");
var path = require("path");


describe('Data is loaded', function(){
    it('should show some contacts', function(){
        browser
            .get('https://sos171801mls-sandbox-sos171801mls.c9users.io/ManagerApp.html#!/transfers-stats')
            .then(function (){
                element.all(by.repeater('team in teams'))
                .then(function(teams){
                browser.takeScreenshot()
                .then(function(png){
                    var stream = fs.createWriteStream(path.join(process.cwd(),'testTransfers','output','t01.png'));
                    stream.write(new Buffer(png,'base64'));
                    stream.end();
                });
                
                expect(teams.length).toBeGreaterThan(0);
            });
        });
    });
});