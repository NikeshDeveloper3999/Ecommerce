const express = require('express')
const router = express.Router();
const upload = require('../Middleware/Multer');



const productController = require('../controllers/ProductController');
const adminAuth = require('../Middleware/AdminAuth');

 
router.post(
  "/add",adminAuth,
  upload.fields([{name:'image1' , maxCount:1},{name:'image2' , maxCount:1} , {name:'image3' , maxCount:1} , {name:'image4' , maxCount:1}]), 
  productController.addProduct
);

router.post('/find',adminAuth, productController.findProductByCode)
router.post('/delete', adminAuth, productController.deleteProductById);
router.get('/list',adminAuth, productController.listproduct)
router.get('/userlist',productController.listproduct)
    
module.exports = router

