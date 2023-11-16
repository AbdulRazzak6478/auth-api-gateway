This is a base node js project template, which anyone can use as it has been prepared, by keeping some of the most important code principles and project management recommendations. Feel free to change anything. 


`src` -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests. (You might  want to make separate tests folder)

Lets take a look inside the `src` folder

 - `config` -> In this folder anything and everything regarding any configurations or setup of a library or module will be done. For example: setting up `dotenv` so that we can use the environment variables anywhere in a cleaner fashion, this is done in the `server-config.js`. One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here. 

 - `routes` -> In the routes folder, we register a route and the corresponding middleware and controllers to it. 

 - `middlewares` -> they are just going to intercept the incoming requests where we can write our validators, authenticators etc. 

 - `controllers` -> they are kind of the last middlewares as post them you call your business layer to execute the business logic. In controllers we just receive the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output. 

 - `repositories` -> this folder contains all the logic using which we interact the DB by writing queries, all the raw queries or ORM queries will go here.

 - `services` -> contains the business logic and interacts with repositories for data from the database

 - `utils` -> contains helper methods, error classes etc.

### Setup the project

 - Download this template from github and open it in your favorite text editor. 
 - Go inside the folder path and execute the following command:
  ```
  npm install
  ```
 - In the root directory create a `.env` file and add the following env variables
    ```
        PORT=<port number of your choice>
    ```
    ex: 
    ```
        PORT=3000
    ```
 - go inside the `src` folder and execute the following command:
    ```
      npx sequelize init
    ```
 - By executing the above command you will get `migrations` and `seeders` folder along with a `config.json` inside the config folder. 
 - If you're setting up your development environment, then write the username of your db, password of your db and in dialect mention whatever db you are using for ex: mysql, mariadb etc
 - If you're setting up test or prod environment, make sure you also replace the host with the hosted db url.

 - To run the server execute
 ```
 npm run dev
 ```


# How to use Auth API-GATEWAY
- SignUp
- `http://localhost:3000/api/v1/user/signup/`
```
  User Need to signUp
  /*
    POST /user/signup/
    body{
      email : example@gmail.com
      password :123456
    }
  */
  body {
      email: req.body.email,
      password: req.body.password,
    }
```
- password is encrypted and stored.
- encryption is done by using bcrypt library.

- SignIn
- `http://localhost:3000/api/v1/user/signin/`
```
  User Need to signUp
  /*
    POST /user/signin/
    body{
      email : example@gmail.com
      password :123456
    }
  */
  body {
      email: req.body.email,
      password: req.body.password,
    }
```
- JWT_TOKEN is send to client from the server to identify the user while accessing other service routes.

- Enums is used to assign roles to user so that flight routes are secure to Proceed for delete or update from customer people 
- `admin` role person can change the details and also assign roles to customer an all.

Assign Role
- `http://localhost:3000/api/v1/user/role`
```
  /*
    POST /user/role
    headers
       'x-access-token'
  */
```
- Based on that token is check and decoded to get the details and check user is exist or is authenticated .
- After that is check for the role that has been assign to this user if the user role is `admin` the it can access to flights routes to change and update
- and also to check if the user is admin or not if it is admin then it proceed to change the roles of other customer.
```
  POST /user/role
  body { id : "customer_id", role :"customer or admin "}
  body {
      id: req.body.id,
      role: req.body.role,
    }
```
- based on the id of the customer is assign a role 
- whoever are admin can change the roles .