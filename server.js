const express = require('express')
const mongoose = require ('mongoose')
const morgan = require('morgan')

const ArtworkRoute = require('./routes/artworks')
const OrdersRoute = require('./routes/orders')
const UsersRoute = require('./routes/users')
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error)=>{
    console.log(error)
});
db.once('open', ()=> {
    console.log("Database connection established")
});
const app= express()

app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
app.use('/api/artstore/artwork',ArtworkRoute);
app.use('/api/artstore/Orders',OrdersRoute)
app.use('/api/artstore/Orders',UsersRoute)
