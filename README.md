# Voll Solutions Challenge Api

API desenvolvida para simular o controle de uma Loja.

![GitHub followers](https://img.shields.io/github/followers/eliforte?style=social)

***

## Sumário
- [Sobre](#sobre)
- [Contatos](#contatos)
- [Ferramentas utilizadas](#ferramentas-utilizadas)
- [Requisições e End-Points](#requisições-e-end-points)
- [Segurança](#segurança)
- [Script](#script)
- [Rotas](#registro)
  - [<code>/api/v1/user</code>](#login)
- [Tarefas](#tarefas)
  - [Listagem de Tarefas](#listagem-de-tarefas)
  - [Criando Taefa)refas](#criando-tarefas)
  - [Atualizando dados de uma tarefa](#atualizando-dados-de-uma-tarefa)
  - [Removendo Tarefa](#removendo-tar)
- [Contribuições](#contribuições)

***
## Sobre
  Aplicação desenvolvida por [Elias Forte](https://github.com/eliforte) para o desafio técnico da empresa Voll Solutions.
  
## Contatos
<a targer="_blank" href="https://www.instagram.com/eliifort/"><img src="https://img.icons8.com/fluency/48/000000/instagram-new.png"/></a>
<a targer="_blank" href="https://www.linkedin.com/in/elias-forte/"><img src="https://img.icons8.com/fluency/48/000000/linkedin.png"/></a>

***

## Ferramentas utilizadas

- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/docs/)
- [Express](https://expressjs.com/pt-br/)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [MongoDB](https://www.mongodb.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)

Deploy da aplicação feita na plataforma gratuita de hospedagem [Heroku](https://id.heroku.com/).

## Requisições e End-Points

Todas as requisições devem ser feitas para está [url](https://voll-solutions-challenger.herokuapp.com/).

## Script

- <code>yarn</code> => instalará todas a dependências do projeto use o comando.
- <code>yarn start</code> => inicializará a aplicação para ambiente de produção.
- <code>yarn dev</code> => inicializará a aplicação para ambiente de desenvolvimento.


***

### Autenticação de usuário

#### REGISTRO

Usuários comuns podem somente vizualizar seu saldo de moedas e realizar compras. Somente Admins podem ter editar, criar, remover, adicionar saldo, remover usuário

O cadrastro deve ser feito por um requisição do tipo <strong>POST</strong> para o endpoint <code>/register</code>, contendo as seguites informações:

```json
{
  "email": "email@exemplo.com",
  "password": "senhasenha",
  "name": "Nome do Usuário"
}
```

Todos os campos são obrigatórios e deve ser informado um email válido para o cadastro ser concluído.
Exemplos de erros que podem retornar:

<strong>Campo email não preenchido:</strong>
```json
{
  "message": "\"email\" is not allowed to be empty"
}
```

<strong>Email inválido:</strong>

```json
{
  "message": "\"email\" must be a valid email"
}
```

<strong>Usuario não cadastrado:</strong>

```json
{
  "message": "User not exist"
}
```

<strong>Registro realizado com sucesso:</strong>
// retorno ainda não implementado

```json
{
  "user": {
    "_id": "6208c2d683d9b0e29874c7cb",
    "email": "email@exemplo.com",
    "name": "Nome do Usuário"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImFja25vd2xlZGdlZCI6dHJ1ZSwiaW5zZXJ0ZWRJZCI6IjYyMDhjMmQ2ODNkOWIwZTI5ODc0YzdjYiJ9LCJpYXQiOjE2NDQ3NDEzMzQsImV4cCI6MTY0NTM0NjEzNH0.ouKmFlNq82-2sa506cbXrfLr3koTvtd5RJRQE6fz1XY"
}
```

#### LOGIN

O login do usuário deve ser feito em uma requisição do tipo <strong>POST</strong> para o endpoint <code>/login</code>. Email e senha deve ser os mesmos utilizados
no registro e ambos os campos são obrigatórios. Após feito o login, o usuário tem acesso ao token de autenticação poderá criar, editar, remover ou visualizar suas atividade salvas.

<strong>Campo não preenchido:</strong>

```json
{
  "message": "\"password\" is not allowed to be empty"
}
```

<strong>Email ou senha inválidos:</strong>

```json
{
  "message": "Incorrect username or password"
}
```
<strong>Login realizado com sucesso:</strong>

```json
{
  "user": {
    "_id": "6208c2d683d9b0e29874c7cb",
    "email": "email@exemplo.com",
    "name": "Nome do Usuário"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYyMDhjMmQ2ODNkOWIwZTI5ODc0YzdjYiIsImVtYWlsIjoiZW1haWxAZXhlbXBsby5jb20iLCJuYW1lIjoiTm9tZSBkbyBVc3XDoXJpbyJ9LCJpYXQiOjE2NDQ3NDE2MDQsImV4cCI6MTY0NTM0NjQwNH0.NsnrEGQ5DF9KOjqZIgWXdzrc9DYQ0XZRUbmrRTgoTMc"
}
```

### Tarefas

#### Listagem de tarefas

Para fazer a listagem de todas as tarefas faça uma requisição do tipo <strong>GET</strong> para o endpoint <code>/games</code> e o retorno dever ser uma lista
com todas tarefas disponíveis do usuário. Exemplo:

```json
{
  "data": [
    {
      "_id": "6208cb223b4551a435f595b4",
      "text": "Estudar Next.js",
      "userId": "6208c2d683d9b0e29874c7cb",
      "status": "Ready to start",
      "createAt": "13/02/2022"
    },
    {
      "_id": "6208cb4d2ed83443600e4b84",
      "text": "Ler sobre Auth0",
      "userId": "6208c2d683d9b0e29874c7cb",
      "status": "Ready to start",
      "createAt": "13/02/2022"
    }
  ]
}

```

#### Criando tarefas

Para criar uma tarefa, o usuário deve está logado com um token válido, fazendo uma requisição do tipo <strong>POST</strong> para o endpoint <code>/task</code>. 
Os campos <code>text</code>, <code>creatAt</code>, <code>status</code> são obrigatórios.

<strong>Campo vazio:</strong>

```json
{
  "message": "\"text\" is not allowed to be empty"
}

```

<strong>Usuário sem token:</strong>

```json
{
  "message": "Missing auth token",
  "status": 401
}

```

<strong>Token inválido:</strong>

```json
{
  "message": "Jwt malformed"
}
```
<strong>Tarefa criada com sucesso:</strong>

```json
{
  "message": "Created"
}
```

#### Atualizando dados de uma tarefa

A atualização deve ser feita por uma requisição do tipo <strong>PUT</strong> para o endpoit <code>/task/:id</code>. O usuário deve está autenticado para fazer a atualização.
Em forma de query, a api esperar receber um <code>ID</code>, que exista no banco e seja válido, da tarefa a ser modificada.
Enviando o <code>/task/6208cb223b4551a435f595b4</code> na requisição, com os campos:
```json
{
  "text": "Estudar Next.js",
  "status": "Concluído"
}
```
Caso o <strong>ID seja inválido:</strong>
```json
{
  "message": "Invalid task ID"
}
```

Caso a tarefa <strong>não exista</strong>:

```json
{
  "message": "Task not exist"
}
```

Se todas informações forem no formato correto, o retorno será:

```json
{
  "_id": "6208cb223b4551a435f595b4",
  "text": "terminar o readMe",
  "userId": "6208c2d683d9b0e29874c7cb",
  "status": "Concluído",
  "createAt": "13/02/2022"
}
```
#### Removendo tarefas

Aplicação permite somente remoção de uma atividade por requisição. Para fazer a remoção, o usuário deve está autenticado, deve enviar, por query, um <code>ID</code> válido de uma tarefa que exista
na lista. A requisição deve ser do tipo <strong>DELETE</strong> para o endpoint <code>/task/:id</code>. A resposta da API sera um status code <code>204 No Content</code>.
Em casos de erros, podem sugir as seguintes retornos: 

<strong>Se o ID do game estiver no formato incorreto, exibe o retorno:</strong>

```json
{
  "message": "Invalid task ID"
}
```

<strong> Se o game não existir, exibe o retorno:</strong>

```json
{
  "message": "Task not exist"
}
```

<strong>Usuário sem token:</strong>

```json
{
  "message": "Missing auth token",
  "status": 401
}

```

<strong>Token inválido:</strong>

```json
{
  "message": "Jwt malformed"
}
```

### Contribuições

Caso você queria fazer alguma contribuição, fique a vontade para comentar, fazer pull resquests. Toda ajuda a melhorar o código é bem vinda :D!

