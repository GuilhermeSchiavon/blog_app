const express = require("express")
const { render } = require("express/lib/response")
const res = require("express/lib/response")
//const { render } = require("express/lib/response")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")
require("../models/Postagem")
const Postagem = mongoose.model("postagens")

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
         req.flash("error_msg", "Houve um erro ao criar a Categoria ->"+err)
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
         req.flash("error_msg", "Houve um erro ao salvar a categoria ->" + err)
         res.redirect("/admin/categorias")
      })

   }).catch((err) => {
      req.flash("error_msg", "Houve um erro ao editar a categoria")
      res.redirect("/admin/categorias")
   })
})

router.get('/categorias/deletar/:id', (req, res) => {
   Categoria.deleteOne({_id: req.params.id}).then(() => {
      req.flash("success_msg", "Categoria excluida")
      res.redirect("/admin/categorias")
   }).catch((err) => {
      req.flash("error_msg", "Houve um erro ao excluir a categoria ->" + err)
      res.redirect("/admin/categorias")
   })
})

router.get("/postagens", (req, res) => {
   Postagem.find().populate("categoria").sort({date: 'DESC'}).then((postagens) => {
      res.render("admin/postagens", {postagens: postagens})
   }).catch((err) => {
      req.flash("error_msg", "Houve um erro ao carregar as Postagens")
      res.redirect("/admim")
   })
})

router.get("/postagens/add", (req, res) => {
   Categoria.find().sort({date: 'DESC'}).then((categorias) => {
      res.render("admin/add_postagens", {categorias: categorias})
   }).catch((err) => {
      req.flash("error_msg", "Houve um erro ao criar uma nova Postagem -> " + err)
      res.redirect("/admim/postagens")
   })
})

router.post("/postagens/gravar", (req, res) => {
   var erros = []
   //tratamento de erros
   if (req.body.categoria == "0") {
      erros.push({ texto: "Nenhuma categoria foi encontrada, crie uma nova Categoria antes" })
   }
   if(erros.length > 0){
      res.render("admin/postagens", {erros: erros})
   }else{
      const novaPostagem = {
         titulo: req.body.titulo,
         slug: req.body.slug,
         descricao: req.body.descricao,
         conteudo: req.body.conteudo,
         categoria: req.body.categoria
      }
      new Postagem(novaPostagem).save().then(()=> {
         req.flash("success_msg", "Postagem criada com sucesso")
         res.redirect("/admin/postagens")
      }).catch((err) => {
         req.flash("error_msg", "Houve um erro ao criar a Postagem ->"+err)
         res.redirect("/admin/postagens/add")
      })
   }
})

router.get('/postagens/edit/:id', (req, res) => {
   Postagem.findOne({_id: req.params.id}).then((postagem) => {
      Categoria.find().sort({date: 'DESC'}).then((categorias) => {
         res.render("admin/edit_postagem", {postagem: postagem, categorias: categorias})
      })
   }).catch((err) => {
      req.flash("error_msg", "Houve um erro, Postegem não existente")
      res.redirect("/admin/postagens")
   })
})

router.post('/postagens/gravar_edicao', (req, res) => {
   Postagem.findOne({_id: req.body.id}).then((postagem) => {
      postagem.titulo = req.body.titulo,
      postagem.slug = req.body.slug,
      postagem.descricao = req.body.descricao,
      postagem.conteudo = req.body.conteudo,
      postagem.categoria = req.body.categoria
      postagem.date = new Date()
      
      postagem.save().then(() => {
         req.flash("success_msg", "Postagem editada com Sucesso")
         res.redirect("/admin/postagens")
      }).catch((err) => {
         req.flash("error_msg", "Houve um erro ao salvar a Postagem ->" + err)
         res.redirect("/admin/postagens")
      })

   }).catch((err) => {
      req.flash("error_msg", "Houve um erro ao editar a Postagem")
      res.redirect("/admin/postagens")
   })
})

router.get('/postagens/deletar/:id', (req, res) => {
   //Postagem.remove({_id: req.params.id}).then(() => { //OBS: Outra forma de remover apagar todos os registros
   Postagem.deleteOne({_id: req.params.id}).then(() => {
      req.flash("success_msg", "Postagem excluida")
      res.redirect("/admin/postagens")
   }).catch((err) => {
      req.flash("error_msg", "Houve um erro ao excluir a Postagem ->" + err)
      res.redirect("/admin/postagens")
   })
})

module.exports = router
