//Carregando Modulos
   const express = require("express")
   const handlebars = require("express-handlebars")
   const bodyParser = require('body-parser')
   const app = express()
   const admin = require("./routes/admin")
   const path = require("path")
   const mongoose = require("mongoose")

// Configurações

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

