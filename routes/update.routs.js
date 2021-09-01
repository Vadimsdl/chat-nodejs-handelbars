const {Router, request} = require('express');
const router = Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const db = require('../models');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require("fs");

const users = db.users;

router.post('/', upload.single('image'), async (req, res) => {
  const {password, username} = req.body;

  if (!!req.file?.originalname) {
    const tempPath = req.file.path;
    let targetPath = path.join(__dirname, "../uploads/"+req.file.originalname);
   
    fs.rename(tempPath, targetPath, (err) => { 
      if (err) { 
        console.log(err); 
      } 
    });
    await users.update({image: targetPath}, {where: { username: username }})
  } 
  if(!!password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await users.update({password: hash}, {where: { username: username }});
  } 
  res.status(201).send(false);

});

module.exports = router;