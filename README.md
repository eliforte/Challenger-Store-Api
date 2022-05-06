# Voll Solutions Challenge Api

API developed to simulate the control of a store.

![GitHub followers](https://img.shields.io/github/followers/eliforte?style=social)

***

## Sumary
- [About](#sobre)
- [Contacts](#contacts)
- [Tools](#tools)
- [Scripts](#script)
- [With Docker](#with-docker)
- [API Security](#api-security)
- [Routes](#routes)
  - [/api/v1/user](#api-v1-user)
    - [<code>GET "/" GetAll</code>](#get-all-users)
    - [<code>POST "/login" Login</code>](#login)
    - [<code>POST "/register" Register</code>](#register)
    - [<code>POST "/admin/register" RegisterAdmin</code>](#register-admin)
    - [<code>PUT "/admin/balance/:id" ChangeBalance</code>](#change-balance)
  - [<code>/api/v1/products</code>](#api-v1-products)
    - [<code>GET "/" GetAll</code>](#get-all-products)
    - [<code>PUT "/:id" Edit</code>](#edit-product)
    - [<code>POST "/" Create</code>](#create-product)
    - [<code>DELETE "/" Create</code>](#delete-product)
  - [<code>/api/v1/purchase</code>](#api-v1-purchase)
    - [<code>POST "/" Create</code>](#create-purchase)
- [Errors Responses](#errors-responses)
  - [Validation errors](#validation-errors)
  - [Business rules errors](#bussines-rules-errors)
  - [Authentication errors](#authentication-errors)
- [Feedbacks](#feedbacks)

***
## **About**
  Application developed by [Elias Forte](https://github.com/eliforte) for the technical challenger of the company Voll Solutions. In this application, only administrators can add new currencies for common users and manipulate store products. Customers are only able to view products, purchases made and their balance.
  
## **Contacts**
<a targer="_blank" href="https://www.instagram.com/eliifort/"><img src="https://img.icons8.com/fluency/48/000000/instagram-new.png"/></a>
<a targer="_blank" href="https://www.linkedin.com/in/elias-forte/"><img src="https://img.icons8.com/fluency/48/000000/linkedin.png"/></a>

***

## **Tools**

- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/docs/)
- [Express](https://expressjs.com/pt-br/)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [MongoDB](https://www.mongodb.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)

Application deployment done on the free [Heroku](https://id.heroku.com/) hosting platform.

All requests must be made to these url [https://voll-solutions-challenger.herokuapp.com](https://voll-solutions-challenger.herokuapp.com/).

## **Script**

- <code>yarn</code> => Install all dependecies.
- <code>yarn start</code> => Initialize the application to the production environment.
- <code>yarn dev</code> => Initialize the application to the development environment.


***

## **With Docker**


## **API Security**

In the application there are some routes that only administrators can access. For development, the [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken) tool was used. For example, the routes created to manipulate user and product data, two middlewares are used, one filter that verifies if the user is really an administrator and the other optinal middleware that validates the data sent by the client depending on the chosen route.

## **Routes**
  <br>

  ## <code>/api/v1/user:</code><a name="api-v1-user"></a>
  <br>

  Regular users can only view their coin balance and make purchases. Only Admins can edit, create, remove, add balance, remove user
  
  <hr>
  <br>

  #### GET <code>"/"</code> GetAll<a name="get-all-users"></a>

  <br>

  User listing can only be done by an administrator. A **GET** request must be made to the <code>"/"</code> endpoint.

  Response example:
  ```json
  {
    [
      {
        "_id": {
          "$oid": "627353ad20d9ef0c5b5a6eb0"
        },
        "email": "eliasforte@gmail.com",
        "password": "$2b$10$g2dT.B/Jr4UeUVG0redEDudoCNSRRjsPL9m7T55B1eN5hi3Vrq0Im",
        "name": "Elias",
        "role": "admin",
        "balance": "778.00"
      },
      {
        "_id": {
          "$oid": "62750d20bf3732fd44169a11"
        },
        "email": "sophie@gmail.com",
        "password": "$2b$10$1i/ReyqRI9CL3KHOOvdFSOLzaxtcyRFGqi8lQz/8Sqt/JnIq.G/AG",
        "name": "Sophie",
        "role": "customer",
        "balance": 0
      }
    ]
  }
  ```

  **Error formats that can happen**
  - [Authentication errors](#authentication-errors)

  <hr>
  <br>

  #### POST <code>"/login"</code> Login<a name="login"></a>

  <br>

  User login must be done in a **POST** request to the <code>"/login"</code> endpoint. Email and password must be the same used in registration and both fields are mandatory. After logging in, the user has access to the authentication token.

  ```json
  {
    "password": "12345687",
    "email": "sophie@gmail.com"
  }
  ```
  **Login successful:**
  ```json
  {
    "user": {
      "_id": "62750c1b32aa3eb09c0d09ae",
      "email": "sophie@gmail.com",
      "name": "Sophie",
      "role": "customer",
      "balance": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImFja25vd2xlZG1ZSwiaW5zZXJ0ZWJZCI6IjYyNUwYzFiMzJhYTNlYjA5YzBkMDlhZSIsInJvbGUiOiJjdXN0b21lciJ9LCJpY8QiOjE2NTE4Mzc5N666sImV4cCI6MTY55MjQ0Mjc3OX0.Z35JkYvm9n8xFWeNrBmOjny__h7lf3cPSj3s0nja4c"
  }
  ```
  **Error formats that can happen**
  - [Validation errors](#validation-errors)
  - [Business rules errors](#bussines-rules-errors)
  
  <br>
  <hr>
  <br>


  #### POST <code>"/register"</code> Register<a name="register-user"></a>
  
  <br>


  The registration must be done by a request of type <strong>POST</strong> to the endpoint <code>"/register"</code>, containing the following information:

  ```json
  {
    "name": "Sophie",
    "password": "12345687",
    "email": "sophie@gmail.com"
  }
  ```

  All fields are mandatory and a valid email must be provided for the registration to be completed. **Only administrators can create account with balance**, if it is a common user, the user balance will be 0(zero).

  **Registration successful:**

  ```json
  {
    "user": {
      "_id": "62750c1b32aa3eb09c0d09ae",
      "email": "sophie@gmail.com",
      "name": "Sophie",
      "role": "customer",
      "balance": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImFja25vd2xlZG1ZSwiaW5zZXJ0ZWJZCI6IjYyNUwYzFiMzJhYTNlYjA5YzBkMDlhZSIsInJvbGUiOiJjdXN0b21lciJ9LCJpY8QiOjE2NTE4Mzc5N666sImV4cCI6MTY55MjQ0Mjc3OX0.Z35JkYvm9n8xFWeNrBmOjny__h7lf3cPSj3s0nja4c"
  }
  ```
  **Error formats that can happen**
  - [Validation errors](#validation-errors)
  - [Business rules errors](#bussines-rules-errors)
  
  <br>
  <hr>
  <br>

  #### POST <code>"/admin/register"</code> RegisterAdmin<a name="register-admin"></a>

  <br>

  The registration admin must be done by a request of type **POST** to the endpoint <code>"/admin/register"</code>, all fields are mandatory and a valid email must be provided for the registration to be completed. If the user is an administrator and wanted to register a new administrator, he must add the role field with the value "_admin_" in the body of the request. **Only administrators can create account with balance**, if it is a common user, the user balance will be 0(zero)

  ```json
  {
    "name": "Sophie",
    "password": "12345687",
    "email": "sophie@gmail.com",
    "balance": 5000,
    "role": "admin"
  }
  ```

  Otherwise he is not an administrator or does not have an add to the role field, **user will be registered as a customer**.

  **Registration successful:**

  ```json
  {
    "user": {
      "_id": "62750c1b32aa3eb09c0d09ae",
      "email": "sophie@gmail.com",
      "name": "Sophie",
      "role": "admin",
      "balance": 5000
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImFja25vd2xlZGdlZCI6dHJ1ZSwiaW5zZXJ0ZWRJZCI6IjYyNzUwYzFiMzJhYTNlYjA5YzBkMDlhZSIsInJvbGUiOiJjdXN0b21lciJ9LCJpYXQiOjE2NTE4Mzc5NzksImV4cCI6MTY1MjQ0Mjc3OX0.Z35JkYvm9n8xFWeNrBmOjny__h7lf3cPSj3s0nja4c"
  }
  ```
  **Error formats that can happen**
  - [Validation errors](#validation-errors)
  - [Business rules errors](#bussines-rules-errors)
  - [Authentication errors](#authentication-errors)

  <br>
  <hr>
  <br>

  #### PUT <code>"/admin/balance/:id"</code> ChangeBalance<a name="change-balance"></a>

  <br>

  To add balance, a request must be made to the endpoint **PUT** <code>"/admin/balance/:id"</code>. After logging in, the administrator can add a balance to a user's account. In the body of the request, you must inform only the balance to be modified. The user identification is done through the path parameters.

  ```json
  {
    "balance": 5500
  }
  ```

  **ChangeBalance successful:**
  ```json
  {
    "_id": "627353ad20d9ef0c5b5a6eb0",
    "email": "eliasforte@gmail.com",
    "name": "Elias",
    "role": "admin",
    "balance": 5500
  }
  ```

  **Error formats that can happen**
  - [Validation errors](#validation-errors)
  - [Business rules errors](#bussines-rules-errors)
  - [Authentication errors](#authentication-errors)

  <br>
  <hr>
  <br>

## <code>/api/v1/products:</code><a name="api-v1-products"></a>

<br>

#### GET <code>"/"</code> GetAll<a name="get-all-products"></a>

Any user can make a product listing after logging in.

**GetAll successful:**
```json
{
  [
    {
      "_id": {
        "$oid": "6274c236bbe9feab9133ecbf"
      },
      "name": "short",
      "price": 100.99,
      "description": "moleton de cor rosa ",
      "quantity": 5,
      "userId": "627353ad20d9ef0c5b5a6eb0"
    },
    {
      "_id": {
        "$oid": "627491cf907525fa2f0b484e"
      },
      "name": "camisa",
      "price": 24.99,
      "description": "camisa de cor rosa ",
      "quantity": 10,
      "userId": "627353ad20d9ef0c5b5a6eb0"
    }
  ]
}
```

<br>
<hr>
<br>

#### PUT <code>"/:id"</code> Edit<a name="edit-product"></a>

  <br>

  To edit a product, you must make a **PUT** request to the <code>"/:id"</code> endpoint. Only administrators can edit product information. All fields shown below must be sent. All are mandatory. The product id must go as a url parameter.

  ```json
  {
    "name": "calça social",
    "description": "calça social de cor marron masculina",
    "price": 60.99,
    "quantity": 15
  }
  ```

**Older version:**
```json
{
  "_id": "62747b65a63b66ebd5e4b070",
  "name": "calça social",
  "price": 45.99,
  "description": "calça social de cor marron masculina",
  "quantity": 5,
  "userId": "627353ad20d9ef0c5b5a6eb0"
}
```

**Edit successful:**

```json
{
  "_id": "62747b65a63b66ebd5e4b070",
  "name": "calça social",
  "price": 60.99,
  "description": "calça social de cor marron masculina",
  "quantity": 15,
  "userId": "627353ad20d9ef0c5b5a6eb0"
}
```

**Error formats that can happen**
  - [Validation errors](#validation-errors)
  - [Business rules errors](#bussines-rules-errors)
  - [Authentication errors](#authentication-errors)

<br>
<hr>
<br>

#### POST <code>"/"</code> Create<a name="create-product"></a>

<br>

To create a product, you must make a **POST** request to the <code>"/"</code> endpoint. Only administrators can create product. All fields shown below must be sent. All are mandatory.

**Request body**
```json
{
  "name": "short",
  "price": 100.99,
  "quantity": "@",
  "description": "moleton de cor rosa "
}
```

**Created successful:

```json
{
  "message": "Product created successfully",
  "productId": "6275481dd88ecb7f8fd6790d"
}
```

**Error formats that can happen**
  - [Validation errors](#validation-errors)
  - [Business rules errors](#bussines-rules-errors)
  - [Authentication errors](#authentication-errors)

<br>
<hr>
<br>

#### DELETE <code>"/:id"</code> Delete<a name="delete-product"></a>
 
<br>

To delete a product, you must make a **DELETE** request to the <code>"/:id"</code> endpoint. Only administrators can delete product. The product id must go as a url parameter. The API will only return a 204 status if it completes successfully.

**Error formats that can happen**
  - [Business rules errors](#bussines-rules-errors)
  - [Authentication errors](#authentication-errors)

<br>
<hr>
<br>

## <code>/api/v1/products:</code><a name="api-v1-products"></a>

<br>

#### POST <code>"/"</code> Create<a name="create-purchase"></a>

<br>

To create a purchase, you must make a **POST** request to the <code>"/"</code> endpoint.
Any logged in user can make purchases. It is necessary to carry out the purchase the body of the request with the total price, the items and their respective quantities, names and id's.


**Body create request**

```json
{
  "products": [{
    "_id":  "6275481dd88ecb7f8fd6790d",
    "name": "óculos",
    "price": 199.99,
    "description": "Modelo Ray-Ban",
    "quantity": 10,
    "userId": "627353ad20d9ef0c5b5a6eb0"
  }],
  "totalPrice": 201.98
}
```

**Create successful**

```json
{
  "purchase": {
    "id": "62754eda91d3c011c7ff5124"
  },
  "user": {
    "_id": "627353ad20d9ef0c5b5a6eb0",
    "email": "eliasforte@gmail.com",
    "password": "$2b$10$g2dT.B/Jr4UeUVG0redEDudoCNSRRjsPL9m7T55B1eN5hi3Vrq0Im",
    "name": "Elias",
    "role": "admin",
    "balance": "2994.00"
  }
}
```
**Error formats that can happen**
  - [Validation errors](#validation-errors)
  - [Business rules errors](#bussines-rules-errors)
  - [Authentication errors](#authentication-errors)

<br>
<hr>
<br>

## **Errors Responses**

  ### <u>*Validation errors*</u>

  Are errors that occur when the client sends invali or blank data or the wrong data type it may receive some of these responses.


  - Empty data<a name="empty-data"></a>
  ```json
  {
    "message": "\"password\" is not allowed to be empty"
  }
  ```
  
  - Invalid data<a name="invalid-data"></a>
  ```json
  {
    "message": "Incorrect username or password"
  }
  ```
  - Wrong type data<a name="wrong-type-data"></a>
  ```json
  {
    "message": "\"quantity\" must be a number"
  }
  ```

  ### <u>*Business rules errors*</u>

  Are errors that occur when the API does not complete the action due to conflicts of information received with that of the database or infringes some rule.

   - Insufficient balance<a name="insufficient-balance"></a>
  ```json
  {
    "message": "Balance not enough"
  }
  ```

  - Product not exist<a name="product-not-exist"></a>
  ```json
  {
    "message": "Product not exist"
  }
  ```

  - Email exist<a name="email-exist"></a>
  ```json
  {
    "message": "Email already registered"
  }
  ```

  ### <u>*Authentication errors*</u>
  Are errors that occur when users are prevented by token validation middleware. That limit their actions according to their level of access or if they are trying to maliciously change the token to obtain more control over the application.

  - Not Admin<a name="not-admin"></a>
  ```json
  {
    "message": "Restricted to administrators"
  }
  ```
  - Missing auth token<a name="missing-auth-token"></a>
  ```json
  {
    "message": "Missing auth token"
  }
  ```
  - JWT malformed<a name="jwt-malformed"></a>
  ```json
  {
    "message": "Jwt malformed"
  }
  ```
