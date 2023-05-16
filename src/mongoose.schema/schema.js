const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    type: String,
    avatar: String,
    name: String,
    lastname: String,
    age: Number,
    phone: Number,
    email: String,
    password: String,
    address:String,
    city: String,
    country: String,
    products: [{
        name: String,
        price: Number,
        image: String,
        amount: Number,
        
    }]
});

module.exports = {
    User: mongoose.model('users', userSchema)
}