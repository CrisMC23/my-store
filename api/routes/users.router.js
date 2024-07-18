const express = require('express');
const routerApi = require('.');
const router = express.Router('./users.router');

router.get('/user', (req, res) => {   //nuevo endpoint
  const { limit, offset } = req.query;  //parametros de la query
    if (limit && offset) {   ///nombres
      res.json({
        limit,
        offset   //validamos que existan
      });
    } else {
      res.send('No hay parametros'); //si no existen
    }
});

module.exports = router; //exportamos el router
