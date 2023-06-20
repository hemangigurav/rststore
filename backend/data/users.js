import bcrypt from 'bcryptjs';



const users = [
    {
        name: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10), //never show ur pass in plane text, alwasy encryt it
        isAdmin: true,
    },
    
    {
        name: 'Hemangi Gurav',
        email: 'hemangi@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },

    {
        name: 'Bhavya Gurav',
        email: 'bavya@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
];




export default users;