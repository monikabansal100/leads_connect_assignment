const cartModel = require("../models/cartModel")
const orderModel = require("../models/orderModel")
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

const createOrder = async function (req,res){
    try{
        let userId = req.params.userId
        let cartId = req.body.cartId
        // console.log(cartId);
        let data = req.body

        const findUser= await userModel.findOne({_id: userId})
        const checkCart = await cartModel.findOne({_id: cartId, userId: userId})
        // console.log(checkCart)

        
        if(!checkCart.items.length){
            return res.status(400).send({status: false, message: "bro, you can't order with empty cart..."})
        }
        let total = 0
        checkCart.items.forEach(element => total += element.quantity)
        let placeOrder = {}
        placeOrder.userId = userId
        placeOrder.items = checkCart.items
        placeOrder.totalItems = checkCart.totalItems
        placeOrder.totalPrice = checkCart.totalPrice
        placeOrder.totalQuantity = total
        placeOrder.cancellable = data.cancellable
        placeOrder.status = "pending" //it will be updated from updated api

        
        let orderData = await orderModel.create(placeOrder)
        

         return res.status(201).send({status: true, message: " order created Successfully", data: orderData})
        
    }
    catch(error){
        return res.status(500).send({message: error.message})
    }
}


 const updateOrder = async function(req,res)
{
    try
    {
        const orderId = req.body.orderId
        const status = req.body.status
        const userId = req.params.userId
        const data = req.body

 
        const checkOrder = await orderModel.findOne({ _id:orderId, userId })

        if(checkOrder.cancellable!=true && status=="cancelled")
        return res.status(400).send({status:false,message:"Order is not cancellable"})


        let updatedOrder = await orderModel.findOneAndUpdate({ _id: orderId,userId },{status},{new:true})
       
        return res.status(200).send({ status: true, data:updatedOrder })

    }
    catch(err)
    {
        return res.status(500).send({status:false,message:err.message})
    }
}

module.exports= {createOrder,updateOrder}