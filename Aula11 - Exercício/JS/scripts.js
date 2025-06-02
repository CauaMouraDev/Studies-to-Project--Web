function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let trocacor = (el) => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  el.style.backgroundColor = `rgb(${r},${g},${b})`;
};

let arcoirisFundo = async () => {
  while (true) {
    trocacor(document.body);
    await sleep(1000);
  }
};

arcoirisFundo();
console.log("Iniciando arco-íris no fundo...");
