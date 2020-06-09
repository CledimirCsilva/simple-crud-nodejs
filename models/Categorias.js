const mongoose = require('mongoose')
const Schema = mongoose.Schema

Categoria = new Schema({
    name: {
        type: String,
        required: true
    }
})

mongoose.model('categorias', Categoria)