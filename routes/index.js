var express = require('express');
var router = express.Router();

const mailsRouter = require('./mailsRouter');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/api', mailsRouter);

module.exports = router;
