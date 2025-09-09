import { animaisInfo } from "./data/dadosAnimais.js";
import { verificaSubsequencia } from "./utils/verificaSubsequencia.js";
import { Animal } from "./models/animal.js";
import { Adotante } from "./models/Adotante.js";

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1Str, brinquedosPessoa2Str, ordemAnimaisStr) {
    const nomesAnimais = ordemAnimaisStr.split(",");
    const brinquedosPessoa1 = brinquedosPessoa1Str.split(",");
    const brinquedosPessoa2 = brinquedosPessoa2Str.split(",");

    try {
      this.validarEntradas(nomesAnimais, brinquedosPessoa1, brinquedosPessoa2);
    } catch (erro) {
      return { erro: erro.message };
    }

    const adotante1 = new Adotante(1, brinquedosPessoa1);
    const adotante2 = new Adotante(2, brinquedosPessoa2);
    const resultadosAdocao = {};

    for (const nomeAnimal of nomesAnimais) {
      const infoAnimal = animaisInfo[nomeAnimal];
      const animal = new Animal(
        nomeAnimal,
        infoAnimal.especie,
        infoAnimal.brinquedos
      );

      const podeSerAdotadoPor1 = animal.podeSerAdotadoPor(adotante1);
      const podeSerAdotadoPor2 = animal.podeSerAdotadoPor(adotante2);

      if (podeSerAdotadoPor1 && !podeSerAdotadoPor2) {
        adotante1.adotar(animal);
        resultadosAdocao[nomeAnimal] = `pessoa ${adotante1.id}`;
      } else if (!podeSerAdotadoPor1 && podeSerAdotadoPor2) {
        adotante2.adotar(animal);
        resultadosAdocao[nomeAnimal] = `pessoa ${adotante2.id}`;
      } else {
        resultadosAdocao[nomeAnimal] = "abrigo";
      }
    }

    const listaFormatada = Object.keys(resultadosAdocao)
      .sort()
      .map((nome) => `${nome} - ${resultadosAdocao[nome]}`);

    return {
      lista: listaFormatada,
    };
  }

  validarEntradas(nomesAnimais, brinquedosPessoa1, brinquedosPessoa2) {
    const setNomesAnimais = new Set();
    for (const nome of nomesAnimais) {
      if (!animaisInfo[nome] || setNomesAnimais.has(nome)) {
        throw new Error("Animal inválido");
      }
      setNomesAnimais.add(nome);
    }

    if (
      new Set(brinquedosPessoa1).size !== brinquedosPessoa1.length ||
      new Set(brinquedosPessoa2).size !== brinquedosPessoa2.length
    ) {
      throw new Error("Brinquedo inválido");
    }
  }
}

export { AbrigoAnimais };
