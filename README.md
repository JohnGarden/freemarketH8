# freemarketH8

Para inicializar o projeto
- Clone o repositório
- Entre na pasta `freemarketh8`  
- Execute `npm install`
- Execute `SET DEBUG=freemarketh8:* & npm start`

Com isso o servidor já estará rodando na porta 3000, basta acessar `localhost:3000`

Para configurar o MongoDB
- Faça o download em https://www.mongodb.com/
- Instale o MongoDB
- No terminal, vá para pasta bin do MongoDB (C:\Program Files\MongoDB\Server\3.2\bin)
- Execute `mongod --dbpath c:\...\freemarketh8\data\` para iniciliazar o servidor
- Em outra janela do terminal, ainda na pasta `bin` execute `mongo` para operar com o banco de dados
- Para selecionar o banco de dados do projeto execute `use freemarketh8`
