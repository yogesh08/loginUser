var express = require('express');
var router = express.Router();
const logger = require('tracer').colorConsole();
let userCtrl = require('../controller/user.controller');
const password = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async function(req, res) {
  try {
    logger.info(req.body);
    let result = await userCtrl.save(req.body);
    res.jsonp(result);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
});

router.post('/login', async function(req, res) {
  try {
    let {userName, password} = req.body;
    if (userName == '' && password == '') {
      return res.status(404).json({err: 'invalid credentials'});
    }
    let result = await userCtrl.login({userName, password});
    logger.info('login result', result);
    res.json(result);
  } catch(err) {
    console.error(err);
    return Promise.reject(err);
  }
});

router.get('/list', password.authenticate('jwt', {session: false}), async function(req, res) {
  try {
    logger.debug('authenticated');
  } catch(err) {
    console.error(err);
    return Promise.reject(err);
  }
});

module.exports = router;
