import  express  from 'express';  
import dotenv from 'dotenv';
import colors from 'colors';
import path from 'path';

//we need to add extension .js in the path when we use ES Module


import connectDB from './config/db.js';       
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';


dotenv.config();
connectDB();



const app = express();

app.use(express.json());  //we need to say to express to parse it from JSON - body parsing



// creating routes

app.get('/', (req, res) => 
{
    res.send('API IS RUNNING');

});



// created another Route file and used here 
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/uploads', uploadRoutes);



//Create a static folder

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}
else {
    app.get('/', (req, res) => {
        res.send('API is running');
    });
}



//Middleware should be called after all your routes in server.js
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue);
});






// Node Common JS Syntax to import

// const express = require('express');  
// const dotenv = require('dotenv')
// const products = require('./data/products');


// import products from './data/products.js';


// app.get('/api/products', (req, res)=>{
//     res.json(products);
// });


// // route to fetch single product by id

// app.get('/api/products/:id', (req, res) => {
//     const product = products.find((prod)=> prod._id === req.params.id);
//     res.json(product);
// });