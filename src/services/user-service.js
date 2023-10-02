const { UserRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes')
const userRepository = new UserRepository();


/*
    POST : /cities
    req-body {email :"abc@def.com",password:"12345"}
*/
async function createUser(data)
{
    try {
        const user = await userRepository.create(data);
        return user;
    } catch (error) {
        let explanation = [];
        console.log("user service create error ,",error);
        if(error.name == 'TypeError')
        {
            console.log("inside error ",error);
            throw new AppError('Cannot create a new user',StatusCodes.INTERNAL_SERVER_ERROR)
        }
        if(error.name == 'SequelizeValidationError' || error.name == "SequelizeUniqueConstraintError")
        {
            error.errors.forEach(err => {
                explanation.push(err.message)
            });
            console.log("inside service create error ",explanation);
            throw new AppError(explanation,StatusCodes.BAD_REQUEST)
        } 
        throw new AppError('Cannot create a new user entry',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


module.exports = {
    createUser
}
