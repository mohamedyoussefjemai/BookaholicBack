const express = require('express')
const router = express.Router()
const RequestsController = require('../Controllers/requests.controller');
const book = require('../models/book.model');

// Create a request
router.post('/add-request', RequestsController.create);
// Retrieve trade send
router.get('/read-trade-sended/:username', RequestsController.findSendTrade);
// Retrieve a trade receive
router.get('/read-trade-received/:username', RequestsController.findReceiverTrade);
// set trade+1
router.put('/accept-trade-request/:id', RequestsController.updateAccept);
// set reject trade
router.put('/refuse-trade-request/:id', RequestsController.updateReject);
// Retrieve sale send
router.get('/read-sale-sended/:username', RequestsController.findSendSale);
// Retrieve a sale receive
router.get('/read-sale-received/:username', RequestsController.findReceiverSale);
// set sale+1
router.put('/accept-sale-request/:id', RequestsController.updateAcceptSale);
// set reject sale
router.put('/refuse-sale-request/:id', RequestsController.updateRejectSale);
// Delete trade sended
router.delete('/delete-trade-request/:id', RequestsController.DeleteTrade);
module.exports = router