const { Router } = require('express');
const router = Router();
const titleCtrl = require('../controllers/title.controller');

router.route('/')
    .post(titleCtrl.postTitle);

router.route('/search')
    .post(titleCtrl.searchTitle);

module.exports = router;