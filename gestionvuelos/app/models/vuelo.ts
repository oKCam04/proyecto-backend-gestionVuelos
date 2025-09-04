import { DateTime } from 'luxon'
import { BaseModel, column , belongsTo, hasMany} from '@adonisjs/lucid/orm'
import Destino from './destino.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Aerolinea from './aerolinea.js'
import Pasajero from './pasajero.js'

export default class Vuelo extends BaseModel {
  @column({ isPrimary: true })
  declare codvuelo: string

  @column()
  declare coddestino: number

  @column()
  declare codaerolinea: number

  @column()
  declare salaabordaje: string

  @column()
  declare horasalida: DateTime

  @column()
  declare horallegada: DateTime

  @belongsTo(() => Destino, { foreignKey: 'coddestino' })
  declare destinos: BelongsTo<typeof Destino>

  @belongsTo(() => Aerolinea, { foreignKey: 'codaerolinea' })
  declare aerolineas: BelongsTo<typeof Aerolinea>

  @hasMany(()=>Pasajero, {foreignKey: 'codvuelo'})
  declare vuelo: HasMany<typeof Pasajero>
  

}
