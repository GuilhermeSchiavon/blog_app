const express = require("express")
const { render } = require("express/lib/response")
const res = require("express/lib/response")
//const { render } = require("express/lib/response")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs") 

require("../models/Usuario")
const Usuario = mongoose.model("usuarios")


router.get('/registro', (req, res) => {
    res.render("usuarios/registro")
 })

router.post('/registro', (req, res) => {
      var erros = []
   
      if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
         erros.push({ texto: "Nome inválido" })
      }
   
      if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
         erros.push({ texto: "E-mail inválido" })
      }
   
      if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
         erros.push({ texto: "Senha inválida" })
      }
   
      if (req.body.senha.length < 6) {
         erros.push({ texto: "Senha muito curta" })
      }
      
      if (req.body.senha != req.body.senhaConfirme) {
         erros.push({ texto: "Senhas não conferem" })
      }

      if (erros.length > 0) {
         res.render("usuarios/registro", { erros: erros })
      } else {
         Usuario.findOne({ email: req.body.email }).then((usuario) => {
            if (usuario) {
               req.flash("error_msg", "Já existe um usuário com esse email")
               res.redirect("/user/registro")
            } else {
               const novoUsuario = {
                  nome: req.body.nome,
                  email: req.body.email,
                  senha: req.body.senha
               }
               bcrypt.genSalt(10, (erro, salt) => {
                  bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                     if (erro) {
                        req.flash("error_msg", "Houve um erro ao salvar o usuário")
                        res.redirect("/user/registro")
                     } else {
                        novoUsuario.senha = hash

                        new Usuario(novoUsuario).save().then(() => {
                           req.flash("success_msg", "Usuário criado com sucesso")
                           res.redirect("/user/login")
                        }).catch((err) => {
                           req.flash("error_msg", "Houve um erro ao criar o usuário ->" + err)
                           res.redirect("/user/registro")
                        })
                     }
                  })
               })
            }
         }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ->" + err)
            res.redirect("/user/registro")
         })

      }

   })

router.get('/login', (req, res) => {
   res.render("usuarios/login")
})
         

 module.exports = router
