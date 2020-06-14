const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//connect to MONGOdb
connectDB();

//initiate middlware to accept json data
app.use(express.json({ extended : false }));


//Defining Routes through Middleware
app.use('/api/users', require('./routes/users') );
app.use('/api/contacts', require('./routes/contacts') );
app.use('/api/auth', require('./routes/auth') );

//Serve static assets in production
if(process.env.NODE_ENV==='production'){
    //SET THE STATIC FOLDER
    app.use(express.static('client/build') );

    app.get('*', (req, res) => res.sendFile( path.resolve( __dirname,'client', 'build', 'index.html' ) ) );
}




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT} `);
});