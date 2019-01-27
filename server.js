'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');
// require and use "multer"...
var upload = multer({ storage: multer.memoryStorage() });
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/analyse', upload.single('upfile'),function(req,res){
  console.log(req.file);
  res.json({
  'file':req.file.originalname,
  'type':req.file.mimetype,
  'size':req.file.size  
  })
});

app.use((res,req,next)=>{
  res.status(404);
  res.type("text").send("Not Found")
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
