var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connection.on("open", function(){
    console.log("mongoose connected!");
});
var artistSchema = new Schema({
    username: {type: String, unique:true},
    password: {type: String},
    gravatar: {type: String},
    bio: {type:String},
});
var Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;