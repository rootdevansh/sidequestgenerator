const mongoose=require('mongoose');

const sidequestschema=new mongoose.Schema({
    prompt:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true,
    },
    createdat:{
        type:Date,
        default:Date.now,
    },
    writtenByWanderer:{
        type:Boolean,
        default:false
    },
});

module.exports=mongoose.model("sidequest",sidequestschema);