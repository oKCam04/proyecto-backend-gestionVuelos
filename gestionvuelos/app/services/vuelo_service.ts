import Vuelo from "#models/vuelo";

export default class VueloService {
  public static async getAll() {
    return await Vuelo.all()
  }

  public static async getById(id: number) {
    return await Vuelo.findOrFail(id)
  }

  public static async create(data: Partial<Vuelo>) {
    return await Vuelo.create(data)
  }

  public static async update(id: number, data: Partial<Vuelo>) {
    const vuelito = await Vuelo.findOrFail(id)
    vuelito.merge(data)
    await vuelito.save()
    return vuelito
  }

  public static async delete(id: number) {
    const vuelito = await Vuelo.findOrFail(id)
    await vuelito.delete()
    return vuelito
  }
  
}