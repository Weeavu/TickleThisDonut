var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var formidable = require("formidable");
var fs = require("fs");
var path = require("path");
var methodOve = require("method-override");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOve("_method"));


app.get("/", function(req, res){
   res.redirect('/vids');   
});

app.get("/pineapplepizza", function(req, res){
      var dir = __dirname + "/public/assets";
   var results = [];
   
   fs.readdirSync(dir).forEach(function(file){
      
      results.push(file);
   });
   res.render('mod', { names: results});
});

app.get("/vids", function(req, res){
   var dir = __dirname + "/public/assets";
   var results = [];
   
   fs.readdirSync(dir).forEach(function(file){
      
      results.push(file);
   });
   res.render('index', { names: results});
});

app.get("/vids/:id", function(req, res){
   res.render('show', {name: req.params.id});
});

app.post("/fileupload", function(req, res){
   var form = new formidable.IncomingForm();
   
   form.uploadDir = path.join(__dirname, '/public/assets');
   
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
   var delPath = path.join(__dirname, '/public/assets/');
   fs.unlinkSync(delPath + req.params.id);
   res.redirect('/vids');
});
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is running..."); 
});