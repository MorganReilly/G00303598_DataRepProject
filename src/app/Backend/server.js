let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');

//Connect to mongoDB
const mongoose = require('mongoose');

//Connection String
const mongoDB = 'mongodb://MReilly:MReilly123@ds249873.mlab.com:49873/g00303598_project_datarep';
mongoose.connect(mongoDB);

//Define scheme of how data will be stored
let Schema = mongoose.Schema;

//Store posts sent to db
let postSchema = new Schema({
    name: String,
    type: String
});

//Use schema to build model
let postModel = mongoose.model('post', postSchema);

//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Post request - post 'name' & 'type' to db
app.post('/api/posts',function(req,res,err){
    //prepare response in json format
    response = {
        name: req.body.name,
        type: req.body.type
    };

    console.log(response);
    res.end(JSON.stringify(response));

    //Create post to be delivered to mLabDB
    postModel.create({
        name: req.body.name,
        type: req.body.type
    }, function(err, postModel) {
        if(err) return handleError(err);
        //Saved!
    });
})

//GET + FIND REQUEST - Reads a file by title or id from your db in your node/express server
app.get('/api/posts', function (req, res) {
    //Finding everything in database 
    postModel.find(function (err, posts) {
        //If not found - send an error
        if (err)
            res.send(err);
        //Found - return as json
        res.status(200).json( posts)//End res.status.json
    })//End .find
})//End GET REQUEST

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})