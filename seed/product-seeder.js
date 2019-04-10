var Product=require('../models/product');
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping2', {
  })
  .then(() => { console.log('MongoDB connected...')})
  .catch(err => console.log(err));

var products=[
    new Product({
        title: 'Omeprazolo',
        price: 100,
        imagePath: 'https://c8.alamy.com/comp/BCJKHR/tamiflu-75-mg-tablets-are-shown-one-of-the-medicines-prescribed-to-BCJKHR.jpg'
    }),
    new Product({
        title: 'Crestor',
        price: 200,
        imagePath: 'https://cdn.cnn.com/cnnnext/dam/assets/161123201801-03-most-prescribed-medications-restricted-super-169.jpg'
    }),
    new Product({
        title: 'NIDA',
        price: 100,
        imagePath: 'https://www.rosheta.com/upload/2828c97c76af67ef1adcfe2c09981382b1700e482d9c1b8e0ad2420791dde183.jpg'
    }),
    new Product({
        title: 'RX',
        price: 200,
        imagePath: 'https://www.german-way.com/wordpress/wp-content/uploads/2016/12/rx_omeprazol-ch-usa_800.jpg'
    }),
    new Product({
        title: 'Super-169',
        price: 100,
        imagePath: 'https://cdn.cnn.com/cnnnext/dam/assets/161123201756-01-most-prescribed-medications-restricted-super-169.jpg'
    }),
    new Product({
        title: 'Crestozone',
        price: 100,
        imagePath: 'https://cdn1.medicalnewstoday.com/content/images/articles/263/263490/bottle-of-plain-white-pills.jpg'
    })
];

var done=0;
for(var i=0; i < products.length ; i++){
    products[i].save(function(err, result){
        done++;
        if(err){
        console.log(err);  }
        if(done === products.length){
            exit();
        }
    });
}


function exit(){
    mongoose.disconnect();
}