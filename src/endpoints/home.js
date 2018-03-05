dbFind = require("../core/dbFind");
dbUpdate = require("../core/dbUpdate");
dbDelete = require("../core/dbDelete");
dbCreate = require("../core/dbCreate");
module.exports = {
    index: async function(req,res){
        var results = [];
        if(req.query.search){
            searches = req.query.search.trim().split(" ");
            for(var i = 0; i < searches.length; i++){
                var result = await dbFind.searchSongs({'name':searches[i]});
                results.push(result.name)
                console.log(result)
            }
        }
        res.render("home", {session:req.session, results:results})
    },
}