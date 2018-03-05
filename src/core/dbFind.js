var Song = require("../models/songs");
var User = require("../models/users");
var Artist = require("../models/artists");
var findUser = function (data, select, callback){
    return User.findOne(data, select, function(err,docs){
        if(callback){
            callback(err,docs)
        }
    })
}
var findSong = function(data, select, callback){
    return Song.findOne(data, select, function(err,docs){
        if(callback){
            callback(err,docs)
        }
    })
}
var findArtist = function(data, select, callback){
    return Artist.findOne(data, select, function(err,docs){
        if(callback){
            callback(err,docs)
        }
    })
}
var searchSongs = function(data, select, callback){
    return Song.find(data, select, function(err,docs){
        if(callback){
            callback(err,docs)
        }
    });
}
var searchUsers = function(data, select, callback){
    return User.find(data, select, function(err,docs){
        if(callback){
            callback(err,docs)
        }
    })
}
searchArtists = function(data, select, callback){
    return Artist.find(data, select, function(err,docs){
        if(callback){
            callback(err,docs)
        }
    })
}
module.exports = {
    searchSongs: searchSongs,
    searchUsers: searchUsers,
    findArtist: findArtist,
    searchArtists: searchArtists,
    findSong: findSong,
    findUser: findUser
}