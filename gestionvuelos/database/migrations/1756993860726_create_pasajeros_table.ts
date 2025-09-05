import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pasajeros'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').notNullable().unique()
      table.string('nombre').notNullable()
      table.string('apellidos').notNullable()
      table.string('email').notNullable()
      table.bigint('telefono').notNullable()
      table.string('codvuelo').unsigned().references('codvuelo').inTable('vuelos').onDelete('CASCADE').notNullable()
      table.string('foto').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}