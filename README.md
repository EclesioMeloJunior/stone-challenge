# stone-chagellenge

Este app foi elaborado para o desafio técnico da empresa [Stone](https://www.stone.com.br/) 
https://www.stone.com.br/ que consiste em um gerenciado de notas fiscaís

A aplicação está disponível em: https://app-stone-challenge.herokuapp.com/

- A aplicação foi construída utilizando
  - NodeJS, Express
  - PostgreSQL v11

- Para executar a aplicação
  - Máquina Local
  1. Clone o repositório para sua máquina local
  ```
  git clone https://github.com/EclesioMeloJunior/stone-challenge.git
  ```
  2. Instale as dependências do NPM:
  ```
  npm install
  ```
  3. (Opcional) Execute o banco usando docker (**docker-compose**)
  ```
  docker-compose -f ./docker-compose-db.yml -d
  ```
  4. Crie o arquivo de configuração **.env** na raiz da pasta e dentro dele coloque:
  
  ```
  PORT=5004
  NODE_ENV=development

  DATABASE_PORT=5434
  DATABASE_USER=postgres
  DATABASE_HOST=localhost
  DATABASE_NAME=postgres
  DATABASE_PASSWORD=pass

  KEY=$T0n3Ch@ll3ng3
  ```
  5. Com o banco criado e as configurações de conexão criados, podemos executar a migração da tabela de Invoice
  ```
  npm run migrate
  ```
  1. Após feito a migração a aplicação pode ser executada: 
  ```
  npm start
  ```
  ou com nodemon
  ```
  npm run start:dev
  ```
  - Utilizando Docker