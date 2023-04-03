const multer = require("multer")

const upload = multer({
   storage:multer.diskStorage({
        destination:function(req, file,cb){
         console.log("body data is here",req.body);
         console.log("file is here",file);
           cb(null,"../src/Images")
        } ,
        filename:function(req,file,cb){
         console.log("body data is here",req.body);
         console.log("file is here",file);
          req.namefile = file.originalname
           cb(null,file.originalname)
        }
    
   })
}).single("file")

module.exports = {upload}
