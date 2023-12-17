export default class Company {
  constructor(
    public readonly id: string,
    public readonly razao_social: string,
    public readonly nome_fantasia: string,
    public readonly cnpj: string
  ) {}
}
