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
import PasajerosController from '#controllers/pasajeros_controller'

const mildeware= new jwt_middleware()

//usuario 
router
  .group(()=>{
    router.post('/register',[UsuariosController, 'create'])
    router.post('/login', [UsuariosController, 'login'])
    router.get('/logout',[UsuariosController, 'logout'])
  }).prefix('/dorado')


//vuelo
router

  .group(()=>{
    router.post('/crear', [VuelosController, 'create'] )
    router.get('/consultar', [VuelosController, 'getAll'])
    router.patch('/editar/:id',[VuelosController, 'update'])
    router.get('/traer/:id',[VuelosController, 'getById'])

  }).prefix(('/dorado/vuelos')).use(mildeware.handle)


//pasajero
router
  .group(()=>{
    router.post('/crear',[PasajerosController, 'create'])
    router.get('/consultar/:id',[PasajerosController, 'getById'])
    router.get('/todo',[PasajerosController, 'getAll'])
    router.delete('/eliminar/:id',[PasajerosController, 'delete'])
  }).prefix('/dorado/pasajeros').use(mildeware.handle)