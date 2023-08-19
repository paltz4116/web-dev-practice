const express = require(`express`);
const ordersController = require(`../controllers/orders-controllers`);
const router = express.Router();

router.post(`/`, ordersController.addOrder);

module.exports = router;
