import mongoose from "mongoose";


const reviewSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        rating: {
            type: Number,
            required: true,
        },

        comment: {
            type: String,
            required: true
        },

        user: {
            //refernce a mongodb id, set a special datatype
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',  // konse model ka object id , user model ka obj id hoan chahiye
            required: true
        },

    },
    { timestamps: true }
);




const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, //refernce a mongodb id, set a special datatype
            ref: 'User',  // konse model ka object id , user model ka obj id hoan chahiye
            required: true
        },

        name: {
            type: String,
            required: true, 
        },

        image: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        brand: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        rating: {
            type: Number,
            required: true,
            default: 0,
        },

        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },

        price: {
            type: Number,
            required: true,
            default: 0,
        },

        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },

        // it should be array -arry ke andar object and should look like reviewschema
        // or we can create directly here inside the reviews key - value array of object.

        reviews: [reviewSchema]  

        
    }
);


const Product = mongoose.model('Product', productSchema);


export default Product;

