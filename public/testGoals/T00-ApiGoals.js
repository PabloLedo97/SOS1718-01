/*global element*/
/*global by*/

var newman = require('newman');
var path = require('path');

describe('API should works', function() {
	newman.run({
		collection:require(path.join(process.cwd(),"public/testGoals","sos1718-01-goals-stats.postman_collection.json")),
		reporters: "cli"
	},function(err){
		if(err)
		    throw err;
		 else
		    console.log(" collection run complete!");
		    
		
	})


});