
ruta de pagina

🔧 Funcionalidades principales
Visualización de productos desde API externa

Buscador por nombre y categoría

Carrusel de productos destacados

Modal con detalle del producto y opción de agregar al carrito

Sistema de paginación

Footer con enlaces y botón de suscripción

Toasts informativos para acciones del usuario

Ejecución

two-factor authentication  sinch  ( para la autenticación de 2 factores)
CV38Y65QQJSFT8ZDSHH76PW4

clave de sinch de mi proyecto (clave-01)

clave de acceso id
3770c636-6755-4a03-a6ba-928b02ce69b6

clave secreta
dSk8l.l4GIv_ksd90Eio3Fa0vA

Backend: http://localhost:8080

Swagger: http://localhost:8080/swagger-ui/index.html

Frontend: http://localhost:5173

***********
// con esto vemos en que rama estamos 
git Branch

// aquí en caso de que queramos cambiar de rama 
git checkout master

// para iniciar 
git init


// esto para fusionar las carpetas en caso de conflicto
git pull origin master --allow-unrelated-histories

git remote add origin

git add .


git commit -m "Subo proyecto frontend con configuración para GitHub Pages"
git push -u origin main

si da error primero hacer 
git pull origin main --rebase

npm run build

npm run deploy


Credenciales de Usuarios

Admin     cualquier correo que sea @duocprofesor.cl es administrador y lo lleva a la ventada de ADMIN
Usuario   cualquier correo que sea @duocuc.cl o @gmail.com los llevara a la vista de usuario donde puede agregar productos
al carrito
contraseña:   La contraseña debe tener al menos 12 caracteres, una mayúscula, una minúscula, un número y un símbolo


******************

Documentación de API
disponible en : http://localhost:8080/swagger-ui/index.html
igualmente en la carpeta abra un archivo .json api-docs con la documentacion de swagger
adicionalmente hay imágenes de las pruebas con los métodos post, put, get, delete,

Los endpoints están organizados por:

Usuarios/ CRUD, login, registro, bloqueo

Productos/ CRUD, imagen, estado

Carrito/ agregar, eliminar, modificar productos

Los modelos Usuario, Producto y Carrito están documentados con ejemplos y descripciones.


*************************

para desplegar  antes hay que instalar 

*npm run build
*npm install --save-dev gh-pages
*"homepage": "https://<tu-usuario>.github.io/<nombre-del-repo>"
*

 api de Transbank gratuita

 si esuq eu se quiere incorporar 
instalar para los soportes de testing en frontend 
npm install --save-dev @testing-library/react @testing-library/jest-dom


en caso de haber error con el carrito 
ocupar localStorage.removeItem('carrito'); en la consola del navegador 
