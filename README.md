# FutBet

### link para deploy: 
    postgres://cldlweft:FKlvJEvgCxbsVlPflG6OoZ1sYR2UTuyT@mahmud.db.elephantsql.com/cldlweft

# Como rodar o projeto

 baixe o código por .zip ou clone o repositório.

instale as dependências usando:

    npm install

 use o arquivo .env.example e insira as informações do banco de dados e demais...

 execute o comando de migração do prisma.

     npm run prisma migrate dev
 execute o comando para a criação de queries.

     npx prisma generate
 rode o app em modo de desenvolvimento usando:

    npm run dev
