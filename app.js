import express from 'express'
import bodyParser from 'body-parser'
import rndstring from 'randomstring'
import fs from 'fs'
import path from 'path'
import multer from 'multer'
let app = express()

import { Users, Ideas, Projects } from './mongo'
require('./func')

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '1gb', extended: false }));


const PORT = 3000
app.listen(PORT, ()=>{
  console.log ('Server On ' + PORT)
})

require('./routes/auth')(app, Users, rndstring, multer, fs)
require('./routes/newIdeas')(app, Ideas, Users, rndstring, multer)
require('./routes/newProjects')(app, Projects, Users, rndstring, multer)
