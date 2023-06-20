import axios from "axios";

import { 
USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,

USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,

USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET,

USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET,

USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET,

USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL,

USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, 

USER_DETAIL_BYID_REQUEST, USER_DETAIL_BYID_FAIL, USER_DETAIL_BYID_SUCCESS,} 
from "../constants/userConstants";

import { ORDER_DETAILS_RESET, ORDER_MY_LIST_RESET } from "../constants/orderConstants";



export const login = (email, password) => async(dispatch) => {
    try 
    {
        dispatch({type: USER_LOGIN_REQUEST})


        /* headers: {
                'Content-type': 'application/json'
            } request obj for backend - the data which i am sending is in json.
         we have to do this whenever we are sending a post request
        */
       const config = { 
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(`/api/users/login`, { email, password }, config);

        dispatch({type: USER_LOGIN_SUCCESS, payload: data});

        localStorage.setItem('userInfo', JSON.stringify(data));
    } 

    catch (err) 
    {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
              err.response && err.response.data.message
                ? err.response.data.message
                : err.message,
          });    
    }
};



export const logout= () => async(dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({type: USER_LOGOUT});
    dispatch({type: USER_DETAILS_RESET});
    dispatch({type: USER_UPDATE_PROFILE_RESET});
    dispatch({type: ORDER_MY_LIST_RESET});
    dispatch({type: ORDER_DETAILS_RESET});
    dispatch({type: USER_LIST_RESET});
};





export const register = (name, email, password) => async(dispatch) => {
    try {
        dispatch({type: USER_REGISTER_REQUEST})

        const config = {
            headers : {
                'Content-Type': 'application/json',
            }
        };

        const {data} = await axios.post('/api/users', {name, email, password}, config)
        
        dispatch({type: USER_REGISTER_SUCCESS, payload: data})
    
        dispatch({type: USER_LOGIN_SUCCESS, payload: data})
    } 
    catch (err) 
    {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
              err.response && err.response.data.message
                ? err.response.data.message
                : err.message,
          });    
    }
};



//private request - we will need token and token is stored in user/profile - we need to read the state
export  const getUserDetails = () => async(dispatch, getState) => {
    try 
    {
        dispatch({type: USER_DETAILS_REQUEST})

        const { userLogin: { userInfo }, /* 2 Level Desctructing*/ } = getState();

        const config = {
            headers: {
                Authorization:`Bearer ${userInfo.token}`,

            },
        };

        const {data} = await axios.get('/api/users/profile', config);


        dispatch({type: USER_DETAILS_SUCCESS, payload: data});
    } 

    catch (err) 
    {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
              err.response && err.response.data.message
                ? err.response.data.message
                : err.message,
          });    
        
    }
};




export const updateUserProfile = (user) => async(dispatch, getState) => {
    try {
        dispatch({type: USER_UPDATE_PROFILE_REQUEST})
        
        const { userLogin: {userInfo},} = getState();

        const config = {
            headers: {
                
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json',
            },
        };

        const {data} = await axios.put('/api/users/profile', user, config);

        dispatch({type: USER_UPDATE_PROFILE_SUCCESS, payload: data});
        dispatch({type: USER_LOGIN_SUCCESS, payload: data})

        localStorage.setItem('userInfo', JSON.stringify(data));
    } 
    
    catch (err) 
    {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
              err.response && err.response.data.message
                ? err.response.data.message
                : err.message,
          });    
        
    }
};



export const listUsers = () => async(dispatch, getState) =>{
try 
{
    dispatch({type: USER_LIST_REQUEST});

    const { userLogin: {userInfo},} = getState();

        const config = {
            headers: {
                
                Authorization: `Bearer ${userInfo.token}`,
                
            },
        };

     const {data} = await axios.get(`/api/users`, config);   

     dispatch({type: USER_LIST_SUCCESS, payload: data});
    
    
} 
catch (err) 
{
    dispatch({
        type: USER_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      }); 
}
};




export const deleteUser = (id) => async(dispatch, getState) => {
try 
{
    dispatch({type: USER_DELETE_REQUEST});

    const { userLogin: {userInfo},} = getState();

        const config = {
            headers: {
                
                Authorization: `Bearer ${userInfo.token}`,
                
            },
        };

    const {data} = await axios.delete(`/api/users/${id}`, config);


    dispatch({type: USER_DELETE_SUCCESS});
    
} 
catch (err) 
{
    dispatch({
        type: USER_DELETE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      }); 
}
};



export const updateUser = (user) => async(dispatch, getState) => {
    try {
        dispatch({type: USER_UPDATE_REQUEST})

        const { userLogin: {userInfo},} = getState();

        const config = {
            headers: {
                
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json',
            },
        };

        const {data} = await axios.put(`/api/users/${user._id}`, user, config);
        
        dispatch({type: USER_UPDATE_SUCCESS, payload: data});
    } 
    catch (err)      
     {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
              err.response && err.response.data.message
                ? err.response.data.message
                : err.message,
          }); 
    }
};



export const getUserByID = (user) => async(dispatch, getState) => {
    try {
        dispatch({type: USER_DETAIL_BYID_REQUEST})

        const { userLogin: {userInfo},} = getState();

        const config = {
            headers: {
                
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json',
            },
        };

        const {data} = await axios.get(`/api/users/${user._id}/edit`, config);
        
        dispatch({type: USER_DETAIL_BYID_SUCCESS, payload: data});
    } 
    catch (err)      
     {
        dispatch({
            type: USER_DETAIL_BYID_FAIL,
            payload:
              err.response && err.response.data.message
                ? err.response.data.message
                : err.message,
          }); 
    }
};
