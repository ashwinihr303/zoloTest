var express = require('express');
var router = express.Router();
var bl = require('../public/javascripts/bl');
var productData = require('../public/javascripts/product');

router.get('/all', async(req, res, next) => {
    try {
        const response = await bl.getAllProducts();
        res.status(200).send(response);
    } catch (err) {
        next(err);
    }
});

router.post('/add', async(req, res, next) => {
    try {
        //creating the data object to insert in database
        const productData = new productData(req.body);
        const response = await bl.addProduct(productData);
        res.status(201).send(response);

    } catch (err) {
        next(err);
    }
});
router.get('/:productName', async(req, res, next) => {
    try {
        const productName = req.params.productName;
        const response = await bl.getProductByName(productName);
        res.status(200).send(response);
    } catch (err) {
        next(err);
    }
});

module.exports = router;