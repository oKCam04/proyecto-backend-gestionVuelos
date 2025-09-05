import jwt from "jsonwebtoken"
import env from "#start/env"
import Usuario from "#models/usuario"
import type { HttpContext } from "@adonisjs/core/http"



export default class CookieControler{
    async handle({request, response}:HttpContext, next:()=>Promise<void>){
        const cookie=request.headers().cookie
        const token=cookie?.split("=")[1]
        if(!token){
            return response.json({mensaje:"token invalido"})
        }
        try{
            const secret= env.get('JWT_SECRET')

            const payload=jwt.verify(token, secret)

            if(!payload){
                return response.unauthorized({mensaje: "token invalido"})
            }
            const user=await Usuario.find( payload.sub);
            (request as any).user=user

            await next()
        }catch(e){
            return response.json({mensaje:e})
        }

    }
}