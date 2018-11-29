let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');

//Connect to mongoDB
const mongoose = require('mongoose');

//DB Connection
let username = 'MReilly';
let password = 'MReilly123';
let dbName = 'g00303598_project_datarep';
//Connection String
const mongoDB = 'mongodb://' + username + ':' + password + '@ds249873.mlab.com:49873/' + dbName;
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Define scheme of how data will be stored
let Schema = mongoose.Schema;

//Store posts sent to db
let postSchema = new Schema({
    name: String,
    type: String,
    description: String,
    setRange: String,
    repRange: String
});

//Use schema to build model
let postModel = mongoose.model('post', postSchema);

//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Post request - post 'name' & 'type' to db
app.post('/api/posts', function (req, res, err) {
    console.log("POST METHOD CALLED");
    //prepare response in json format
    response = {
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        setRange: req.body.setRange,
        repRange: req.body.repRange
    };

    console.log(response);
    res.end(JSON.stringify(response));

    //Create post to be delivered to mLabDB
    postModel.create({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        setRange: req.body.setRange,
        repRange: req.body.repRange
    }, function (err, postModel) {
        if (err) return handleError(err);
        //Saved!
    });
})

//GET + FIND REQUEST - Reads a file by title or id from your db in your node/express server
app.get('/api/posts', function (req, res) {
    console.log("GET METHOD CALLED");
    //Finding everything in database 
    postModel.find(function (err, posts) {
        //If not found - send an error
        if (err)
            res.send(err);
        //Found - return as json
        res.status(200).json(posts)//End res.status.json
    })//End .find
})//End GET REQUEST

//GET REQ USED FOR EDIT
app.get('/api/posts/:id', function (req, res) {
    console.log("GET METHOD CALLED (USED FOR EDIT)");
    console.log("DB ID: ", req.params.id);

    postModel.findById(req.params.id, function (err, data) {
        res.json(data);
    });
})

//PUT METHOD USED TO PUT UPDATES BACK TO SERVER
app.put('/api/posts/:id', function (req, res) {
    console.log("PUT METHOD CALLED");
    console.log(req.params.id);
    response = {
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        setRange: req.body.setRange,
        repRange: req.body.repRange
    };

    console.log(response);

    postModel.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
        if (err)
            res.send(err);
        res.send(data);
    });
})

//DELETE
//:id <- identifies parameter
app.delete('/api/posts/:id', function (req, res) {
    console.log("DELETE METHOD CALLED");
    console.log(req.params.id);

    postModel.deleteOne({ _id: req.params.id },
        //Call back funciton - once deleted this is called
        function (err, data) {
            res.send(data);
        })
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})