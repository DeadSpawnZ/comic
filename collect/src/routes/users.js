const { Router } = require('express');
const router = Router();
const userCtrl = require('../controllers/user.controller');

router.route('/login')
    .post(userCtrl.signIn);

router.route('/register')
    .post(userCtrl.signUp);

router.route('/myuser')
    .get(userCtrl.myUser);

/*router.get('/myuser', (req, res) => {
    res.send('About me');
});*/

module.exports = router;