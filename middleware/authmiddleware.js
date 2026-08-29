const jwt=require('jsonwebtoken');


function verifytoken(req,res,next){
    const authheader=req.headers.authorization;
    if(!authheader){
        return res.status(400).json({message:"No one can enter the temple of algorithm without the Token of Loyalty"});
    }
    const token=authheader.split(' ')[1];
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        res.status(401).json({message:"The Token is not valid or faded away in the depths of algorithm"});
    }
}

module.exports=verifytoken;