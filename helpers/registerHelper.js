const db = require('../models');
const bcrypt = require('bcrypt');
const fs = require("fs");
const path = require("path");

const users = db.users;
const passwordCheck = /(?=.*[0-9])(?=.*[!@#$%^&*_)(])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_)(]{8,}/g

async function set(req, res) {
  try {
    const tempPath = req.file.path;
    const {username, password, rp} = req.body;
    let targetPath = path.join(__dirname, "../uploads/"+req.file.originalname);
    const user = await users.findOne({where: {username: username}}).then(user => user);

    if (!!user) {
      res.render('layouts/registration.hbs');
    } else {
      if (/* password.match(passwordCheck) && */ username !== '' && password === rp) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)
        if (!!req.file.originalname)
          fs.rename(tempPath, targetPath, (err) => { 
            if (err) { 
              console.log(err); 
            } 
          });
        else targetPath = null;
        
        users.create({
          image: targetPath,
          username: username,
          password: hash
        });
       
        res.redirect('/');
      } else {
        res.render('layouts/registration.hbs', {password: password, username: username});
      }
    }
  } catch(e) {
    console.log(e.message)
    res.status(500).send(e.message);
  }
}


module.exports = {set};