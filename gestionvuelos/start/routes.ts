/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UsuariosController from '#controllers/usuarios_controller'
import VuelosController from '#controllers/vuelos_controller'
import jwt_middleware from "#middleware/jwt_middleware"

const mildeware= new jwt_middleware()


router
  .group(()=>{
    router.post('/register',[UsuariosController, 'create'])
    router.post('/login', [UsuariosController, 'login'])
    router.get('/logout',[UsuariosController, 'logout'])
  }).prefix('/dorado')


router

  .group(()=>{
    router.post('/crear', [VuelosController, 'create'] )
    router.get('/consultar', [VuelosController, 'getAll'])

  }).prefix(('/dorado/vuelos')).use(mildeware.handle)