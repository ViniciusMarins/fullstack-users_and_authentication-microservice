# Fullstack users and authentication microservice

Projeto Fullstack para gerenciamento e autenticação segura de usuários com token JWT.

[>> Link para a aplicação <<]()

## Stack

**Tecnologias:** Reactjs, Java Spring, MySQL, TypeScript, Nodejs, HTML5 e CSS3;

## Deploy

### Frontend

Instalar dependências e rodar aplicação

```bash
npm install
npm run dev
```

### Backend

- Atenção para criar seu próprio arquivo para conexão com o banco de dados **application.properties** no path **backend/src/main** seguindo o seguinte padrão de arquivo a seguir (CONEXÃO MYSQL):

```mysql
spring.datasource.password = "password"
spring.datasource.username = "username"
spring.datasource.url = jdbc:mysql://localhost:3306/"database_name"?useTimezone=true&serverTimezone=UTC

spring.jpa.hibernate.ddl-auto=update
```

## Documentação da API desenvolvida (backend)

- Por configuração padrão a API estará rodando na porta 8080.
- Todas as rotas protegidas da aplicação são acessadas apenas se possuirem o token JWT no header da requisição, exemplo:

```js
headers: {
    Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2Ltmeus1tneWFpVCInIilzcyI6ImFwaXVzZXJzIiwiZXhwIjoxNzExMzI5MjE1fQ.sudE47VEHLLoZjkfu45iNxQEGBkVZsOTB15M2_wATs4,
},

```

### Rotas sem autenticação

#### >>**Realizar o login**<<

```bash
  POST http://localhost:8080/login
```

Body Request Example

```js
{
    "email": "v.marins@gmail",
    "password": "senha"
}
```

#### >>**Cadastrar um usuário**<<

```bash
  POST http://localhost:8080/users
```

Body Request Example

```js
{
    "name": "Vinicius Assunção",
    "email": "v.marins@gmail",
    "phone": "(24) 99219-4433",
    "password": "senha"
}
```

### Rotas com autenticação

#### >>**Listar usuários**<<

```bash
  GET http://localhost:8080/users
```

#### >>**Atualizar um usuário**<<

```bash
  PUT http://localhost:8080/users
```

Body Request Example

```js
{
    "id" : 1,
    "name": "Vinicius Assunção",
    "email": "v.marins@gmail.com.br",
    "phone": "(24) 99219-4433",
    "password": "novaSenha"
}
```

#### >>**Excluir um usuário**<<

```bash
  DELETE http://localhost:8080/users/${id}
```

| Parâmetro | Tipo     | Descrição     |
| :-------- | :------- | :------------ |
| `id`      | `number` | ID do usuário |

#### >>**Retornar usuário por email**<<

```bash
  DELETE http://localhost:8080/users/${email}
```

| Parâmetro | Tipo     | Descrição        |
| :-------- | :------- | :--------------- |
| `email`   | `string` | email do usuário |

## Bibliotecas Utilizadas

### Front

- axios
- react-toastify
- react-icons

### Back

- jsonwebtoken
- spring data jpa
- lombok
- spring security
- spring validation
