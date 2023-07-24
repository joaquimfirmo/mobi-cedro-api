class Rotas {
  constructor({
    id,
    nome,
    cidadeOrigem,
    cidadeDestino,
    empresaId,
    tarifaId,
    cidadeId,
    ativo,
  }) {
    this.id = id;
    this.nome = nome;
    this.cidadeOrigem = cidadeOrigem;
    this.cidadeDestino = cidadeDestino;
    this.empresaId = empresaId;
    this.tarifaId = tarifaId;
    this.cidadeId = cidadeId;
    this.ativo = ativo;
  }
}

module.exports = Rotas;
