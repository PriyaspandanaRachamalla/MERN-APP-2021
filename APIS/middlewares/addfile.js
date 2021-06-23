const cloudinary = require("cloudinary").v2;
const multer=require("multer");
const {CloudinaryStorage}=require("multer-storage-cloudinary");



    //configure cloudinary
cloudinary.config({
    cloud_name:'dca0bsgdj',
    api_key:'264563313477629',
    api_secret:'lmq7fhep3vDJtw_Brp_t3Y8Hyxw'
  });
  
  
  //configuring cloudinary storage
  const clsStorage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
      return{
        folder:'CTS',
        public_key:file.fieldname + '-' + Date.now()
      }
    }
  })
  
  
  //configure multer
  const multerObj=multer({storage:clsStorage})








module.exports=multerObj;