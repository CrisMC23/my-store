const express = require('express');

const productService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handlers');
const {crateProductSchema, updateProductSchema, getProductSchema} = require('./../schemas/product.schema');

const router = express.Router();
const service = new productService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
} );

router.get('/filter', (req, res) => {
  res.send('Soy un filter');
});

router.get ('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
 try {
   const { id } = req.params;
   const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(crateProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
   try{
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
     next(error);
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});


module.exports = router; //exportamos el router
