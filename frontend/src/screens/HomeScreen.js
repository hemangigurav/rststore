import { Heading, Grid } from '@chakra-ui/react'

// import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'


// import products from '../products';
import ProductCard from '../components/ProductCard';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';


const HomeScreen = () =>{
        
    // const [products, setProducts] = useState([]);

    const dispatch = useDispatch();


    // selector will return the combine reducer data which we stored in store. and this value will depand on wat we will run request/success/fail
    const productList = useSelector((state) => 
        state.productList
);

    const{ loading, error, products } = productList;



    useEffect(() => {
        dispatch(listProducts());


        // const fetchProducts = async () =>{
        //     const {data} = await axios.get('/api/products');
        //     setProducts(data);
        // };
        // fetchProducts();
         
    }, [dispatch]);


    return (
        <>
            <Heading as='h2' mb='8' fontSize='xl'>Trending Products</Heading>


            {/* To generate the snipper while loading the page
                1) Created Loader component for the spinner
                2) Created Message component to show status on the loader */}

            {loading ? (<Loader/>) : error ? (<Message type= 'error'>{error}</Message>) :
        
                <Grid templateColumns=
                {{
                    sm:'1fr', 
                    md:'1fr 1fr', 
                    lg:'1fr 1fr 1fr 1fr', 
                    xl:'1fr 1fr 1fr 1fr'
                }} 
                gap='8'>
                {products.map((product) =>(

                    <ProductCard key={product._id} product={product} />
                    //  <p key={product._id}> {product.name}</p>
                    
                ))}

                </Grid>
            }
        </>
        );
};


export default HomeScreen;