const { Joi, Segments } = require('celebrate');

const adminValidation = {
  
    updateUser: {
        [Segments.PARAMS]: {
            email: Joi.string().email().required()
        },
        [Segments.BODY]: Joi.object().keys({
            userStatus: Joi.string().required()
        })
    },

    deleteUser: {
        [Segments.PARAMS]: {
            email: Joi.string().email().required()
        }
    }
}

module.exports = { adminValidation }