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

# Reset User Password

### Obtener una clave temporal y enviar al correo
```bash
https://backend-lapolla.vercel.app/api/v1/reset/gettemporalpass
```
### body
```js
{
  "email":"example@example.com"
}
```
### Response
```js
{
  "message": "success",
  "body": "<data>"
}
```

### Errors
```js
'Debe proporcionar un correo electronico'
'Este correo no se encuentra registrado'
'Error al intentar guardar su clave temporal'
```

### Cambiar la clave del usuario
```bash
https://backend-lapolla.vercel.app/api/v1/reset/setnewpassword
```
### body
```js
{
  "email":"exambple@example.com",
  "temporalPass":"7GFBD7",
  "password":"XXXXXX"
}
```
### Response
```js
{
  "message": "success",
  "body": "<data>"
}
```

### Errors
```js
'Debe proporcionar un email'
'Debe proporcionar un password'
'Debe proporcionar una Clave temporal'
"Clave temporal expirada"
'Error, no se a podido actualizar su clave'
```

# Registro de usuarios
```bash
https://backend-lapolla.vercel.app/api/v1/reister
```
### body
```js
{
    "name":"your name",
    "email":"example0000@example.com",
    "phone":"04140000000",
    "password":"xxxxxx"
}
```
### Response
```js
{
  "message": "success",
  "body": "<data>"
}
```
### Errors
```js
'El nombre es requerido'
'El email es requerido'
'El telefono es requerido'
'La contraseña es requerida'
'La contraseña debe tener un minimo de 6 caracteres'
"Este correo ya se encuentra registrado"
"Error al registrar el usuario"
```
# Tipos de usuarios
nombre del campo (level)
### tipos
```js
'1 Clientes'
'2 Loterias'
'3 Administradores'
'4 Master'
```
