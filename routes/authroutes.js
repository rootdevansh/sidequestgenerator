const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const express=require('express');
const router=express.Router();
router.use(express.json());
const user=require('../models/userschema');

router.post('/register',async(req,res)=>{
    const {username,password}=req.body;
    if(!username||!password){
        return res.status(400).json({message:"Wanderer You Must Speak your name and Secret Word To Enter The Temple of Algorithm"});
    }
    try{
        const hashedpassword=await bcrypt.hash(password,10);
        const newUser=await user.create({username,password:hashedpassword});
        res.status(201).json({message:"Welcome Wanderer Inside the temple of algorithm.",newUser});
    }catch(err){
        res.status(400).json({message:"This name already Belongs to another wanderer.."});
    }
});

router.post('/login',async (req,res)=>{
    const{username,password}=req.body;
     if(!username||!password){
        return res.status(400).json({message:"Wanderer You Must Speak your name and Secret Word To Enter The Temple of Algorithm"});
    }
    try{
        const User=await user.findOne({username});
        if(!User){
            return res.status(404).json({message:"No Wanderer By that name is known here.."});
        }
        const ismatch=await bcrypt.compare(password,User.password);
        if(!ismatch){
            return res.status(401).json({message:"That's The Wrong Secret Code"});
        }
        const token=jwt.sign({id:User._id,username:User.username},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).json({message:"welcome Back Wanderer",token});
    }catch(err){
        res.status(400).json({ message: "The algorithm encountered a rift.", err });
    }

});

module.exports=router;
