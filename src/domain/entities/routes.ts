export default class Route {
  constructor(
    public readonly id: string,
    public readonly cidade_origem: string,
    public readonly cidade_destino: string,
    public readonly nome: string
  ) {}
}
