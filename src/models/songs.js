var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connection.on("open", function(){
    console.log("mongoose connected!");
});
var songSchema = new Schema({
    name: {type: String},
    artist: {type: String},
    song: {type: String},
    mimetype: {type:String},
    views: [{username: String}]
});
var Song = mongoose.model("Song", songSchema);
module.exports = Song;