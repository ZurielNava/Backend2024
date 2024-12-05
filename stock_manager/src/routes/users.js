const {Router} = require('express');
const {getAllUsers, CreateUser, remove, getUserById, updateUser, loginUser} = require('../controllers/users');

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', CreateUser);
router.put('/:id', updateUser);
router.delete('/:id', remove);
router.post('/login',loginUser);


module.exports = router;