import axios from 'axios';

import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD} 
from '../constants/cartConstants';


//In action getState - it will return you full state object. to get token 
//In component useSelector - it will return you full state object


//Redux thunk - it doesnt return any promises and we need another fuction to use the asyn funn

export const addToCart = (id, qty) => async (dispatch, getState) => 
{
    const {data} = await axios.get(`/api/products/${id}`);

    dispatch(
        {type: CART_ADD_ITEM, 
         payload: 
                {
                   product: data._id, 
                   name: data.name, 
                   image: data.image, 
                   price: data.price, 
                   countInStock: data.countInStock, 
                   qty,
                },
});



 //localStorage - global object,stores the data in key,value form - where the value should always be a JSON String       
 
 localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));       
};



export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: id});

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

};


export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data});

    localStorage.setItem('shippingAddress', JSON.stringify(data));
};



export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT_METHOD, payload: data});

    localStorage.setItem('paymentMethod', JSON.stringify(data));
}