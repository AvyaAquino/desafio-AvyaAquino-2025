export class Adotante {
  constructor(id, brinquedosOferecidos) {
    this.id = id;
    this.brinquedosOferecidos = brinquedosOferecidos;
    this.animaisAdotados = [];
    this.brinquedosUsados = new Set();
  }

  podeAdotarMais() {
    return this.animaisAdotados.length < 3;
  }

  temAnimaisAdotados() {
    return this.animaisAdotados.length > 0;
  }

  getBrinquedosDisponiveis() {
    return this.brinquedosOferecidos.filter(
      (brinquedo) => !this.brinquedosUsados.has(brinquedo)
    );
  }

  /**
   * @param {import('./animal').Animal} animal
   */
  adotar(animal) {
    this.animaisAdotados.push(animal);
    if (animal.especie === "gato") {
      animal.brinquedosFavoritos.forEach((brinquedo) =>
        this.brinquedosUsados.add(brinquedo)
      );
    }
  }
}
