const express = require('express');
const routes = express.Router();

const {createInvoice,updateInvoice,deleteInvoice,getInvoice,getInvoicesByUser,getTotalCount} = require('../controllers/invoiceController');
const router = require('./profile');

router.route('/count').get(getTotalCount) //use to generate invoice serial number
router.route('/:id').get(getInvoice).patch(updateInvoice).delete(deleteInvoice)
router.route('/').get(getInvoicesByUser).post(createInvoice)
router.route('/create').post(createInvoice)

module.exports = router;

