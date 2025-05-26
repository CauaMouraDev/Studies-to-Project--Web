// scripts.js - To-do List para Aula 10 - Exercício

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("todolist-form");
  const input = document.getElementById("todolist-input");
  const list = document.getElementById("todolist-list");
  const btnPrioritaria = document.getElementById("btn-prioritaria");
  const btnTheme = document.getElementById("btn-theme");
  const body = document.body;

  // Modo claro/escuro
  btnTheme.addEventListener("click", () => {
    body.classList.toggle("dark");
    btnTheme.textContent = body.classList.contains("dark")
      ? "☀️ Modo Claro"
      : "🌙 Modo Escuro";
  });

  // Adicionar tarefa
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const value = input.value.trim();
    if (value) {
      addTask(value);
      input.value = "";
      input.focus();
    }
  });

  // Adiciona tarefa ao DOM
  function addTask(text) {
    const li = document.createElement("li");
    li.textContent = text;
    // Ações
    const actions = document.createElement("div");
    actions.className = "actions";
    // Botão concluir
    const btnComplete = document.createElement("button");
    btnComplete.className = "btn-complete";
    btnComplete.title = "Concluir";
    btnComplete.innerHTML = "✔️";
    btnComplete.addEventListener("click", () => {
      li.classList.toggle("completed");
    });
    // Botão remover
    const btnRemove = document.createElement("button");
    btnRemove.className = "btn-remove";
    btnRemove.title = "Remover";
    btnRemove.innerHTML = "🗑️";
    btnRemove.addEventListener("click", () => {
      li.remove();
    });
    actions.appendChild(btnComplete);
    actions.appendChild(btnRemove);
    li.appendChild(actions);
    list.appendChild(li);
  }

  // Destacar tarefa prioritária (mais longa)
  btnPrioritaria.addEventListener("click", () => {
    let maior = 0;
    let prioritaria = null;
    list.querySelectorAll("li").forEach((li) => {
      li.classList.remove("prioritaria");
      if (li.textContent.length > maior) {
        maior = li.textContent.length;
        prioritaria = li;
      }
    });
    if (prioritaria) {
      prioritaria.classList.add("prioritaria");
      prioritaria.style.color = body.classList.contains("dark")
        ? "#ffd54f"
        : "#f7931e";
    }
  });
});
