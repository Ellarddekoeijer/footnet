const express = require('express');
var cors = require('cors')
const app = express();
const port = process.env.PORT || 3001;
const CONNECTION_URI = "mongodb+srv://admin:1997lol@cluster0-40bfi.mongodb.net/momentum?retryWrites=true&w=majority" || "mongodb://localhost:27017/momentum";
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './../frontend/build')));

//Allow the serving of css, js and images out of the /public directory
app.use(express.static('public'))

app.use("/public", express.static(path.join(__dirname, 'public')));

mongoose.set('useCreateIndex', true);

//require routers
var users = require('./routers/user.js')
var coach = require('./routers/coach.js')
var player = require('./routers/player.js')

mongoose.connect(CONNECTION_URI, {useNewUrlParser: true});

app.use('/user', users)
app.use('/coach', coach)
app.use('/player', player)
app.listen(port, () => console.log(`Server listening on port ${port}!`))