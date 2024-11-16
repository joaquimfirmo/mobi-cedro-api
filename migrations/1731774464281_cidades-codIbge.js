/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.addColumns('cidades', {
    cod_ibge: { type: 'integer', notNull: true },
  })
}

exports.down = (pgm) => {
  pgm.dropColumns('cidades', 'cod_ibge', { ifExists: true })
}
