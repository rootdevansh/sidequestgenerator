const express=require("express");
const router=express.Router();
router.use(express.json());
const {sidequest}=require('../models/sidequestschema');

const {generatesidequest}=require('../services/geminiservice');

router.post('/sidequest',async (req,res)=>{
    const {prompt}=req.body;
    if(!prompt){
        return res.json({message:"Wanderer,a prompt of fate is required to enlighten your path!"});
        
    }
    const prayertoalgorithm=(`O Divine algorithm Generate a sidequest for the fellow wanderer, regarding "${prompt}" this`);
   try{ const text=await generatesidequest(prayertoalgorithm);
    const savedquest=await sidequest.create({
       prompt:prompt,
        text:text,
    });
    res.status(200).json({savedquest});


   }catch(err){
    res.status(400).json({message:"The divine algorithm encountered a rift."});
   }
})

router.get('/sidequest/:id',async(req,res)=>{
    try{
    const quest=await sidequest.findById(req.params.id)
    if(!quest){
        return res.status(404).json({message:"No Sidequest offered by the Algorithm is known by this ID"});
    }
    res.status(200).json({quest});
    }catch(err){
        res.status(400).json({message:"The divine algorithm encountered the following rift.",err});
    }
});

router.get('/sidequest',async(req,res)=>{
    try{
    const quest=await sidequest.find().sort({createdat:-1});
    if(quest.length===0){
        return res.status(404).json({message:"No Sidequest offered by the Algorithm till now"});
    }
    res.status(200).json({quest});
    }catch(err){
        return res.status(400).json({message:"The divine algorithm encountered the following rift.",err});
    }
});

module.exports=router;