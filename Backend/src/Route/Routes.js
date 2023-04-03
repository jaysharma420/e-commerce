const express = require("express")
const router = express.Router()
const {registration,Login} = require("../Controller/User")
const {createproduct,getproduct,deleteproduct,updateproduct,getbyid,searchproduct} = require("../Controller/product")
const { upload } = require("../Middleware/upload")



router.post("/registration",registration)
router.post("/login",Login)
router.post("/createproduct",upload,createproduct)
router.get("/getproduct",getproduct)
router.get("/getbyid/:id",getbyid)
router.delete("/deleteproduct",deleteproduct)
router.put("/updateproduct",upload,updateproduct)
router.post("/searchproduct",searchproduct)
module.exports = router;