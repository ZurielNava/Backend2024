const { Router } = require('express');
const { getAllUsers, getUserById, CreateUser, updateUser, destroyUser, userProtected} = require('../controllers/users');
const verifyToken = require('../middlewares/verifyToken');

const router = Router();
router.get('/', verifyToken, getAllUsers);//sesion iniciada
router.get('/protected', verifyToken, userProtected)
router.get('/:id', verifyToken,getUserById);//sesion iniciada
router.post('/', verifyToken, CreateUser);//sesion iniciada y usurio administrador
router.put('/:id', verifyToken, updateUser);//sesion iniciada y usurio administrador
router.delete('/:id', verifyToken, destroyUser);//sesion iniciada y usurio administrador


module.exports = router;