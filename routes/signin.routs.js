const {Router, request} = require('express');
const router = Router();
const signIn = require('../helpers/signinHelper')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const midle = require('../middlewares/signin')

router.post('/', urlencodedParser, midle.check, (req, res) => signIn.check(req, res));

module.exports = router;