import express from 'express';
import{getProductById, getProducts, deleteProduct, updateProduct, createProduct, createProductReview}
 from '../controllers/productController.js';
import {admin, protect} from '../middlewares/authMiddleware.js';




// router works same like app - so instead of app we will use router

const router = express.Router();


router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);
router.route('/:id/reviews').post(protect, createProductReview);


//router.get('/:id', getProductById);




export default router;












// route to fetch single product by id using try catch

// router.get('/:id', async (req, res) => {
//     try 
//     {
//         const product = await Product.findById(req.params.id);
      
//       if(product)
//       {
//         res.json(product);
//       }
//       else{
//         res.status(404).json({message: 'Product not found'});
//       }    
//     } 
//     catch (err) 
//     {
//         console.log(err.message);
//         res.json(err);    
//     }
// });