const cartModel = require("../models/cartModel")
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");


const createCart = async function (req, res) {
    try {
        let userId = req.params.userId
        console.log(userId);
        let productId = req.body.productId
        let data = req.body

        const findUser= await userModel.findOne({_id: userId})
        const findProduct= await productModel.findOne({_id: productId})
        let cartData= {
            userId: userId,
            items: [{productId: productId, quantity: 1}],
            totalPrice: findProduct.price,
            totalItems:1
        }
        let savedData= await cartModel.create(cartData)
        return res.status(201).send({ status: true, message: "cart created Successfully", data: savedData})

    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


const getCart = async function (req, res) {
    try {
        let userId = req.params.userId

        let checkCart = await cartModel.findOne({ userId })
        if (!checkCart) {
            return res.status(404).send({ status: false, message: "no such cart found with this userId" })
        }

        return res.status(200).send({ status: true, message: "Success", data: checkCart })
    }


    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const updateCart = async function (req, res) {
    try {

        const userId = req.params.userId
        const cartId = req.body.cartId
        const data = req.body

        // const findUser= await userModel.findOne({_id: userId})
        const updatedCart = await cartModel.findByIdAndUpdate({_id: cartId},
            { $set: req.body} ,{ new: true });
          res.status(200).send({ status: true, message: "Success", data: updatedCart});
           
        }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



const deleteCart = async function (req, res) {

    try {
        let userId = req.params.userId
        let cartId= req.body.cartId

        const findUser= await userModel.findOne({_id: userId})
        let checkCart =await cartModel.findOneAndDelete({userId ,isDeleted: false}, {$set:{isDeleted: true}})
 
        return res.status(200).send({status:false,message:"Cart has been deleted successfully"})

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}


module.exports = { createCart, getCart, updateCart,deleteCart }



