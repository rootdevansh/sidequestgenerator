require('dotenv').config();
const express=require("express");
const app=express();
const router=require("./routes/textgenerateroute");
app.use(express.json());
app.use('/api',router);
port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
})