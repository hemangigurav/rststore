
import colors from "colors";
import dotenv from 'dotenv';


// to communicate with the DB we import all this models

import connectDB from './config/db.js';
import products from "./data/products.js";
import users from "./data/users.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";

dotenv.config();

connectDB();

const importData = async () => {
try {
    //before importing del everything
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    
    
    //fill up the users - it will return u new array with obj with user id so save it  to another varaible
    const createdUsers =  await User.insertMany(users);
    const adminUser = createdUsers[0]._id;


    const sampleProducts = products.map((product) => {
        return{...product, user: adminUser}
    } );

    await Product.insertMany(sampleProducts);

    console.log("Data imported".green)
    process.exit();

} 

catch (err) {
    console.log(`${err}`.red);
    process.exit(1);
}
};


const destroyData = async () => {
try {
await Order.deleteMany();
await Product.deleteMany();
await User.deleteMany();

console.log("Data Destroyed".red);
process.exit();
    
} 

catch (err) 
{
    console.log(`${err}`.red);
    process.exit(1);    
}
};



//Change it in script file so that we can run both the function accordingly

if (process.argv[2] === '-d'){
    destroyData();
}
else{
    importData();
}


// destroyData();
// importData();


