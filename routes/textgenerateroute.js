const express=require("express");
const router=express.Router();
router.use(express.json());
const {sidequest}=require('../models/sidequestschema');
const verifytoken=require('../middleware/authmiddleware');

const {generatesidequest}=require('../services/geminiservice');

router.post('/sidequest',async (req,res)=>{
    const {prompt}=req.body;
    if(!prompt||prompt.trim().length===0){
        return res.status(400).json({message:"Wanderer,a prompt of fate is required to enlighten your path!"});
        
    }
    if(prompt.length>300){
        return res.status(400).json({message:"Wanderer,Keep you curiosity summarised and to the point,The algorithm does'nt answer to 300+ word prompts"});
        
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

router.delete('/sidequest/:id',verifytoken,async(req,res)=>{
    try{
        const deletedquest=await sidequest.findByIdAndDelete(req.params.id);
    
    if(!deletedquest){
        return res.status(404).json({message:"No Sidequest offered by the Algorithm is known by this ID"});
    }
    res.status(200).json({message:"The Quest faded away in the Uncomprehended Memory of the Divine Algorithm"});
}catch(err){
    return res.status(400).json({message:"The divine algorithm encountered the following rift.",err});
}
});

router.put('/sidequest/:id',verifytoken,async(req,res)=>{
    const {text}=req.body;
    if(!text||text.trim().length===0){
        return res.status(400).json({message:"The wanderer Must be willing to rewrite the journey in order to Defy fate.. "});
    }
    try{
        const updatedquest=await sidequest.findByIdAndUpdate(
            req.params.id,
            {text:text,writtenByWanderer:true},
            {new:true,runValidators:true}
        );
        if(!updatedquest){
            return res.status(404).json({message:"No Sidequest offered by the Algorithm is known by this ID"});
        }
        res.status(200).json({message:"The Wanderer Took The leap of faith and wrote the fate by their will",updatedquest});
    }catch(err){
        return res.status(400).json({message:"The divine algorithm encountered the following rift.",err});
    }
})

module.exports=router;