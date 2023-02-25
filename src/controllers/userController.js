const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")


const createUser = async function(req,res){
    try{
        let data = req.body

        let savedData = await userModel.create(data)
        return res.status(201).send({ status: true, message: "User created successfully",data: savedData})
    }

    catch(error){
        res.status(500).send({msg: error.message})

    }
}

const updateUser = async function(req,res){
    try{

        let data = req.body
        let userId = req.params.userId
    
        let updateUser = await userModel.findOneAndUpdate({_id:userId},data,{new:true})
         return res.status(200).send({status:true,message:" user updated Successfully",data:updateUser})

    }
    catch(error){
        res.status(500).send({msg:error.message})
    }
}

const getUserbyId = async function(req,res){
    try{
        let userId = req.params.userId

        const userData = await userModel.findById(userId)
        if(!userData)
        return res.status(404).send({status:false,message:"User not found"})

        res.status(200).send({status:true,message:"Success",data:userData})

    }
    catch(err){
        res.status(500).send({msg:err.message})
    }

}


const loginUser = async function (req, res) {
    try {
        let loginData = req.body

        let user= await userModel.findOne(loginData)

        let token = jwt.sign({userId: user._id.toString()},"leads_connect" ,{expiresIn:'15d'}
        )

        return res.status(200).send({ status: true, message: "Success", data: { userId: user._id, token: token }})
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports ={ createUser,updateUser,loginUser,getUserbyId}