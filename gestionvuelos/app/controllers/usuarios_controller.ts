import Usuario from '#models/usuario'
import type { HttpContext } from '@adonisjs/core/http'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import env from "#start/env"

export default class UsuariosController {

    async create ({request, response}: HttpContext){
        const datos=request.body()
        const usuarioExiste=await Usuario.findBy('username', datos.username);

        if(usuarioExiste){
            return response.status(401).json({mensaje: 'correo registrado anteriormente'})
        }

        const hash= await bcrypt.hash(datos.password,10)

        const token=await createtoken({sub:usuarioExiste})

        const usuarioN=await Usuario.create({
            username:datos.username, password:hash, token:token
        })
        return response.json(usuarioN)
    }

    async login({request, response}:HttpContext){
        const {username, password}=request.body()
        const usuarioBuscar=await Usuario.findBy("username",username)

        if(!usuarioBuscar){
            return response.status(401).json({mensaje: "Unauthorized: Fallo en la autenticación."})
        }
        

        const desencriptar= await bcrypt.compare(password, usuarioBuscar.password)
        if(!desencriptar){
            return response.status(401).json({mensaje:"Unauthorized: Fallo en la autenticación."})
        }
        const token = await createtoken({sub:usuarioBuscar.id})

        response.header('Set-Cookie', `${env.get('COOKIE_NAME')}=${token}; Path: "/"`)

        return response.status(200).json({mensaje: "200 OK: Autenticación exitosa."})
    }

    async logout({ response }: HttpContext) {
    try {
        response.header("Set-Cookie",`${env.get("COOKIE_NAME")}=; Path: '/'; Max-Age:0`)
        return response.status(200).json({mesage:"200 OK: Cierre de sesión exitoso."})
    
    } catch (e) {
      return response.status(500).json({ message: 'Intenta nuevamente' })
    }
   }
}


const createtoken=async(payload: object)=>{
    const token=jwt.sign(payload, env.get('JWT_SECRET'),{expiresIn:'3h'})

    return token
}