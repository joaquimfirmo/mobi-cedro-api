export class Transports {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly descricao: string,
    public readonly tipo_transporte: string,
    public readonly id_empresa: string
  ) {}
}
