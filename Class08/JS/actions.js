var lampada = document.getElementById("lampada");
var botao = document.getElementById("botaoLampada");

function acender() {
  lampada.classList.toggle("ligada");
}

botao.addEventListener("click", acender);
