/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable(
    'cidades',
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        notNull: true,
      },
      nome: {
        type: 'character varying(255)',
        collation: 'pg_catalog."default"',
        notNull: true,
      },
      uf: {
        type: 'character varying(2)',
        collation: 'pg_catalog."default"',
        notNull: true,
      },
      created_at: {
        type: 'timestamp without time zone',
        notNull: true,
        default: pgm.func('current_timestamp'),
      },
    },
    { ifNotExists: true, constraints: 'cidades_pkey' }
  )
  pgm.createTable(
    'empresas',
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        notNull: true,
      },
      nome_fantasia: {
        type: 'character varying(255)',
        collation: 'pg_catalog."default"',
        notNull: true,
      },
      razao_social: {
        type: 'character varying(255)',
        collation: 'pg_catalog."default"',
        notNull: true,
        unique: true,
      },
      cnpj: {
        type: 'character varying(14)',
        collation: 'pg_catalog."default"',
        notNull: true,
        unique: true,
      },
      id_cidade: {
        type: 'uuid',
        notNull: true,
        references: 'cidades',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: 'timestamp without time zone',
        notNull: true,
        default: pgm.func('current_timestamp'),
      },
      updated_at: {
        type: 'timestamp without time zone',
        notNull: false,
      },
    },
    { ifNotExists: true, constraints: 'empresas_pkey' }
  )

  pgm.createTable(
    'veiculos',
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        notNull: true,
      },
      nome: {
        type: 'character varying(255)',
        collation: 'pg_catalog."default"',
        notNull: true,
      },
      created_at: {
        type: 'timestamp without time zone',
        notNull: true,
        default: pgm.func('current_timestamp'),
      },
      updated_at: {
        type: 'timestamp without time zone',
        notNull: false,
      },
    },
    { ifNotExists: true, constraints: 'veiculos_pkey' }
  )
  pgm.createTable(
    'transportes',
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        notNull: true,
      },
      cidade_origem: {
        type: 'character varying(255)',
        collation: 'pg_catalog."default"',
        notNull: true,
      },
      cidade_destino: {
        type: 'character varying(255)',
        collation: 'pg_catalog."default"',
        notNull: true,
      },
      dia_semana: {
        type: 'character varying(20)',
        collation: 'pg_catalog."default"',
        notNull: true,
      },

      localizacao: {
        type: 'character varying(255)',
        collation: 'pg_catalog."default"',
        notNull: true,
      },
      hora_saida: {
        type: 'time without time zone',
        notNull: true,
      },
      hora_chegada: {
        type: 'time without time zone',
        notNull: true,
      },
      preco: {
        type: 'money',
        notNull: true,
      },
      id_empresa: {
        type: 'uuid',
        notNull: true,
        references: 'empresas',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_veiculo: {
        type: 'uuid',
        notNull: true,
        references: 'veiculos',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      id_cidade: {
        type: 'uuid',
        notNull: true,
        references: 'cidades',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      md5_hash: {
        type: 'character varying(255)',
        collation: 'pg_catalog."default"',
        notNull: true,
      },
      created_at: {
        type: 'timestamp without time zone',
        notNull: true,
        default: pgm.func('current_timestamp'),
      },
      updated_at: {
        type: 'timestamp without time zone',
        notNull: false,
      },
    },
    { ifNotExists: true, constraints: 'transportes_pkey' }
  )

  pgm.createType('permissions', ['SUPER_ADMIN', 'ADMIN', 'USER', 'GUEST'], {
    ifNotExists: true,
  })

  pgm.createTable(
    'usuarios',
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        notNull: true,
      },
      nome: {
        type: 'character varying(255)',
        collation: 'pg_catalog."default"',
        notNull: true,
      },
      email: {
        type: 'character varying(255)',
        collation: 'pg_catalog."default"',
        notNull: true,
        unique: true,
      },
      senha: {
        type: 'character varying(255)',
        collation: 'pg_catalog."default"',
        notNull: true,
        unique: true,
      },
      permissoes: {
        type: 'permissions',
        notNull: true,
      },
      created_at: {
        type: 'timestamp without time zone',
        notNull: true,
        default: pgm.func('current_timestamp'),
      },
      updated_at: {
        type: 'timestamp without time zone',
        notNull: false,
      },
    },
    { ifNotExists: true, constraints: 'usuarios_pkey' }
  )
}
