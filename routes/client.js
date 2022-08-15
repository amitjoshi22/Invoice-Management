const express = require('express');
const router = express.Router();

const { getClients,createClient,updateClient,deleteClient,getClientsByUser } = require('../controllers/clientController')

router.route('/').get(getClients)
router.route('/user').get(getClientsByUser)
router.route('/create').post(createClient)
router.route('/:id').patch(updateClient).delete(deleteClient)

module.exports = router;