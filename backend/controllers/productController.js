import asyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';




/*  instead of writing try-catch several time we will use express-async-handler to handle our error
  Called as Route-Handler
*/


/*
  desc - Get all products
  route	- GET /api/products
  access - public
 */


const getProducts = asyncHandler( async (req, res) =>{
    const products = await Product.find({}) // empyt ojct to find everything
    res.json(products);
    
});



/*
  desc - Get all products
  route	- GET /api/products/:id
  access - public
 */

 const getProductById = asyncHandler( async (req, res) => {
    try 
    {
        const product = await Product.findById(req.params.id);
      
      if(product)
      {
        res.json(product);
      }
      else{
        res.status(404).json({message: 'Product not found'});
      }    
    } 
    catch (err) 
    {
        console.log(err.message);
        res.json(err);    
    }
});



/*
  desc - delete a product
  route	- DELETE /api/products/:id
  access - private/admin
 */


 const deleteProduct = asyncHandler( async(req, res) => {
  const product = await Product.findById(req.params.id);
  
  
  if (product)
  {
    await product.deleteOne();

    res.json({message: 'Product Deleted'})
  }
  else 
  {
    res.status(404);
    throw new Error('Product not found');
  }
  });



  /*
  desc - create a product
  route	- POST /api/products
  access - private/admin
 */


  const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
      name: 'Sample product',
      price: 0,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      user: req.user._id,
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    });
  
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  });
  




  /*
  desc - update a product
  route	- PUT /api/products/:id
  access - private/admin
 */



  const updateProduct = asyncHandler(async(req, res) => {
    const {name, image, price, description, countInStock, brand, category} = req.body;
    
    const product = await Product.findById(req.params.id)

    if (product)
    {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.countInStock = countInStock;
      product.category = category;
      product.brand = brand;
    
    
    const updatedProduct = await product.save();
    res.json(updatedProduct); 
  }
  else
  {
    res.status(404);
    throw new Error('Product not found');

  }  
  
  });




  /*
  desc		Create a new review
  route		POST /api/products/:id/reviews
  access	private
 */
  const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
  
    const product = await Product.findById(req.params.id);
  
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      );
  
      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already reviewed');
      }
  
      const review = {
        name: req.user.name,
        rating: +rating,
        comment,
        user: req.user._id,
      };
  
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
  
      product.rating =
        product.reviews.reduce((acc, currVal) => acc + currVal.rating, 0) /
        product.reviews.length;
  
      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });
  
  
  



export {getProductById, getProducts, deleteProduct, createProduct, updateProduct, createProductReview};