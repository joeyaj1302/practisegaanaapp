const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors('*'))

app.use(express.json());

const routerUser = require('./routes/user');
const routerSong = require('./routes/song');


app.use('/user',routerUser);
app.use('/song',routerSong);

// static routing
// any file in uploads directory does not require any route
// express will simply return any file from uploads directory
app.use(express.static('uploads'))

app.listen(4000,()=>{
    console.log("Server started on port 4000");
})