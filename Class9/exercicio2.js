class Animal {
  constructor() {
    this.nome = "";
    this.idade = "";
    this.cor = "";
  }

  nomear(nome) {
    this.nome = nome;
  }

  atribuiIdade(idade) {
    this.idade = idade;
  }

  adcor(cor) {
    this.cor = cor;
  }
}

let animal1 = new Animal();

animal1.nomear("Rex");
animal1.atribuiIdade(5);
animal1.adcor("verde");

console.log(animal1);

// SetNome(nome){
//     this.nome = nome;

// }
// setIdade(idade){
//    this.idade = idade;

// }

// getNome(){
//     return this.nome;

// }

// getIdade(){
//     return this.idade;

// }
