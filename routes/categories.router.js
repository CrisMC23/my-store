const express = require('express');
const router = express.Router();

router.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
    // name: 'Producto 1',
    // price: 100
  });
});

module.exports = router; //exportamos el router



