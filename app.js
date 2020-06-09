const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Desativa o cabeçalho X-Powered-By
app.disable('x-powered-by')

require('dotenv-safe').config()

//Mongoose
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.log('Erro ao conectar com o MongoDB:'))

//BodyParser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Registra rotas
const indexRouter    = require('./routes/index')
const productsRouter = require('./routes/products')
const categoryRouter = require('./routes/category')

//Define a Engine de Views
app.set('view engine', 'ejs')

//Associa a rota(url) com a router correspondente
app.use('/', indexRouter)
app.use('/produtos', productsRouter)
app.use('/categorias', categoryRouter)

app.listen(process.env.PORT, () => console.log('Server running on port: '+process.env.PORT))

module.exports = app