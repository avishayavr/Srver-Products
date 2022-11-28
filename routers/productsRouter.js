const productsBLL = require("../BLL/productsBLL");

const express = require("express")
const router = express.Router()


// get data function
router.get("/", async (req, res) => {
    try {
      const products = await productsBLL.getAllData();
      res.status(200).json(products);
    } catch (e) {
      res.status(500).json({ msg: e });
    }
  });

// get data by id function
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
      const product = await productsBLL.getDataById(id);
      res.status(200).json(product);
    } catch (e) {
      res.status(500).json({ msg: e });
    }
  });

//   create a new product
router.post("/", async (req , res) =>{
    try {
        const product = req.body;
        const status = await productsBLL.createProduct(product);
        res.status(200).json({ msg: status });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
})

// update a product
router.put("/:id" , async (req, res) =>{
    try {
        const product = req.body;
        const {id} = req.params;
        const status = await productsBLL.updateProduct(id, product);
        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({msg:error});
    }
})

// deleting product
router.delete("/:id", async (req, res) =>{
    try {
        const {id} = req.params;
        const status = await productsBLL.deleteProduct(id)
        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({msg:error})
    }
})

  module.exports = router;