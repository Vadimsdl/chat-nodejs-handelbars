const db = require('../models');
const bcrypt = require('bcrypt');
var multer  = require('multer');
const users = db.users;

const passwordCheck = /(?=.*[0-9])(?=.*[!@#$%^&*_)(])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_)(]{8,}/g;

async function set(req, res) {
  try {
    const {image, username, password, rp} = req.body;
    const t = await users.findOne({where: {username: username}}).then(user => user)

    if (!!t) {
      res.render('layouts/registration.hbs');
    } else {
      if (/*password.match(passwordCheck) &&*/ username !== '' && password === rp) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)
        users.create({
          image: image,
          username: username,
          password: hash
        })
        
        res.redirect('/');
      } else {
        res.render('layouts/registration.hbs', {password: password, username: username});
      }
    }
  } catch(e) {
    res.status(500).send(e.message);
  }
}

module.exports = {set};