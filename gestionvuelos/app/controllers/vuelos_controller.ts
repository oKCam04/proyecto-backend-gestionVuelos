import type { HttpContext } from '@adonisjs/core/http'
import VueloService   from '#services/vuelo_service'
import { DateTime } from 'luxon'
import Destino from '#models/destino'
import Aerolinea from '#models/aerolinea'
export default class VuelosController {
    public async getAll({ response }: HttpContext) {
    
        try{
            const equipo = await VueloService.getAll()
            const vuelo = await Promise.all( equipo.map(async(v) => ({
                    codvuelo: v.codvuelo,
                    coddestino: await buscarDestino(v.coddestino),
                    codaerolinea: await buscarAerolinea(v.codaerolinea),
                    salaabordaje: v.salaabordaje,
                    horasalida: v.horasalida,
                    horallegada: v.horallegada,
                    tiempovuelo: calcularVuelo(v.horasalida, v.horallegada)
                    })))
            return response.status(200).json({mensaje:"200 OK: Consulta Exitosa.",vuelo})
        }catch{
            return response.status(404).json({mensaje:"404 Not Found: Recurso no encontrado"})
        }    
  }

    public async getById({ response, params }: HttpContext) {
        const equipo = await VueloService.getById(params.id)
        return response.ok(equipo)
    }

  public async create({ response, request }: HttpContext) {
    try{
        const {coddestino, codaerolinea, salaabordaje, horasalida, horallegada} = request.body()
        const codvuelo=await crearVuelo()
        const equipo = await VueloService.create({codvuelo, coddestino, codaerolinea, salaabordaje, horasalida, horallegada})
        return response.status(201).json({mensaje:"201 Created: Registro exitoso del vuelo."})
    }catch(error){
        return response.status(400).json({mensaje:"400 Bad Request: Error en la solicitud.", error})
    }
    
  }

  public async update({ params, request, response }: HttpContext) {
    const {coddestino, codaerolinea, salaabordaje, horasalida, horallegada} = request.body()
    const equipo = await VueloService.update(params.id, {coddestino, codaerolinea, salaabordaje, horasalida, horallegada})
    return response.ok(equipo)
  }

  public async delete({ response, params }: HttpContext) {
    await VueloService.delete(params.id)
    return response.noContent()
  }
}


const crearVuelo=()=>{
    const caracteres='123456789ABCDEFGHIJKLMNOPQRSTUVXYZ';
    let otp="";
    for(let i=6;i>0;i--){
        otp+=caracteres[Math.floor(Math.random()*caracteres.length)];
    };
    return otp;
}

const calcularVuelo = (horaSalida: string, horaLlegada: string): string => {
  const salida = DateTime.fromFormat(horaSalida, "HH:mm:ss")
  const llegada = DateTime.fromFormat(horaLlegada, "HH:mm:ss")

  let diff = llegada.diff(salida, ["hours", "minutes"]).toObject()

  // Si la diferencia es negativa, asumimos que llega al día siguiente
  if ((diff.hours ?? 0) < 0 || (diff.minutes ?? 0) < 0) {
    diff = llegada.plus({ days: 1 }).diff(salida, ["hours", "minutes"]).toObject()
  }

  const horas = String(Math.floor(diff.hours ?? 0)).padStart(2, "0")
  const minutos = String(Math.floor(diff.minutes ?? 0)).padStart(2, "0")

  return `${horas}:${minutos}:00`
}


const buscarDestino=async(id:number)=>{
    const destino=await Destino.findBy('coddestino',id)
    return destino?.descripcion
}   

const buscarAerolinea=async(id:number)=>{
    const aerolinea=await Aerolinea.findBy('codaerolinea',id)
    return aerolinea?.descripcion
}