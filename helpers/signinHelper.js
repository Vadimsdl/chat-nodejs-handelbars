async function check(req, res) {
  try {
   res.render('layouts/chat.hbs', {username: req.body.username, image: req.body.image});
  }
  catch (e) {
    res.status(500).send(e.message);
  }
}

module.exports = {check};