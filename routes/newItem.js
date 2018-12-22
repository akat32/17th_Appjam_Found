module.exports = newItem

function newItem(app, Items, Users, rndstring) {
  app.post('/newItem', async(req,res)=>{
    var item = new Items(req.body)
    item.token = rndstring.generate(12);
    item.currentStaff = 1
    let result = await item.save()
    let json = { token : item.token}
    result = await Users.update({token : req.body.token}, {
      $push : {itemList : json}
    })
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    json.token = req.body.token
    result = await Items.update({token : item.token}, {
      $push : {staffList : json}
    })
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    res.status(200).json({message : "success!"})
  })
  .post('/itemset', async(req,res)=>{
    let result = await Items.findOne(req.body.token)
    let json = {
      token : req.body.token,
      title : req.body.title,
      itemName : req.body.itemName,
      itemIntroduce : req.boey.itemIntroduce,
      currentStaff : result.currentStaff,
      staffList : result.staffList,
      category : req.body.category,
      representativeToken : req.body.userToken
    }
    result = await Items.remove({token : req.body.token})
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    json = new Items(json)
    result = await json.save();
    if(!result.ok) return res.status(500).json({message:  "ERR!"})
    else return res.status(200).json({message : "success!"})
  })
  .post('/itemdel', async(req,res)=>{
    var result = await Items.remove({token : req.body.token})
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    res.status(200).json({message : "success!"})
  })
  .post('/bb', async (req,res)=>{
    let result = await Items.find()
    res.send(result)
  })
}
