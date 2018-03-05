var Song = require("../models/songs");
var User = require("../models/users");
var Artist = require("../models/artists");
var newUser = function(data, callback){
    User.create(data, function(err, saved){
        if(callback){
            callback(err, saved)
        }
    })
}
var newSong = function(data, callback){
    Song.create(data, function(err,saved){
        if(callback){
            callback(err,saved)
        }
    })
}
var newArtist = function(data, callback){
    Artist.create(data, function(err,saved){
        if(callback){
            callback(err,saved)
        }
    })
}
module.exports = {
    newUser: newUser,
    newSong: newSong,
    newArtist: newArtist
}