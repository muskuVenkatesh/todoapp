// require express for setting up the express server
const express = require('express');
const app = express();

// set up the port number
const port = 7000;
app.use(express.static('assets/home'))
//app.use(express.urlencoded()) 

// importing the DataBase
const db = require('./config/mongoose');         

// importng the Schema For tasks
const  Task  = require('./models/task');

// using express


// using static files
app.use(express.static("./views"));
// to use encrypted data
app.use(express.urlencoded());

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// rendering the App Page
app.get('/', function(req, res){
    // to find the the tasks
    Task.find({}, function(err, task){
        // if there is an error in tasks
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }
        // if there is no errror

        return res.render('home', {
            tittle: "Home",
            task: task
        });
    }
)});


// creating Tasks
app.post('/create-task', function(req, res){
  //  console.log("Creating Task");
    
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
        }, function(err, newtask){
        if(err){console.log('error in creating task', err); return;}
        

        //console.log(newtask);
        return res.redirect('back');

    });
});


// deleting Tasks
app.get('/delete-task', function(req, res){
    // get the id from query
    var id = req.query;

    // checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        
        // finding and deleting tasks from the DB one by one using id
        Task.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
            console.log('error in deleting task');
            }
        })
    }
    return res.redirect('back'); 
});

// make the app to listen on asigned port number
app.listen(port, function(err){
    if(err){
        console.log(`Error while running the server : ${err}`);
    }

    console.log(`Server is running on the port number: ${port}`);
});