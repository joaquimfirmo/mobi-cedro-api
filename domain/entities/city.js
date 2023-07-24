class City {
  constructor({ id, nome, regiao, created_at: createdAt = null }) {
    this.id = id
    this.nome = nome
    this.regiao = regiao
    this.created_at = createdAt
  }
}

module.exports = City
