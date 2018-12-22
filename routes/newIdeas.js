module.exports = newIdeas

function newIdeas(app, Ideas, Users, rndstring, multer) {
  var storage = multer.diskStorage({
    destination: (req,file,cb)=>{
      cb(null, '/home/ubuntu/17th_Appjam_Found/public/idea'); //C:\\Users\\parktea\\Desktop\\17Appjam\\public
      // cb(null, 'C:\\Users\\parktea\\Desktop\\17Appjam\\public\\idea');
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
  app.post('/newIdea', async(req,res)=>{
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
    let result = await json.save()
    let jsonToken = { token : json.token}
    result = await Users.update({token : req.body.userToken}, {
      $push : {ideaList : jsonToken}
    })
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    res.status(200).json({message: "success!"})
  })
  .post('/addIdeaImg', upload.single('img'), async (req,res)=>{
    let json = { link : "http://18.222.180.31:3000/idea/" + req.file.filename}
    let result = await Ideas.update({token : req.body.token}, {
      $push : {img : json}
    })
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    return res.status(200).json({message : "success!"})
  })
  .post('/ideaList', async (req,res)=>{
    let result = await Ideas.find()
    let list1 = [], list2 = [], list3 = [], list4 = [], list5 = [], list6 = [], list7 = [], list8 = []
    for (var i=0;result[i]!= null;i++) {
      if(result[i].category === "IT") list1.push(result[i])
      if(result[i].category === "스포츠") list2.push(result[i])
      if(result[i].category === "교육") list3.push(result[i])
      if(result[i].category === "유통 및 판매") list4.push(result[i])
      if(result[i].category === "쇼핑") list5.push(result[i])
      if(result[i].category === "외식 및 요리") list6.push(result[i])
      if(result[i].category === "대여 및 배달") list7.push(result[i])
      if(result[i].category === "기타") list8.push(result[i])
    }
    if(req.body.number == 1) result = list1
    if(req.body.number == 2) result = list2
    if(req.body.number == 3) result = list3
    if(req.body.number == 4) result = list4
    if(req.body.number == 5) result = list5
    if(req.body.number == 6) result = list6
    if(req.body.number == 7) result = list7
    if(req.body.number == 8) result = list8

    res.status(200).json({list : result})
  })
  .post('/addreply', async (req,res)=>{
    let json = {
      index : req.body.index,
      profileImg : req.body.profileImg,
      name : req.body.name
    }
    let result = await Ideas.update({token : req.body.token}, {
      $push : {reply : json}
    })
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    return res.status(200).json({message : "success!"})
  })
  .post('/myIdeaList', async (req,res)=>{
    let result = await Users.findOne({token : req.body.token})
    result = result.ideaList
    let list = []
    for(var i=0; result[i] != null; i++) {
      let idea = await Ideas.findOne({token : result[i].token})
      if(idea) list.push(idea)
    }
    res.status(200).json({list : list})
  })
  .post('/returnIdea', async (req,res)=>{
    let result = await Ideas.findOne({token : req.body.token})
    if(!result) return res.status(404).json({message : "Not found!"})
    else return res.status(200).json({idea : result})
  })
  .post('/bb', async(req,res)=>{
    let result = await Ideas.find()
    res.send(result)
  })
}
