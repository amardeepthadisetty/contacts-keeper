const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect to MONGOdb
connectDB();

//initiate middlware to accept json data
app.use(express.json({ extended : false }));

app.get('/', (req, res) => {
    console.log("hello world");
    //res.send('Hello world');
    res.json({msg: 'Hello world'});
});

//Defining Routes through Middleware
app.use('/api/users', require('./routes/users') );
app.use('/api/contacts', require('./routes/contacts') );
app.use('/api/auth', require('./routes/auth') );




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT} `);
});