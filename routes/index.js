var express = require('express');
var router = express.Router();
var Product=require('../models/product');
var Cart=require('../models/cart');
var Order=require('../models/order');
var Drug=require('../models/drug');
// var Web3=require("../node_modules/web3/dist/web3.min.js");

/* GET home page. */
router.get('/', function(req, res, next) {
   Product.find(function(err, docs){
     if(err){
      console.log(err);
     }
    res.render('shop/index', { title: 'Shopping Cart', products: docs });
  });  
}); 

router.get('/add-to-cart/:id', function(req, res, next){
     var productId=req.params.id;
     var cart= new Cart(req.session.cart? req.session.cart: {items: {}});

     Product.findById(productId, function(err, product){
          if(err){
            return res.redirect('/');
          }
          cart.add(product, product.id);
          req.session.cart=cart;
          console.log(req.session.cart);
          res.redirect('/');
     });
});

router.get('/reduce/:id', function(req, res, next){
  var productId=req.params.id;
  var cart= new Cart(req.session.cart? req.session.cart: {items: {}});
       cart.reduceByOne(productId);
       req.session.cart=cart;
       console.log(req.session.cart);
       res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next){
  var productId=req.params.id;
  var cart= new Cart(req.session.cart? req.session.cart: {items: {}});
       cart.removeAll(productId);
       req.session.cart=cart;
       console.log(req.session.cart);
       res.redirect('/shopping-cart');
});


router.get('/shopping-cart', function(req, res, next){
   if(!req.session.cart){
     return res.render('shop/shopping-cart', {products:null});
   }
   var cart= new Cart(req.session.cart);
   res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', isLoggedIn, function(req, res, next){
  if(!req.session.cart){
    return res.render('/shopping-cart');
  }
  var cart= new Cart(req.session.cart);
  res.render('shop/checkout', {total: cart.totalPrice});
});

router.post('/checkout', isLoggedIn ,function(req, res, next){
  if(!req.session.cart){
    return res.render('/shopping-cart');
  }
  var cart= new Cart(req.session.cart);
  var order= new Order({
       user: req.user,
       cart: cart,
       address: req.body.address,
       name: req.body.name
  });
  order.save(function(err, result){
       req.flash('success', 'Succesfully bought product');
       req.session.cart=null;
       res.redirect('/user/profile');
  });
});


router.get('/manufactrer',function(req, res, next){

  Drug.find({id: req.id}, function(err, orders){
    if(err){
      return res.write('Error!');
    }
    res.render('shop/manufactrer', {orders: orders});
   });
});

 router.post('/manufactrer', isLoggedIn ,function(req, res, next){
  Drug.find({drugid: req.body.id}).count(function(err, product){
    if(err){
      console.log(err)
    }
     console.log('ll'+product);
     if(product>0){

      
    Drug.update({drugid:req.body.id},{holder:req.body.holder},function(err, result){
      res.redirect('/manufactrer');
      console.log('llllkk');

    });
  
  }
  else{
    
    var order= new Drug({
      drugid: req.body.id,
      holder: req.body.holder
    });
     order.save(function(err, result){
      console.log(result);
      console.log(err);
      res.redirect('/manufactrer');
 });
}
});
  
});


module.exports = router;
 
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
       return next();
  }
  req.session.oldUrl=req.url;
  res.redirect('/user/signin');
}