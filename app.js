//Carregando Modulos
   const express = require("express")
   const handlebars = require("express-handlebars")
   const bodyParser = require('body-parser')
   const app = express()
   const admin = require("./routes/admin")
   const path = require("path")
   const mongoose = require("mongoose")
   const session = require("express-session")
   const flash = require("connect-flash")

// Configurações
   //Sessão
      app.use(session({
         secret: "aprendendoNode",
         resave: true.valueOf,
         saveUninitialized: true
      }))
      app.use(flash())

   //Middleware
      app.use((req, res, next)=> {
         res.locals.success_msg = req.flash("success_msg")
         res.locals.error_msg = req.flash("error_msg")
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
      app.use('/admin', admin)

// Outros
const PORT = 8088
app.listen(PORT,() => {
   console.log("Servidor Online: Port8088")
})

