
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Vuelo from './vuelo.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Pasajero extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombres: string

  @column()
  declare apellidos: string

  @column()
  declare email: string

  @column()
  declare telefono: number

  @column()
  declare codvuelo: string

  @column()
  declare foto : string

  @belongsTo (()=>Vuelo, {foreignKey: "codvuelo"})
  declare vuelos: BelongsTo<typeof Vuelo>
}