import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vuelos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('codvuelo').notNullable
      table.integer('coddestino').unsigned().references('coddestino').inTable('destinos').onDelete('CASCADE').notNullable()
      table.integer('codaerolinea').unsigned().references('codaerolinea').inTable('aerolineas').onDelete('CASCADE').notNullable()
      table.string('salaabordaje').notNullable()
      table.time('horasalida').notNullable()
      table.time('horallegada').notNullable()

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}