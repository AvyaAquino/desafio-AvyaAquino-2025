import { AbrigoAnimais } from "./abrigo-animais";

describe("Abrigo de Animais", () => {
  test("Deve rejeitar animal inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Lulu"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );
    expect(resultado.lista[0]).toBe("Fofo - abrigo");
    expect(resultado.lista[1]).toBe("Rex - pessoa 1");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal intercalando brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Bola"
    );

    expect(resultado.lista[0]).toBe("Bola - abrigo");
    expect(resultado.lista[1]).toBe("Fofo - pessoa 2");
    expect(resultado.lista[2]).toBe("Mimi - abrigo");
    expect(resultado.lista[3]).toBe("Rex - abrigo");
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve adotar Loco com sucesso quando há companhia e os brinquedos estão fora de ordem", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,SKATE",
      "NOVELO",
      "Rex,Loco"
    );
    expect(resultado.lista[0]).toBe("Loco - pessoa 1");
    expect(resultado.lista[1]).toBe("Rex - pessoa 1");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Não deve adotar Loco se não houver companhia, mesmo com os brinquedos corretos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "SKATE,RATO",
      "",
      "Loco"
    );
    expect(resultado.lista[0]).toBe("Loco - abrigo");
    expect(resultado.lista.length).toBe(1);
    expect(resultado.erro).toBeFalsy();
  });

  test("Não deve permitir que brinquedos de um gato adotado sejam usados para outro gato", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER,RATO",
      "",
      "Mimi,Zero"
    );
    expect(resultado.lista[0]).toBe("Mimi - pessoa 1");
    expect(resultado.lista[1]).toBe("Zero - abrigo");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve respeitar o limite de 3 animais por pessoa", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,LASER,CAIXA,NOVELO",
      "",
      "Rex,Mimi,Bola,Zero"
    );
    expect(resultado.lista[0]).toBe("Bola - pessoa 1");
    expect(resultado.lista[1]).toBe("Mimi - pessoa 1");
    expect(resultado.lista[2]).toBe("Rex - pessoa 1");
    expect(resultado.lista[3]).toBe("Zero - abrigo");
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve rejeitar brinquedo duplicado na lista da pessoa", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,RATO",
      "NOVELO",
      "Rex"
    );
    expect(resultado.erro).toBe("Brinquedo inválido");
    expect(resultado.lista).toBeFalsy();
  });
});
