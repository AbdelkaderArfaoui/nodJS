var express = require('express');
var router = express.Router();
const Product = require('../model/Product.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('addProduct');
  });

router.get('/allProduct', async function(req, res, next) {
    const products = await Product.find();
    res.render('products',{products});
  });
router.post("/addProduct", async function (req, res, next) {
    const { libelle, price,description,quantite} = req.body;
    console.log(libelle, price,description,quantite);
    try {
        const p1=await Product.findOne({libelle:libelle});
        if(!p1){
            console.log("add product")
            const product = new Product({ libelle:libelle, prix:price,description:description,quantite:quantite,inStock:true});
            await product.save();
            res.redirect("http://localhost:3000/products/allProduct");
            // const products = await Product.find();
            // res.render('products',{products});
            
        }else{
            console.log("libelle exist !! ");
            // const products = await Product.find();
            // res.render('products',{products});
            res.redirect("http://localhost:3000/products/allProduct");
            
        
        }
   
    } catch (error) {
      res.json(error.message);
    }
  });

  router.get("/deleteProduct/:id", async function (req, res, next) {
    const { id } = req.params;
    console.log(id);
    try {
      await Product.findOneAndDelete({ _id: id });
      // const products = await Product.find();
      // res.render('products',{products});
      res.redirect("http://localhost:3000/products/allProduct");
    } catch (error) {
      res.json(error.message);
    }
  });

  router.put("/Update/:id", async function (req, res, next) {
    const { id } = req.params;
    const { libelle, price,description,quantite} = req.body;
    console.log(libelle, price,description,quantite);
    console.log(id);
    try {
        const p =await Product.findOne({_id:id});
        if(p){
          console.log("update product");
            const product = new Product({ libelle:libelle, prix:price,description:description,quantite:quantite,inStock:true});
            await Product.findOneAndUpdate({ _id: id ,product});
            console.log("product updated");

            
          
        }else{
            next(createError(404));
        }
    } catch (error) {
      res.json(error.message);
    }
  });
  router.get('/notif', async function(req, res, next){
    res.render("notification")
  })
module.exports = router;
