module.exports = punch

function punch (app, Projects, Users, rndstring) {
  app.post('/newPunch', async (req,res)=>{
    let json = {
      company : req.body.company,
      price : req.body.price,
      token : req.body.token
    }
    let result = await Projects.update({token : req.body.projectToken}, {
      $push : {punchMember : json}
    })
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    let new_punch = {
      projectToken : req.body.projectToken,
      price : req.body.price,
      name : req.body.company
    }
    result = await Users.update({token : req.body.token}, {
      $push : {myPunchList : new_punch}
    })
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    let project = await Projects.findOne({token : req.body.projectToken})
    let money = project.punchPrice + req.body.price
    result = await Projects.update({token : req.body.token}, {
      $set : {punchPrice : money}
    })
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    res.status(200).json({message: "success!"})
  })
  // .post('/useMoney', as)
}
