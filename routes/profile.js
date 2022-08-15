const express = require('express')
const router = express.Router();

const {isAuthenticatedUser} = require('../middlewares/auth')

const {createProfile,getProfile,getAllProfile,updateProfile,deleteProfile,getProfilesBySearch} = require('../controllers/profileController')
router.route('/create').post(isAuthenticatedUser,createProfile);
router.route('/').get(getAllProfile);
router.route('/serach').get(getProfilesBySearch);
router.route('/:id').get(getProfile).patch(updateProfile).delete(deleteProfile);




module.exports = router;