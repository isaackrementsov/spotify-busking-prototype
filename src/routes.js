var router = require("express").Router();
var multer = require("multer");
var path = require("path");
var home = require("./endpoints/home");
var users = require("./endpoints/users");
var songs = require("./endpoints/songs");
var ep = require("./endpoints/ep-utils");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/');
  },
  filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
        console.log(file.originalname)
  }
}); 
var upload = multer({ storage: storage });
module.exports =  function(app){
    app.use("/", router);
    router.get("/", home.index);
    router.get("/users:artist/:username",  users.home);
    router.get("/login", users.renderLogin);
    router.get("/signup", users.renderSignup);
    router.post("/signup", upload.single('avatar'), users.signup);
    router.post("/login", users.login);
    router.post("/logout", users.logout);
    router.get("/track/:id", songs.play);
    router.post("/tracks/delete:id", songs.delete);
    router.post("/tracks/add", upload.single('song'), songs.add);
}