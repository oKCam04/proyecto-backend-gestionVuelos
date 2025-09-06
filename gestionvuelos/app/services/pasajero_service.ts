import Pasajero from "#models/pasajero"

export default class PasajeroService {
  // Your code here
  public static async getAll() {
      return await Pasajero.all()
    }
  
    public static async getById(codvuelo: string) {
      return await Pasajero.query().where('codvuelo',codvuelo)
    }
  
    public static async create(data: Partial<Pasajero>) {
      return await Pasajero.create(data)
    }
  
    public static async update(id: number, data: Partial<Pasajero>) {
      const vuelito = await Pasajero.findOrFail(id)
      vuelito.merge(data)
      await vuelito.save()
      return vuelito
    }
  
    public static async delete(id: number) {
      const vuelito = await Pasajero.findBy('id',id)
      if(vuelito){
        await vuelito.delete()
        return {mensaje:"204 No Content: Eliminación exitosa."}
      }else{
        return {mensaje:"404 Not Found: Pasajero no encontrado."}
      }
    }
}