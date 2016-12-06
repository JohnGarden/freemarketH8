# Free Market H-8

Aplicação web desenvolvida como projeto principal da disciplina `CES-26` de Desenvolvimento Web do **ITA**, cursada no segundo semestre do ano de 2016, quando foi ministrada pelo Prof. Edgar Yano.

Nesse projeto, foi desenvolvida uma aplicação web com foco principal em mobile, com o objetivo de otimização de mercados informais como os existentes em comunidades de estudantes universitários. **H-8** é o nome do alojamento dos estudantes do ITA, e por ter servido também de inspiração para a ideia, ganhou espaço no próprio título dado à aplicação.

O **Free Market H-8** foi desenvolvido ao longo do semestre, e encontra-se sob acesso livre no endereço: http://freemarketh8.v1ct04.com/.

### Utilização

A aplicação possui algumas funcionalidades principais que serão descritas aqui para noção inicial da implementação da mesma.

 - Como porta de entrada, a aplicação fornece acesso apenas através de login pelo Facebook, utilizada como restrição mas que na verdade apenas aumentou o número de possibilidades para a aplicação devido à imensa possibilidade de utilização das suas APIs.
  - A ideia inicial era de associar cada entidade de mercado na aplicação à um grupo existente do Facebook do qual o usuário participasse. Infelizmente, o Facebook não permite acesso à essa informação específica, de forma que não é possível pegar a lista de grupos dos quais o usuário atual faz parte.
 - Como não foi possível se configurar a associação de mercado com grupo existente do Facebook, ao entrar na plataforma o usuário tem acesso à todos os mercados atualmente existentes no banco de dados.
   - Escolhendo um mercado, poderá fazer uma requisição para o administrador do mesmo para se juntar a ele. O administrador pode então autorizar ou não sua entrada no grupo/mercado.
   - Poderiam ser expandidas configurações do mercado para qualquer membro do mesmo poder autorizar a entrada de outros requisitantes, bem como vários administradores do mercado serem estabelecidos para dividir a carga de autorização de entrada no grupo.
 - Dentro do mercado então, o usuário tem acesso à listagem de lojas existentes naquele mercado, que podem ser criadas por qualquer um, e configuradas com o inventário disponível para venda, com respectivos preços, estoque, etc.
   - Se implementou um controle de estoque bastante simples, com o próprio dono da loja tendo que marcar itens como disponíveis ou não. Poderia ser expandido para interação com consumidores e donos das lojas mais complexa.

Como principal ideia de expansão, poderia se criar uma espécie de dinheiro virtual para troca comercial virtual e abstração dos meios de pagamento, de modo a ser utilizado de forma fácil no dia-a-dia, simplificando a interação com os serviços de varejo informais locais à comunidade.

---

### Instalação

Para inicializar o projeto:

 - Clone o repositório
 - Entre na pasta `freemarketh8`
 - Execute `$ npm install`
 - Execute `$ SET DEBUG=freemarketh8:* & npm start`

Com isso o servidor já estará rodando na porta 3000, basta acessar `localhost:3000`

Para configurar o MongoDB:

- Faça o download em https://www.mongodb.com/
- Instale o MongoDB
- No terminal, vá para pasta bin do MongoDB (C:\Program Files\MongoDB\Server\3.2\bin)
- Execute `$ mongod --dbpath c:\..\freemarketh8\data\` para iniciliazar o servidor
- Em outra janela do terminal, ainda na pasta `bin` execute `$ mongo` para operar com o banco de dados
- Para selecionar o banco de dados do projeto execute `> use freemarketh8`

Para resolver o `warning` sobre `bson`:

- [stackoverflow/bson-not-found](http://stackoverflow.com/questions/28651028/cannot-find-module-build-release-bson-code-module-not-found-js-bson): `C:\..\freemarketh8\node_modules\bson\ext\index.js`

Pupular o banco de dados usando `seeds`:

- Execute `$ npm install -g node-mongo-seeds`
- Na pasta `/seeds` adicione os arquivos `.json` para popular o db
- O nome do arquivo será o nome da coleção
- Execute `$ seed` para popular o banco
