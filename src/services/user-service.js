const { UserRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes')
const { Auth } = require('../utils/common');
const userRepository = new UserRepository();

/*
    POST : /cities
    req-body {email :"abc@def.com",password:"12345"}
*/
async function signUp(data)
{
    try {
        const user = await userRepository.create(data);
        return user;
    } catch (error) {
        let explanation = [];
        console.log("user service create error ,",error.message);
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
        throw new AppError(`Cannot create a new user entry, ${error?.message} `,StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function signIn(data)
{
    try {
        const user = await userRepository.getUserByEmail(data.email);
        if(!user)
        {
            throw new AppError('No user found for the given email',StatusCodes.BAD_REQUEST);
        }
        const passwordMatch = Auth.checkPassword(data.password, user.password);
        console.log('password match ',passwordMatch);
        if(!passwordMatch)
        {
            throw new AppError('Invalid password',StatusCodes.BAD_REQUEST);
        }
        // { input } integrity constraint to get on decrypt
        const jwt  = Auth.createToken({id:user.id, email:user.email}); 
        return jwt;
    } catch (error) {
        // if(error instanceof AppError) throw error;
        console.log('user service signIn error' ,error);
        throw new AppError(`Something went wrong , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
module.exports = {
    signUp,
    signIn
}
