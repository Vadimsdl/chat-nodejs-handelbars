const db = require('../models');
const bcrypt = require('bcrypt');

const users = db.users;

async function check(req, res, next) {
  try {
    const {username, password} = req.body;
    const user = await users.findOne({where: {username: username}}).then(user => user)
    const checks = await bcrypt.compare(password, user.dataValues.password).then(bol => bol)
    req.body = user.dataValues;
    if (checks) {
      next();
    }
    else {
      res.redirect('/');
    } 
  }
  catch (e) {
    res.redirect('/');
  }
}

module.exports = {check};