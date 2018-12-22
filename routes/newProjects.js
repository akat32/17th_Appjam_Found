module.exports = newProjects

function newProjects(app, Projects, Users, rndstring, multer) {
  var storage = multer.diskStorage({
    destination: (req,file,cb)=>{
      cb(null, '/home/ubuntu/17th_Appjam_Found/public/project'); //C:\\Users\\parktea\\Desktop\\17Appjam\\public
      // cb(null, 'C:\\Users\\parktea\\Desktop\\17Appjam\\public\\project');
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
  app.post('/newProject', upload.single('img'), async (req,res)=>{
    let link = "http://18.222.180.31:3000/project/" + req.file.filename
    let json = {
      mainImg : link,
      category : req.body.category,
      title : req.body.title,
      token : rndstring.generate(22),
      company : req.body.company,
      index :  req.body.index,
      userToken: req.body.userToken,
      price : req.body.price
    }
    json = new Projects(json)
    let result = await json.save()
    let newProject = { token : json.token }
    result = await Users.update({token : req.body.userToken}, {
      $push : { projectList : newProject }
    })
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    res.status(200).json({message: "success!"})
  })
  .post('/addProjectImg', upload.single('img'), async (req,res)=>{
    let json = { link : "http://18.222.180.31:3000/project/" + req.file.filename}
    let result = await Projects.update({token : req.body.token}, {
      $push : {img : json}
    })
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    return res.status(200).json({message : "success!"})
  })
  .post('/projectList', async (req,res)=>{
    let result = await Projects.find()
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

    res.status(200).json({list: result})
  })
  .post('/myProjectList', async (req,res)=>{
    let result = await Users.findOne({token : req.body.token})
    result = result.projectList
    let list = []
    for(var i=0; result[i] != null; i++) {
      let project = await Projects.findOne({token : result[i].token})
      if(project) list.push(project)
    }
    res.status(200).json({list : list})
  })
  .post('/returnProject', async (req,res)=>{
    let result = await Projects.findOne({token : req.body.token})
    if(!result) return res.status(404).json({message : "Not found!"})
    else return res.status(200).json({project : result})
  })
}
