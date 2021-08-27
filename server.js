const express = require('express')
const mongoose = require ('mongoose')
const morgan = require('morgan')
require('dotenv').config()

const artworkRoute = require('./routes/artworks')
const ordersRoute = require('./routes/orders')
const usersRoute = require('./routes/users')

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true,
useCreateIndex: true });
const db = mongoose.connection;
    db.on('error', (error)=>{
        console.log(error)//ask
    });
    db.once('open', ()=> {
        console.log("Database connection established")
    });
const app= express()
    app.use(express.urlencoded({extended:true}))//ask
    app.use(express.json())//ask

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
});
    //  CUSTOM TOKENS
    morgan.token('body', (req) => JSON.stringify(req.body));

    // app.use(morgan('tiny'))
    app.use(morgan(`:url :method :body`))//Asking for specific things
    app.use('/api/artstore/artwork',artworkRoute);
    app.use('/api/artstore/Orders',ordersRoute)
    app.use('/api/artstore/Users',usersRoute)
