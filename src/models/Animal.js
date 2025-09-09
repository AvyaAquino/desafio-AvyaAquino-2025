import { verificaSubsequencia } from "../utils/verificaSubsequencia";

export class Animal {
  constructor(nome, especie, brinquedosFavoritos) {
    this.nome = nome;
    this.especie = especie;
    this.brinquedosFavoritos = brinquedosFavoritos;
  }

  /**
   * @param {import('./Adotante').Adotante} adotante
   * @returns {boolean}
   */
  podeSerAdotadoPor(adotante) {
    if (!adotante.podeAdotarMais()) {
      return false;
    }

    const brinquedosDisponiveis = adotante.getBrinquedosDisponiveis();

    if (this.nome === "Loco") {
      const temCompanhia = adotante.temAnimaisAdotados();
      const temTodosBrinquedos = this.brinquedosFavoritos.every((brinquedo) =>
        brinquedosDisponiveis.includes(brinquedo)
      );
      return temCompanhia && temTodosBrinquedos;
    }
    return verificaSubsequencia(
      this.brinquedosFavoritos,
      brinquedosDisponiveis
    );
  }
}
