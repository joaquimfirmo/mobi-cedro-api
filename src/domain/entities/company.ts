import crypto from 'crypto'

export default class Company {
  constructor(
    public readonly id: string,
    public readonly razaoSocial: string,
    public readonly nomeFantasia: string,
    public readonly cnpj: string
  ) {}

  static create(
    razaoSocial: string,
    nomeFantasia: string,
    cnpj: string
  ): Company {
    const companyId = crypto.randomUUID()
    return new Company(companyId, razaoSocial, nomeFantasia, cnpj)
  }
}
