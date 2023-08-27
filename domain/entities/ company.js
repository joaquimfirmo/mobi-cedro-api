class Company {
  constructor({ id, razaoSocial, nomeFantasia, cnpj, ativo = true }) {
    this.id = id
    this.razaoSocial = razaoSocial
    this.nomeFantasia = nomeFantasia
    this.cnpj = cnpj
    this.ativo = ativo
  }
}

module.exports = Company
