const boom = require('@hapi/boom');

function validatorHandler ( escheme, property ) { //funcion que recibe un esquema y una propiedad
  return (req, res, next) => {
    const data = req[property];
    const {error} = escheme.validate(data, {abortEarly: false});
   if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
