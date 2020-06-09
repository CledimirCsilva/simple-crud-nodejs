const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


//Require dos Models
require('../models/Categorias')
const Categoria = mongoose.model('categorias')

router.get('/', (req, res) => {
    Categoria.find().lean().then((result) => {
        res.status(200)
        res.json(result)
    }).catch((err) => {
        res.status(500)
        res.json(err)
    })
})

router.post('/add', (req, res) => {

    let erros = []

    if(!req.body.categoryName || typeof req.body.categoryName == undefined || req.body.categoryName == null) {
        erros.push({erro: 'Nome de categoria obrigatório'})
    } 
    if(req.body.categoryName.length < 3){
        erros.push({erro: 'Nome de categoria muito pequeno'})
    }
    if(erros.length > 0){
       res.status(400)
       res.json(erros)
    } else{
        var newCategory = {
            name: req.body.categoryName
        }
        new Categoria(newCategory).save().then((result) => {
            res.status(201)
            res.json(result)
        }).catch((err) => {
            res.status(500)
            res.json(err)
        })
    }
})

module.exports = router