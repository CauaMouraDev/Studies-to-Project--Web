const cores = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "brown",
  "gray",
  "black",
  "white",
  "cyan",
  "magenta",
  "lime",
  "teal",
  "indigo",
  "violet",
  "gold",
  "silver",
  "beige",
  "coral",
  "crimson",
  "navy",
  "olive",
  "maroon",
  "turquoise",
  "salmon",
  "plum",
  "orchid",
  "khaki",
  "azure",
  "tan",
  "chocolate",
  "lavender",
  "mint",
  "peach",
  "apricot",
  "amber",
  "emerald",
  "ruby",
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * cores.length);
  return cores[randomIndex];
};

const clique = (btnId) => {
  const btn = document.getElementById(btnId);
  const cor = getRandomColor();
  btn.style.backgroundColor = cor;
  btn.style.color = "#fff";
  btn.style.fontWeight = "bold";
  btn.style.border = "2px solid #333";
  btn.style.transform = "scale(1.1)";
  btn.style.transition = "all 0.2s";
};

document.querySelectorAll("#buttons-container button").forEach((btn) => {
 
   let randomColor = getRandomColor();


    btn.addEventListener("mouseout", () => {
    btn.style.backgroundColor = randomColor;
    btn.style.color = "";
    btn.style.fontWeight = "";
    btn.style.border = "";
    btn.style.transform = "";
    btn.style.transition = "";
  });
});
