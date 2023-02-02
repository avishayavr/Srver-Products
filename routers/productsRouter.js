const express = require('express');
const router = express.Router();
// const {verifyToken} = require('../middleware/authenticateToken')
const { getAllData,
  //  getDataById, createProduct, updateProduct, deleteProduct
  } = require('../controllers/productsController');

router.get('/',getAllData)
// router.get('/:id', getDataById)
// router.put('/:id', createProduct);
// router.delete('/:id', updateProduct);
// router.delete('/:id',deleteProduct);


module.exports = router;