const productModel = require("../models/productModel")

const createProduct = async function (req, res) {
    try {
        let data = req.body
        let savedData = await productModel.create(data)

        res.status(201).send({ msg: "product created successfully", data: savedData })

    }
    catch (error) {
        res.status(500).send({msg: error.message})
    }
}


const getProducts = async function (req, res) {
    try {
        let data = req.body
        let savedData = await productModel.find(data)

        res.status(200).send({ data: savedData })

    }
    catch (error) {
        res.status(500).send({msg: error.message})
    }
}


const updateProduct = async function (req, res) {
    try {
        let productId = req.params.productId
        let data = req.body
        let savedData = await productModel.findOneAndUpdate({_id: productId, isDeleted: false}, data,{new: true})

        res.status(200).send({ msg: "product updated successfully", data: savedData })

    }
    catch (error) {
        res.status(500).send({msg: error.message})
    }
}


const deleteProduct = async function (req, res) {
    try {
        let productId= req.params.id
        let data = req.body
        let savedData = await productModel.findOneAndUpdate({ _id: productId, isDeleted: false}, {$set:{isDeleted: true}})

        res.status(200).send({ msg: "product has been deleted successfully"})

    }
    catch (error) {
        res.status(500).send({msg: error.message})
    }
}



module.exports = { createProduct, getProducts, updateProduct, deleteProduct}