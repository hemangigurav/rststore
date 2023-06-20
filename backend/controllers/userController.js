import asyncHandler from 'express-async-handler';


import User from'../models/userModel.js';
import generateToken from '../utils/generateToken.js';


/*
  desc - Auth user
  route	- POST /api/users/login
  access - public
 */


 
const authUser = asyncHandler(async (req, res) => {
    const{ email, password } = req.body;

   

    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))) 
    {
        res.json(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })

    }  
    else{
        res.status(401);
        throw new Error("Invalid email or password");
    }
});


/*
des - GET user profile
route - GET /api/users/profile
access - private
*/

const getUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id); // we have defined this user in Middleware
   
   if(user)
   {
        res.json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            }
            );    
   }
   else
   {
    throw new Error("User Not Found");
   }
});



/*
des - Register new user 
route - POST /api/users
access - public
*/


const registerUser = asyncHandler(async(req, res, next) =>
    {

    const { name, email, password } = req.body;

    const userExists =  await User.findOne({email});

    if(userExists){
        res.status(400); //Bad Request Client Error
        throw new Error("User Already Exists");
    }

    const user = await User.create({name, email, password});
    if (user){
        // 201 - successfully created
        res.status(201).json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),

            }
        );
    }
    else{
        res.status(400);
        throw new Error("Invalid user data");
    }
});



/*
des - Update user profile 
route - PUT /api/users/profile
access - private
*/

const updateUserProfile = asyncHandler( async (req, res) =>{
const user = await User.findById(req.user._id);

if (user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    //password is truty...if we do like this upper one then not is modified will become false 
    if(req.body.password){
        user.password = req.body.password;
    }

    const updateUser = await user.save();

    res.json({
        _id: user._id,
                name: updateUser.name,
                email: updateUser.email,
                isAdmin: updateUser.isAdmin,
                token: generateToken(updateUser._id),
    })
}
else{
    res.status(404)
    throw new Error('User Not Found')
}
});   


/*
des - get all users 
route - GET  /api/users/
access - private/admin
*/


const getUsers = asyncHandler( async(req, res) => {
    const users = await User.find({}).select('-password');
    res.json(users);
});


/*
des - delete user 
route - DELETE  /api/users/:id
access - private/admin
*/


const deleteUser = asyncHandler( async(req, res) => {
const user = await User.findById(req.params.id);

    if ( user )
    {
        await user.deleteOne();
        res.json({message: 'user deleted'});
    }
    else
    {
        res.status(404);
        throw new Error('User Not Found');
    }
});



/*
des - get user byID 
route - GET /api/users/:id
access - private/admin
*/


const getUserByID = asyncHandler( async(req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        res.json(user);
    }
    else
    {
        res.status(404)
        throw new Error('User not found')
    }
});



/*
des - Update a  user  
route - PUT /api/users/:id
access - private/admin
*/


const updateUser =  asyncHandler ( async(req, res) => {
    const user = await User.findById(req.params.id)

    if (user)
    {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin ;
    
        const updatedUser = await user.save();

        res.json({
            _id: updateUser._id,
                name: updateUser.name,
                email: updateUser.email,
                isAdmin: updateUser.isAdmin,
        });
    }
    else{
        res.json(404)
        throw new Error('User not found');
    }


});



export {
authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser,
getUserByID, updateUser };