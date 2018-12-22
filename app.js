import express from 'express'
import bodyParser from 'body-parser'
import rndstring from 'randomstring'
import fs from 'fs'
import path from 'path'
import multer from 'multer'
let app = express()

import { Users, Items } from './mongo'
require('./func')

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '1gb', extended: false }));


const PORT = 3000
app.listen(PORT, ()=>{
  console.log ('Server On ' + PORT)
})

require('./routes/auth')(app, Users, rndstring, multer, fs)
require('./routes/newItem')(app, Items, Users, rndstring, path, multer)
