const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")

router.get('/', (req, res) => {
   res.render("admin/index")
})

router.get('/categorias', (req, res) => {
   res.render("admin/categorias")
})

router.get('/categorias/add', (req, res) => {
   res.render("admin/add_categorias")
})

router.post('/categorias/nova', (req, res) => {
   const novaCategoria = {
      nome: req.body.nome,
      slug: req.body.slug
   }

   new Categoria(novaCategoria).save().then(()=> {
      res.send("Categoria salva com sucesso!")
   }).catch((err) => {
      res.send("Erro ao Gravar a categoria: " + err)
   })
})

module.exports = router
