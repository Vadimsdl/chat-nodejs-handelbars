const {Router, request} = require('express');
const router = Router();
const register = require('../helpers/registerHelper');
const midlregister = require('../middlewares/register')
const bodyParser = require('body-parser');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', upload.single('image'), (req, res) => register.set(req, res));

module.exports = router;