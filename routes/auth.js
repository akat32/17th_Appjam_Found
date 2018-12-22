module.exports = auth

function auth(app, Users, rndstring, multer, fs) { // path 와 multer 은 충돌난다.
  var storage = multer.diskStorage({
    destination: (req,file,cb)=>{
      cb(null, '/home/ubuntu/17th_Appjam_Found/public'); //C:\\Users\\parktea\\Desktop\\17Appjam\\public
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
  app.post('/signup', async(req,res)=>{
    var user = new Users(req.body);
    user.token = rndstring.generate(40);
    try {
      var result = await user.save();
    }catch(e){
      if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
      if(e instanceof ValidationError) return res.status(400).json({message: e.message});
      if(e instanceof paramsError) return res.status(400).json({message: e.message});
    }
    res.status(200).json({message : "success!"});
  })
  .post('/signin', async (req,res)=>{
    let result = await Users.findOne(req.body)
    if(!result) return res.status(404).json({message : "User Not Found!"})
    else return res.status(200).json({user : result})
  })
  .post('/signset', async (req,res)=>{
    let result = await Users.findOne({token : req.body.token})
    if(!result) return res.status(404).json({message : "Users Not found!"})
    let json = {
      name : req.body.name,
      id : req.body.id,
      passwd : req.body.passwd,
      token : req.body.token,
      itemList : result.itemList,
      punchList : result.punchList,
      phone : req.body.phone,
      profileImg : result.profileImg
    }
    result = await Users.deleteOne({token : req.body.token})
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    json = new Users(json)
    result = await json.save();
    return res.status(200).json({message : "success!"})
  })
  .post('/signdel', async (req,res)=>{
     var result = await Users.deleteOne({token : req.body.token})
     if(!result.ok) return res.status(500).json({message : "ERR!"})
     res.status(200).json({message : "success!"})
  })
  .post('/idExist', async(req,res)=>{
    let result = await Users.findOne({id : req.body.id})
    if(!result) return res.status(200).json({message : "success!"})
    else return res.status(409).json({message : "id exist"})
  })
  .post('/img', upload.single('img'), async (req,res)=>{
    let json = {profileImg : "baseurl" + req.file.filename}
    let url = "http://18.222.180.31:3000/" + req.file.filename
    let result = await Users.update({token : req.body.token}, {
      $set : {profileImg : url}
    })
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    res.status(200).json({message : "success!"})
  })
  .post('/aa', async (req,res)=>{
    let result = await Users.find()
    res.send(result)
  })
}
