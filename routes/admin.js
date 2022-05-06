const express = require("express")
//const { render } = require("express/lib/response")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")

router.get('/', (req, res) => {
   res.render("admin/index")
})

router.get('/categorias', (req, res) => {
   Categoria.find().sort({date: 'DESC'}).then((categorias) => {
      res.render("admin/categorias", {categorias: categorias})
   }).catch((err) => {
      req.flash("error_msg", "Houve um erro ao carregar as Categorias")
      res.redirect("/admim")
   })
})

router.get('/categorias/add', (req, res) => {
   res.render("admin/add_categorias")
})

router.post('/categorias/nova', (req, res) => {

   var erros = []

   if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
      erros.push({texto: "Nome inválido"})
   }

   if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
      erros.push({texto: "Slug inválido"})
   }

   if(req.body.nome.length < 2 ){
      erros.push({texto: "Nome da Categoria muito curto"})
   }

   if(erros.length > 0){
      res.render("admin/add_categorias", {erros: erros})
   }else{
      const novaCategoria = {
         nome: req.body.nome,
         slug: req.body.slug
      }

      new Categoria(novaCategoria).save().then(()=> {
         req.flash("success_msg", "Categoria criada com sucesso")
         res.redirect("/admin/categorias")
      }).catch((err) => {
         req.flash("error_msg", "Houve um erro ao criar a Categoria <br>"+err+"<br>Tente Novamente")
         res.redirect("/admin")
      })
   }

})

router.get('/categorias/edit/:id', (req, res) => {
   Categoria.findOne({_id: req.params.id}).then((categoria) => {
      res.render("admin/edit_categorias", {categoria: categoria})
   }).catch((err) => {
      req.flash("error_msg", "Houve um erro, Categoria não existente")
      res.redirect("/admin/categorias")
   })
})

router.post('/categorias/edit', (req, res) => {
   Categoria.findOne({_id: req.body._id}).then((categoria) => {
      categoria.nome = req.body.nome
      categoria.slug = req.body.slug

      categoria.save().then(() => {
         req.flash("success_msg", "Categoria editada com Sucesso")
         res.redirect("/admin/categorias")
      }).catch((err) => {
         req.flash("error_msg", "Houve um erro ao salvar a categoria")
         res.redirect("/admin/categorias")
      })

   }).catch((err) => {
      req.flash("error_msg", "Houve um erro ao editar a categoria")
      res.redirect("/admin/categorias")
   })
})

module.exports = router