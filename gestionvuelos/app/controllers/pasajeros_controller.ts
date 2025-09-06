import type { HttpContext } from '@adonisjs/core/http'
import  PasajeroService  from '#services/pasajero_service'

export default class PasajerosController {
    public async getAll({ response }: HttpContext) {
    const equipo = await PasajeroService.getAll()
    return response.ok(equipo)
  }

  public async getById({ response, params }: HttpContext) {
    try{
        const equipo = await PasajeroService.getById(params.id)
        return response.status(200).json({mensaje:"200 OK: Consulta exitosa.",equipo})
    }catch(error){
        console.log(error)
        return response.status(404).json({mensaje:"404 Not Found: Recurso no encontrado."})
    }
    
  }

  public async create({ response, request }: HttpContext) {
    try{
        const data = request.only(['id','nombre', 'apellidos','email','telefono','codvuelo','foto'])
        const equipo = await PasajeroService.create(data)
        return response.status(201).json({mensaje:"201 Created: Registro exitoso del pasajero."})
    }catch(error){
        console.log("holaaa"+error)
        return response.status(400).json({mensaje:"400 Bad Request: Error en la solicitud."})
    }
    
  }

  public async update({ params, request, response }: HttpContext) {
    const data = request.only(['nombre', 'apellidos','email','telefono','codvuelo','foto'])
    const equipo = await PasajeroService.update(params.id, data)
    return response.ok(equipo)
  }

  public async delete({ response, params }: HttpContext) {
    await PasajeroService.delete(params.id)
    return response.noContent()
  }
}