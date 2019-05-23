const mongoose = require('mongoose')

var Product = require('../models/Product')

const MONGO_URL = require('../configs/mongo-config')

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, });

var products = [
  new Product({
    imagePath: "imagepath 1",
    title: "https://firebasestorage.googleapis.com/v0/b/inteloom-5d76d.appspot.com/o/images%2FSuper_Outfit.png?alt=media&token=5260f286-b91e-4697-95d0-8b7cb7a49a99",
    description: 'Does not give one the ability to fly.',
    price: 29.99,
    quantity: 10
  }),
  new Product({
    imagePath: "https://firebasestorage.googleapis.com/v0/b/inteloom-5d76d.appspot.com/o/images%2FRocketSkates.png?alt=media&token=011814a9-925c-4a91-af4f-0044ac178310",
    title: 'Rocket Skates',
    description: 'Let you skate at unlimited speed.',
    price: 19.99,
    quantity: 16
  }),
  new Product({
    imagePath: "https://firebasestorage.googleapis.com/v0/b/inteloom-5d76d.appspot.com/o/images%2FBird_Seed.png?alt=media&token=d97b45ea-0569-4e2c-9ee0-50048f665226",
    title: 'Bird Seed',
    description: "Part of a bird's nutritious meal.",
    price: 9.99,
    quantity: 6
  }),
  new Product({
    imagePath: "https://firebasestorage.googleapis.com/v0/b/inteloom-5d76d.appspot.com/o/images%2FLeg_Muscle_Vitamins.png?alt=media&token=e7794583-c4c0-442c-a52d-6d97810a464f",
    title: 'Leg Muscle Vitamins',
    description: "Gives your legs the vitamins it needs to run faster than ever before!",
    price: 59.99,
    quantity: 1
  }),
]

for (let i = 0; i < products.length; i++) {
  products[i].save(function (e, r) {
    if(e){
      throw e
    }
    // console.log(r);
    if (i === products.length - 1) {
      console.log('populating products is done');
      exit();
    }
  });
}

//exit
function exit() {
  console.log('mongodb is exiting');
  mongoose.disconnect();
}