import asyncHandler from "express-async-handler";

import Order from "../models/orderModel.js";

/*
desc - create new order
route - post /api/orders
access - private
*/

const createOrder = asyncHandler(async (req, res) => {
  const {
    shippingAddress,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;


  if (orderItems && orderItems.lenght === 0) 
  {
    res.status(400); // Bad Request
    throw new Error("No Order Item");
  } 
  else 
  {
    // we can create a new order object - created a new constructor Obj fn using new keyword
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    
    const createdOrder = await order.save(); // to save/write in the DB
    res.status(201).json(createdOrder); 
  }

});



/*
desc - get order by ID
route - GET /api/orders/:id
access - private
 */

const getOrderById = asyncHandler( async(req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email'); 

  if (order)
  {
    res.json(order);
  }
  else
  {
    res.status(404);
    throw new Error('Order Not Found');
  }

});





/*
desc - Update order by pay
route - PUT /api/order/:Id/pay
access - private
 */

const updateOrderToPaid = asyncHandler( async(req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true;
    order.paidAt= Date.now()
    order.paymentResult = {
      id: req.body.id,
      state: req.body.state,
      update_time : req.body.update_time,
      email_address: req.body.email_address,
    };
    
    const  updatedOrder = await order.save();
    res.json(updatedOrder)
  }
  else
  {
    res.status(404)
    throw new Error('Order not Found');
  }
});




/*
des - GET logged in user's orders 
route -GET /api/orders/myorders
access - private
*/

const getMyOrders = asyncHandler ( async (req, res) => {
  const orders = await Order.find({user: req.user._id});
  res.json(orders);
});



/*
des - GET all orders 
route -GET /api/orders
access - private/admin
*/

const getOrders = asyncHandler ( async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name email');
  res.json(orders)
});




/*
des - update order to delivered 
route - PUT /api/orders/:id/deliver
access - private/admin
*/

const updateOrderToDelivered = asyncHandler ( async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  }
  else
  {
    res.status(404);
    throw new Error('Order Not Found');
  }
});





export { createOrder, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered };



//populate - instead of sending 2md request for user details we can use .populate('user', 'name email'); to get the user details.