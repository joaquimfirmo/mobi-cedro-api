class Route {
  constructor({
    id,
    cidadeOrigem,
    cidadeDestino,
    tipoVeiculo,
    ativo = true,
    empresaId,
    tarifaId,
  }) {
    this.id = id
    this.cidadeOrigem = cidadeOrigem
    this.cidadeDestino = cidadeDestino
    this.tipoVeiculo = tipoVeiculo
    this.ativo = ativo
    this.empresaId = empresaId
    this.tarifaId = tarifaId
  }
}

module.exports = Route
