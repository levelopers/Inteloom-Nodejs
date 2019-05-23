var express = require('express');
var router = express.Router();
const Product = require('../models/Product')
const NODEMAILER_CONFIG = require('../configs/nodemailer-config')
const nodemailer = require("nodemailer");


// get /products
router.get('/products', function (req, res, next) {
  Product.getAllProducts(function (e, products) {
    if (e) {
      e.status = 406; return next(e);
    }
    if (products.length < 1) {
      return res.status(404).json({ message: "products not found" })
    }
    res.json({ products: products })
  })
});


// get /product/:id
router.get('/product/:id', function (req, res, next) {
  let productId = req.params.id;
  Product.getProductByID(productId, function (e, item) {
    if (e) {
      e.status = 404; return next(e);
    }
    else {
      res.json({ product: item })
    }
  });
});

// post /checkout
router.post('/checkout', function (req, res, next) {
  const {order} = req.body
  console.log('order', order)
  //type check ...

  //mail response contet HTML
  const mail_content=`
  <h1>Thanks for shopping on ACME</h1>
  <br>
  ${order.map(p=>`<p>${p.title}</p>`)}
  `

  //send mail config
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: NODEMAILER_CONFIG.username,
      pass: NODEMAILER_CONFIG.password
    }
  });
  let mailOptions = {
    from: NODEMAILER_CONFIG.username,
    to: 'youcancallmeallen@gmail.com',
    subject: 'Test',
    html: mail_content
  };

  //sending mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error.message);
    }
    console.log(info);
    res.status(200).json({
      status:200,
      message:"send mail success",
      data:order,
      info:info
    })
  });
})

module.exports = router;
