var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

// creating the new instance of s3
  var s3 = new aws.S3({})
try{
    // setting the configuration to asw-s3
  aws.config.update({
    // these are provided in the aws security credentials
    secretAccessKey:'AKIAIFTDWPRRXKIWYVCQ',
    accessKeyId:'AYmQqgSZ0LLX+fv1LtpImqb4VX7uv/wRwzpTGF27',
    region:'Asis Pacific(Mumbai)'//optional
  })
  //multer is middleware used to upload the file
  var upload = multer({
     
   
    storage: multerS3({
      s3: s3,
      bucket: 'fundoo-notes',//my bucket name in aws-s3
      acl: 'public-read',//access options
      //callback function od
      metadata: function (_req, file, callback) {
          console.log("in metadata");
          
        callback(null, file);
      },
      key: function (_req, _file, callback) {
          console.log("in key function");
          
        callback(null, Date.now().toString())
      }
    })
  })
}catch(err){
  console.log(err);
  
}

//
module.exports = upload;