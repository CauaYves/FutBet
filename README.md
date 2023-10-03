# FutBet

### link para deploy: 
    postgres://cldlweft:FKlvJEvgCxbsVlPflG6OoZ1sYR2UTuyT@mahmud.db.elephantsql.com/cldlweft

# Como rodar o projeto

## 1-
 baixe o código por .zip ou clone o repositório.

## 2-
 instale as dependências usando:

    npm install

## 3-
 use o arquivo .env.example e insira as informações do banco de dados e demais...

## 4-
 execute o comando de migração do prisma.

     npm run prisma migrate dev
## 5- 
 execute o comando para a criação de queries.

     npx prisma generate
## 6-
 rode o app em modo de desenvolvimento usando:

    npm run dev
