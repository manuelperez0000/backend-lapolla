# Login
```bash
https://backend-lapolla.vercel.app/api/v1/login
```
### body
```js
{
  "email":"example@example.com",
  "password":"xxxxxx"
}
```
### Response
```js
{
  "message": "success",
  "body": "<Encoded_data>"
}
```

### Errors
```js
"Se espera un correo y una contraseña"
"Usuario no registrado" 
"Usuario o contraseña incorrecta"
```
