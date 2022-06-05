if(process.env.NODE_ENV == "production"){
    module.exports = {mongoURI: "mongodb+srv://DevSchiavon:<password>@cluster0.rkubm.mongodb.net/?retryWrites=true&w=majorityt"}
   /* console.log("Servidor Produção rodando na porta: " + PORT) */
} else {
    module.exports = {mongoURI: "mongodb://localhost/blogapp"}
   /* console.log("Servidor Desenvolvimento rodando na porta: " + PORT) */
}