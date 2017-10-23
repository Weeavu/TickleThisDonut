var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var formidable = require("formidable");
var fs = require("fs");
var path = require("path");
var methodOve = require("method-override");
var youtubeDl = require("youtube-dl");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOve("_method"));

function getVids(){
   var dir = __dirname + "/public/assets/videos";
   var results = [];
   
   fs.readdirSync(dir).forEach(function(file){
      
      results.push(file);
   });
   
   return results;
}

app.get("/", function(req, res){
   res.redirect('/vids');   
});

app.get("/pineapplepizza", function(req, res){

   res.render('mod', { names: getVids()});
});

app.get("/vids", function(req, res){

   res.render('index', { names: getVids()});
});

app.get("/vids/:id", function(req, res){
   res.render('show', {name: req.params.id});
});

app.post("/fileupload", function(req, res){
   var form = new formidable.IncomingForm();
   
   form.uploadDir = path.join(__dirname, '/public/assets/videos');
   
   form.parse(req, function(err, fields, file){
      if(err) throw err;
      fs.rename(file.filetoupload.path, path.join(form.uploadDir, file.filetoupload.name), function(err){
         if(err) throw err;
         res.redirect('/vids');
         res.end();
      });
   });
});

app.delete('/vids/:id', function(req, res){
   var delPath = path.join(__dirname, '/public/assets/videos/');
   fs.unlinkSync(delPath + req.params.id);
   res.redirect('/pineapplepizza');
});

app.get('/youtube', function(req, res){
   res.render('youtube');   
});

app.post('/ytdownload', function(req, res){
   var video = youtubeDl(req.body.link,
   ['--format=18']);

   
   video.on('info', function(info){
         video.pipe(fs.createWriteStream(__dirname + "/public/assets/videos/" + info._filename));
         res.redirect('/vids/' + info._filename);
   });
   

   
   
})

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is running..."); 
});

