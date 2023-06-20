import mongoose from "mongoose";



const orderSchema = mongoose.Schema(
    {
        //user information - kisne order kiya
        user:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',  
            required: true
        },
        
        
        //array of objects which should have all this properties.
        orderItems: [
            {
                name: {type: String, required: true},
                qty: {type: Number, required: true},
                image: {type: String, required: true},
                price: {type: Number, required: true},
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
            }
        ],

        shippingAddress:{
            address: {type: String, required: true},
            city: {type: String, required: true},
            postalCode: {type: String, required: true},
            country: {type: String, required: true},
        },


        //PayPal Credit Card/Debit Card

        paymentMethod: {
            type: String,
            required: true
        },

        //Data which Paypal will give
        
        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String,
        },

        taxPrice:{
            type: Number,
            required: true,
            default: 0.0, // save it in float data type
        },

        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,        
        },

        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,        
        },

        isPaid: {
                type: Boolean,
                required: true,
                default: false,                    
        },

        
        // paidAt: Date <-- we can write in this way also
        paidAt: {
            type: Date,
        },

        
        isDelivered:{
                type: Boolean,
                required: true,
                default: false,
        },

        deliveredAt: Date,
    },

    { timestamps: true }
);



const Order = mongoose.model('Order', orderSchema);


export default Order;








