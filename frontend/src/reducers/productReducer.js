

import { PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST, 

PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,

PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, 

PRODUCT_CREATE_RESET, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL,

PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET, 

PRODUCT_REVIEW_CREATE_REQUEST, PRODUCT_REVIEW_CREATE_SUCCESS, PRODUCT_REVIEW_CREATE_FAIL,
PRODUCT_REVIEW_CREATE_RESET} from '../constants/productConstants';






export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            // anything u return from here will go to store.
            return {
                loading: true, 
                products: []
            }
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        
         case PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        default:
            return state;


        
    }
};



//Whenever there is array or object in ur product model, we should always initailize it empty in our default state

export const productDetailsReducer =(state= {product: { reviews: [] } }, action) => 
{
    switch (action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {...state, loading: true};
    
        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false, product: action.payload};
        
        case PRODUCT_DETAILS_FAIL:
            return {loading:false, error: action.payload};
        
        default:
            return state;    
    }
};




export const productDeleteReducer =(state= {}, action) => 
{
    switch (action.type){
        case PRODUCT_DELETE_REQUEST:
            return { loading: true};
    
        case PRODUCT_DELETE_SUCCESS:
            return {loading:false, success: true};
        
        case PRODUCT_DELETE_FAIL:
            return {loading:false, error: action.payload};
        
        default:
            return state;    
    }
};



export const productCreateReducer =(state= {}, action) => 
{
    switch (action.type){
        case PRODUCT_CREATE_REQUEST:
            return { loading: true};
    
        case PRODUCT_CREATE_SUCCESS:
            return {loading:false, success: true, product: action.payload};
        
        case PRODUCT_CREATE_FAIL:
            return {loading:false, error: action.payload};

        case  PRODUCT_CREATE_RESET:
            return {  };
        default:
            return state;    
    }
};




export const productUpdateReducer =(state= {product : {}}, action) => 
{
    switch (action.type){
        case PRODUCT_UPDATE_REQUEST:
            return {...state, loading: true};
    
        case PRODUCT_UPDATE_SUCCESS:
            return {loading:false, success: true, product: action.payload};
        
        case PRODUCT_UPDATE_FAIL:
            return {loading:false, error: action.payload};

        case  PRODUCT_UPDATE_RESET:
            return { product: {} };
        default:
            return state;    
    }
};



export const productReviewCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_REVIEW_CREATE_REQUEST:
			return { loading: true };
		case PRODUCT_REVIEW_CREATE_SUCCESS:
			return { loading: false, success: true };
		case PRODUCT_REVIEW_CREATE_FAIL:
			return { loading: false, error: action.payload };
		case PRODUCT_REVIEW_CREATE_RESET:
			return {};
		default:
			return state;
	}
};







//every application we will be in this 3 states - 
// 1) REQUEST - SPINNER / LOAD THE DATA
// 2) SUCCESS - SHOW THE DATA
// 3) FAIL/ERROR - ERROR MESSAGE


// created const variable of the same name and imported here 
//- created constants to avoid mistakes while using strings


// state obj - by default data  & action obj - will contain only type(always a string) and payload
//if we dont mention anything in state, it will return undefined, therfore assign an empty array
  

