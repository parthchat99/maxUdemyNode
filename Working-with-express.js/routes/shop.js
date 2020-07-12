const path = require('path')
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
const adminData = require('./admin')

router.get('/',(req, res, next) => {
    const products = adminData.products;
    console.log('shop.js',adminData.products)
    //Html file
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    //Pug file
    res.render('shop',{
        prods: products,
        pageTitle:'Shop',
        path:'/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCss: true,
    });
});

module.exports = router;