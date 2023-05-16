const { StatusCodes } = require("http-status-codes");
const { User } = require("../mongoose.schema/schema");
const { verificarCampoRequerido } = require("../utils/verificarCampoRequerido");

const addProduct = async (ctx) => {
    
    
    
    try {
        const {email} = ctx.request.body
        const { name, price, image, amount } = ctx.request.body;

        let err = 'Los siguientes campos son requeridos:';
        const camposFaltantes = [];

        verificarCampoRequerido(name, `${err} Name`);

        const user = await User.findOne({ email });
        const productoExistente = user.products.find(product => product.name === name);

        if (productoExistente) {
    
            const posicionDelProducto = user.products.indexOf(productoExistente);
    
            if (price) productoExistente.price = price
            if (image) productoExistente.image = image
            if (amount) productoExistente.amount = amount
    
            user.products[posicionDelProducto] = productoExistente;
    
        } else {

            try {
                verificarCampoRequerido(price);
            } catch (error) {
                camposFaltantes.push('Precio')
            }
    
            try {
                verificarCampoRequerido(image);
            } catch (error) {
                camposFaltantes.push('Imagen')
            }
    
            try {
                verificarCampoRequerido(amount);
            } catch (error) {
                camposFaltantes.push('Cantidad')
            }
    
            if (camposFaltantes.length) {
                
                ctx.status = StatusCodes.BAD_REQUEST
                ctx.body ={ 
                    error: err = err + ' ' + camposFaltantes.join(', ')
                }
            }
        }
        user.products.push({
            name,
            price,
            image,
            amount
        })
        await user.save() 

        ctx.status = 201;
          
    } catch (error) {        
        ctx.status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
        ctx.body = {
           message: error.message
        }
    }
}
module.exports = {
    addProduct
}