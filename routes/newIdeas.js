module.exports = newIdeas

function newIdeas(app, Ideas, Users, rndstring, multer) {
  var storage = multer.diskStorage({
    destination: (req,file,cb)=>{
      cb(null, '/home/ubuntu/17th_Appjam_Found/public/idea'); //C:\\Users\\parktea\\Desktop\\17Appjam\\public
    },
    filename: (req,file,cb)=>{
      var newStr = rndstring.generate(33);
      newStr = newStr + ".PNG"
      cb(null, newStr);
    },
    limits: {
      fileSize: 5 * 1024 * 1024
    }
  })
  const upload = multer({storage : storage});
  app.post('/newIdea', upload.single('img'), async(req,res)=>{
    let json = {
      profileImg : req.body.profileImg,
      category : req.body.category,
      name : req.body.name,
      title : req.body.title,
      index : req.body.index,
      userToken : req.body.userToken,
      token : rndstring.generate(22)
    }
    json = new Ideas(json)
    
  })
}
