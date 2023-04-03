const express = require("express")
const mongoose= require("mongoose")
const cors= require("cors")
const multer = require("multer")
const route = require("./Route/Routes")
const app = express();
const PORT = process.env.PORT || 1000
const DB = "mongodb+srv://jay420:gRLzeLdOa6ENyasF@cluster0.dnkg3q6.mongodb.net/e-com"

app.use(express.static('Images'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:"*"
}))

mongoose.connect(DB,{useNewUrlParser : true})
.then((res)=>console.log("connected with DB..."))
.catch((err)=>console.log(err))
app.use("/",route)

app.use("/*",(req,res)=>{
  return res.send("end point is wrong")
})

app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))