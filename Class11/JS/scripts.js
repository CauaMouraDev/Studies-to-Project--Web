// // let h1 =  document.querySelector("h1");
// h1.style.backgroundColor = "red";

// let h2Array = document.querySelectorAll("h2");

// let ChangeColor = (el) => {
//     el.style.backgroundColor = "yellow"

// }

// h2Array.forEach(ChangeColor);

// setTimeout(() => {
//    console.log("Passou 3 segundos");
// }, 3000);

// setTimeout(() => {
//   console.log("Passou 3 segundos");
// }, 3000);

// setTimeout(() => {
//   console.log("Passou 3 segundos");
// }, 3000);

//  let retornaPromessa = () => {
//   return new Promise((resolve,reject) => {
//      setTimeout(()=>{
//         console.log("Passou 3 segundos");
//         resolve("Sucesso");
//      },3000)
//   });

// }

// let faztimeout = async()=>{
//    await retornaPromessa("Primeira promessa")
//    await retornaPromessa("Segunda promessa")
//    await retornaPromessa("Terceira promessa")
// }

// faztimeout();
// ...existing code...
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
