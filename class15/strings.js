
const contarPalavras = (texto) => {
    const palavras = texto.split(" ");
   return palavras.length;

}
const contarLetras = (texto) => {
     let contador = 0; 
     for (let i = 0; i < texto.length; i++)
            if (texto[i] !== " ") {
                contador++;
            } 
      return contador;
        
}
const frequenciaPalavraes = (texto) => {
    const palavras = texto.split(" ");
    const frequencia = {};
    let contadorRepetidas = 0;
    for (let i = 0; i < palavras.length; i++) {
        const palavra = palavras[i].toLowerCase();
        if (frequencia[palavra]) {
            frequencia[palavra]++;
        } else {
            frequencia[palavra] = 1;
        }
    }
    for (const palavra in frequencia) {
        if (frequencia[palavra] > 1) {
            contadorRepetidas++;
        }
    }
    return contadorRepetidas;
}


module.exports = {contarPalavras, contarLetras, frequenciaPalavraes};








