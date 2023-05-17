const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require("http-status-codes");

const WebError = require("../utils/web.error");
const { User } = require("../mongoose.schema/schema");

const secret = process.env.SECRET;

const viewLogin = async function (ctx) {
    await ctx.render('formulario-inicio-sesion');
};


const login = async (ctx) => {

    const { email, password } = ctx.request.body;
    let user;
    
    try {
        if (!email) {
            throw new WebError('El email de usuario es requerido', StatusCodes.BAD_REQUEST)
        }

        if (!password) {
            throw new WebError('La contraseña es requerida', StatusCodes.BAD_REQUEST)
        }

        user = await User.findOne({ email });

        if (!user?.email) {
            throw new WebError('El usuario no esta registrado', StatusCodes.UNAUTHORIZED);
        }

        const hashedPassword = user.password;
        const isCorrectPassword = await bcrypt.compare(password, hashedPassword)

        if (!isCorrectPassword) {
            throw new WebError('El nombre de usuario o contraseña es incorrecta',  StatusCodes.UNAUTHORIZED);
        }

        const tokenBody = {
            email: user.email,
            name: user.name,
        }
    
        const token = jwt.sign(tokenBody, secret, { expiresIn: '1h' });
          
        ctx.body ={ token };
    

    } catch (error) {
        ctx.status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
        // logger.log('error', error.message)
        ctx.body = {
            message: error.message
        }           
    }

    
}

// const logout = (ctx) => {
    
//     const { name } = ctx.request.body
//     ctx.body = {
//         message: `Hasta luego ${name}`
//     }

// }

module.exports = {
    viewLogin,
    login,
    // logout,
}