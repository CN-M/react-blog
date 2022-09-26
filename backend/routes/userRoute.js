const router = require('express').Router();

const {
  getAllUsers,
  getUserDetails,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.route('/register')
  .post(registerUser);

router.route('/login')
  .post(loginUser);

router.route('/')
  .get(getAllUsers)
  .post(registerUser);

// router.route('/:id')
router.route('/:username')
  .get(getUserDetails)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
