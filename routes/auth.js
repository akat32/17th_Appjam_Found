module.exports = auth

function auth(app, Users, rndstring, path, multer) {
  const upload = multer({
   storage: multer.diskStorage({
     destination: (req,file,cb)=>{
       cb(null, '/home/ubuntu/Server/public/video'); ///root/meouk/MeoukTalk/public/profile/
     },
     filename: (req,file,cb)=>{
       var newStr = rndstring.generate(33);
       newStr = newStr + ".PNG"
       cb(null, newStr);
     }
   }),
   limits: {
     fileSize: 5 * 1024 * 1024
   }
  });
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
    let json = {
      name : req.body.name,
      id : req.body.id,
      passwd : req.body.passwd,
      token : req.body.token,
      itemList : result.itemList,
      punchList : result.punchList,
      phone : req.body.phone
    }
    result = await Users.remove({token : req.body.token})
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    json = new Users(json)
    result = await json.save();
    if(!result.ok) return res.status(500).json({message:  "ERR!"})
    else return res.status(200).json({message : "success!"})
  })
  .post('/signdel', async (req,res)=>{
     var result = await Users.remove({token : req.body.token})
     if(!result.ok) return res.status(500).json({message : "ERR!"})
     res.status(200).json({message : "success!"})
  })
  .post('/idExist', async(req,res)=>{
    let result = await Users.findOne({id : req.body.id})
    if(!result) return res.status(200).json({message : "success!"})
    else return res.status(409).json({message : "id exist"})
  })
  .post('/img', async (req,res)=>{
    let result = await
  })
}
