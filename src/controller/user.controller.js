const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');

const { User } = require("../mongoose.schema/schema");
const WebError = require("../utils/web.error");

const viewRegistUser = async function (ctx) {
    await ctx.render('formulario-registrar-usuario');
};

const allUsers = async (ctx) => {
    ctx.status = 200; 
    const users = await User.find({}); 
    ctx.body = {
        users,
        message: 'Successfully retrieved all users'
    }; 
};

const registUser = async (ctx) => {
  
    const {type, avatar, name, lastname, age, phone, email, password, address, city, country } = ctx.request.body

    try {

        if (!type) {
            throw new WebError('Seleccione un tipo de usuario', StatusCodes.BAD_REQUEST);
        }

        if (!name) {
            throw new WebError('El nombre de usuario es requerido', StatusCodes.BAD_REQUEST);            
        }

        if (!lastname) {
            throw new WebError('El apellido del usuario es requerido', StatusCodes.BAD_REQUEST);
        }

        if (!age) {
            throw new WebError('La edad del usuario es requerida', StatusCodes.BAD_REQUEST);
        }
        
        if (!phone) {
            throw new WebError('El número de teléfono es requerido', StatusCodes.BAD_REQUEST); 
        }

        var isPhoneRedExp = /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/;

        if ( !isPhoneRedExp.test(phone)) {
            throw new WebError('El numero de teléfono no es valido', StatusCodes.BAD_REQUEST);
        }

        if ( !email) {
            throw new WebError(`El email es requerido`, StatusCodes.BAD_REQUEST);
        }
    
        var isEmailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!isEmailRegExp.test(email)) {
            throw new WebError('El email debe ser un correo electrónico', StatusCodes.BAD_REQUEST);
        }
    
        if (!password) {
            throw new WebError('La contraseña es requerida', StatusCodes.BAD_REQUEST);
        }

        if (!address) {
            throw new WebError('La dirección es requerida', StatusCodes.BAD_REQUEST);
        }
       
        if (!city) {
            throw new WebError('La ciudad es requerida', StatusCodes.BAD_REQUEST);
        }
       
        if (!country) {
            throw new WebError('El pais requerido', StatusCodes.BAD_REQUEST);
        }

        const usuarioExistente = await User.findOne({ email });
    
        if ( usuarioExistente?.email) {
            throw new WebError('El email ya esta en uso', StatusCodes.BAD_REQUEST);
        }
    
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = new User({
            type,
            avatar,
            name,
            lastname,
            age,
            phone,
            email,
            password: hashedPassword,
            address,
            city,
            country,
            products: [],
        })

        ctx.status = 201;
        ctx.body = {
            newUser,
            message: `Usuario ${name} ${lastname} con ${email}, registrado con exito`
        }
        
        await newUser.save();
        
    } catch (error) {
        ctx.status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
        ctx.body = {
            error: error.message
        }
    }
}
module.exports = {
    allUsers,
    registUser,
    viewRegistUser,
}