const express=require("express");
const router=express.Router();
router.use(express.json());

const {generatesidequest}=require('../services/geminiservice');

router.post('/sidequest',async (req,res)=>{
    const {prompt}=req.body;
    if(!prompt){
        return res.json({message:"Wanderer,a prompt of fate is required to enlighten your path!"});
        
    }
    const prayertoalgorithm=(`O Divine algorithm Generate a sidequest for the fellow wanderer, regarding "${prompt}" this`);
   try{ const text=await generatesidequest(prayertoalgorithm);
    res.status(200).json({path:text});
   }catch(err){
    res.status(400).json({message:"The divine algorithm encountered a rift."});
   }
})

module.exports=router;