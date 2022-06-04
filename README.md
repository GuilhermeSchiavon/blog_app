# blog_app

- Framework Express instalado no projeto
   Terminal: npm install express --save

- Nodemon instalado na maquina
   Utilizado para não ter que rodar o servidor a cada edição feita no codigo.
   Terminal: npm install Nodemon
      [https://www.youtube.com/watch?v=u3MrPxq_RyA&list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B&index=9] - Nodemon'

- Sequelize instalado no projeto
   Utilizado para realizar uma conexão, realizar querys com o banco de dados relacional.
   Terminal: npm install --save sequelize
   Terminal: npm i --save mysql2
               Pois o sequelize trabalha com varias linguagens além de MySQL'

- Handlebars instalado no projeto
   Utilizado para gerar view's, padronizando as paginas de forma que só necessite alterar o body.
   Terminal: npm install --save express-handlebars
      [https://www.youtube.com/watch?v=U4OUBjnjBWU&list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B&index=19] - Template Engine Handlebars

- Body Parser instalado no projeto
   Utilizado para pegar dados enviados via formulario, para então encaminhar a uma outra rota para gravar estes dados recebidos.
   Terminal: npm install --save body-parser
      [https://www.youtube.com/watch?v=P1OI_EKyl6U&list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B&index=25] - Body Parser

- Bcryptjs instalado no projeto
    bcryptjs é uma biblioteca que transforma a senha do usuario em um hash, exemplo um MD5
    Criptografia vs Hashing
    Criptografia da para descripitografar, já o Hashing não.
    Terminal: npm install --save bcryptjs
        [https://www.youtube.com/watch?v=acCEOBM2eC0&list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B&index=54] - Cadastro do Usuario

- Bcryptjs instalado no projeto

# passport altenticaão
    É uma bibliteca de altenticaão
    Para realizar um login social como o Google ou ate mesmo o Linkdln
    Terminal: npm install --save passport
    Obs: Após a instalação desta biblioteca, precisamos instalar a bibliteca especifica que utilizaramos
    Nesta aplicação sera a Local
    Terminal: npm install --save passport-local
    Mas podemos usar a do Google, Facebook ou outros que o site 
        [https://www.passportjs.org/] - Site oficial
        [https://www.youtube.com/watch?v=JwrIhK1OME0&list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B&index=58] - Passport



### Observação:

Para executar o projeto, necessita:
   Terminal: nodemon app.js      ||      node app.js
   Resposta: "Server rodando na URL http://localhost:8088"
      [https://www.youtube.com/watch?v=UMI7kFwmAHo&list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B&index=7] - Rotas