require('dotenv').config();
require("dns").setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Database assembles in service of algorithm");
}).catch((err)=>{
    console.log("Database encountered a rift",err);
})
const express=require("express");
const app=express();
const textgeneraterouter=require("./routes/textgenerateroute");
const authrouter=require("./routes/authroutes");
app.use(express.json());
app.use('/api',textgeneraterouter);
app.use('/api',authrouter);
port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
})