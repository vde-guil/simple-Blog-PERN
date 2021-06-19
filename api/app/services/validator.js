const validator = {
    //schema qui return
    validateBody: (schema) =>  (request, response, next) => {
        const { error } = schema.validate(request.body);
        if (error) {
            response.status(400).json(error.message)
        } else {
            next();
        }
    }

};

module.exports = validator;