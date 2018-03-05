var Song = require("../models/songs");
var User = require("../models/users");
var Artist = require("../models/artists");
var delUser = function(data, callback){
    User.remove(data, function(err){
        if(callback){
            callback(err)
        }
    })
}
var delSong = function(data, callback){
    Song.remove(data, function(err){
        if(callback){
            callback(err)
        }
    })
}
var delArtist = function(data, callback){
    Artist.remove(data, function(err){
        if(callback){
            callback(err)
        }
    })
}
module.exports = {
    delUser: delUser,
    delSong: delSong,
    delArtist: delArtist
}