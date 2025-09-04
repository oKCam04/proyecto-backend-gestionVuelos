
import { BaseModel, column, hasMany} from '@adonisjs/lucid/orm'
import Vuelo from './vuelo.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Aerolinea extends BaseModel {
  @column({ isPrimary: true })
  declare codaerolinea: number

  @column()
  declare descripcion: string

  @hasMany(() => Vuelo, { foreignKey: 'codaerolinea' })
  declare vuelo: HasMany<typeof Vuelo>
}