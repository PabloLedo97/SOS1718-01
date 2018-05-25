/*global element*/
/*global by*/

var fs = require("fs");
var path = require("path");
var config= require("./config");
describe('Data is loaded', function(){
    it('should show some teams', function(){
        browser
        .get(config.getAppUrl())
        .then(function(){
            element.all(by.repeater('team in teams'))
            .then(function(teams){

                browser.takeScreenshot()
                .then(function(png){
                    var stream = fs.createWriteStream(path.join(process.cwd(),'public/testTvfees','output','Img01.png'));
                    stream.write(new Buffer(png,'base64'));
                    stream.end();
                });
                
                expect(teams.length).toBeGreaterThan(0);
            });
        });
    });
});