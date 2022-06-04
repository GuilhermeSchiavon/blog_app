//Carregando Modulos
   const express = require("express")
   const handlebars = require("express-handlebars")
   const bodyParser = require('body-parser')
   const app = express()

   const admin = require("./routes/admin")
   const user = require("./routes/user")

   const path = require("path")
   const mongoose = require("mongoose")
   const session = require("express-session")
   const flash = require("connect-flash")
   //Model de Postagens 
   require("./models/Postagem")
   const Postagem = mongoose.model("postagens")
   //Model de Categorias
   require("./models/Categoria")
   const Categoria = mongoose.model("categorias")
   //Model de Autenticação - Passport
   const passport = require("passport")
   require("./config/auth")(passport)
   
// Configurações
   //Sessão
      app.use(session({
         secret: "aprendendoNode",
         resave: true.valueOf,
         saveUninitialized: true
      }))
      app.use(passport.initialize())
      app.use(passport.session())
      app.use(flash())

   //Middleware
      app.use((req, res, next)=> {
         res.locals.success_msg = req.flash("success_msg")
         res.locals.error_msg = req.flash("error_msg")
         res.locals.error = req.flash("error")
         res.locals.user = req.user || null
         next()
      })

   //Body Parser
      app.use(bodyParser.urlencoded({extended: true}))
      app.use(bodyParser.json())

    //Handlebars
      var handle = handlebars.create({
         defaultLayout: 'main',
         runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
      },
      });
      app.engine('handlebars', handle.engine);
      app.set('view engine', 'handlebars');

    //Mongoose
      mongoose.connect("mongodb://localhost/blogapp",{
         useNewUrlParser: true
      }).then(()=>{
         console.log("Conectado ao mongo")
      }).catch((err) => {
         console.log("Erro ao se conectar: " + err)
      })

    //Public
      app.use(express.static(path.join(__dirname,"public")))

// Rotas

   app.get('/', (req, res) => {
      Postagem.find().sort({date: 'DESC'}).populate("categoria").then((postagens) => {
         res.render("index", {postagens: postagens})
      }).catch((err) => {
         req.flash("error_msg", "Houve um erro ao listar as Postagens")
         res.redirect("/")
      })
   })

   app.get('/postagem/:slug', (req, res) => {
      Postagem.findOne({slug: req.params.slug}).then((postagem) => {
         if(postagem){
            res.render("postagem/index", {postagem: postagem})
         }else{
            req.flash("error_msg", "Essa postagem não existe")
            res.redirect("/")
         }
      }).catch((err) => {
         req.flash("error_msg", "Houve um erro interno")
         res.redirect("/")
      })
   })

   app.get('/categorias', (req, res) => {
      Categoria.find().then((categorias) => {
         res.render("categorias/index", {categorias: categorias})
      }).catch((err) => {
         req.flash("error_msg", "Houve um erro ao listar as categorias")
         res.redirect("/")
      })
   })

   app.get('/categorias/:slug', (req, res) => {
      Categoria.findOne({slug: req.params.slug}).then((categoria) => {
         if(categoria){
            Postagem.find({categoria: categoria._id}).then((postagens) => {
               res.render("categorias/postagens", {postagens: postagens, categoria: categoria})
            }).catch((err) => {
               req.flash("error_msg", "Houve um erro ao listar as postagens")
               res.redirect("/")
            })
         }else{
            req.flash("error_msg", "Essa categoria não existe")
            res.redirect("/")
         }
      }).catch((err) => {
         req.flash("error_msg", "Houve um erro interno")
         res.redirect("/")
      })
   })

   app.use('/admin', admin)
   app.use('/user', user)

// Outros
const PORT = 8088
app.listen(PORT,() => {
   console.log("Servidor Online: Port8088")
})

