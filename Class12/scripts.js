// scripts.js - To-do List Simples

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("todolist-form");
  const input = document.getElementById("todolist-input");
  const list = document.getElementById("todolist-list");

  // Mensagem e contador
  const msg = document.createElement("div");
  msg.id = "msg-confirmacao";
  msg.style.display = "none";
  form.after(msg);
  const contador = document.createElement("div");
  form.after(contador);

  // Filtros
  const filtros = document.createElement("div");
  filtros.innerHTML = `
      <button id="filtro-todas">Todas</button>
      <button id="filtro-concluidas">Concluídas</button>
      <button id="filtro-pendentes">Pendentes</button>
    `;
  contador.after(filtros);
  let filtro = "todas";

  function atualizarContador() {
    const total = list.querySelectorAll("li").length;
    const concluidas = list.querySelectorAll("li.completed").length;
    contador.textContent = `Total: ${total} | Concluídas: ${concluidas}`;
  }

  function aplicarFiltro() {
    list.querySelectorAll("li").forEach((li) => {
      li.style.display =
        filtro === "todas"
          ? ""
          : filtro === "concluidas"
          ? li.classList.contains("completed")
            ? ""
            : "none"
          : !li.classList.contains("completed")
          ? ""
          : "none";
    });
  }

  filtros.onclick = (e) => {
    if (e.target.tagName === "BUTTON") {
      filtro = e.target.id.replace("filtro-", "");
      aplicarFiltro();
    }
  };

  form.onsubmit = (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) {
      msg.textContent = "ERRO! O campo não pode estar vazio.";
      msg.style.display = "block";
      msg.style.color = "#c00";
      setTimeout(() => (msg.style.display = "none"), 2000);
      return;
    }
    addTask(value);
    input.value = "";
    msg.textContent = "Tarefa adicionada com sucesso!";
    msg.style.display = "block";
    msg.style.color = "#080";
    setTimeout(() => (msg.style.display = "none"), 2000);
  };

  function addTask(text) {
    const li = document.createElement("li");
    li.textContent = text;
    const btnC = document.createElement("button");
    btnC.textContent = "✔️";
    btnC.onclick = () => {
      li.classList.toggle("completed");
      atualizarContador();
      aplicarFiltro();
    };
    const btnE = document.createElement("button");
    btnE.textContent = "✏️";
    btnE.onclick = () => {
      if (li.querySelector("input")) return;
      const inputEdit = document.createElement("input");
      inputEdit.value = li.firstChild.textContent;
      const btnS = document.createElement("button");
      btnS.textContent = "Salvar";
      btnS.onclick = () => {
        if (!inputEdit.value.trim()) {
          msg.textContent = "ERRO! O campo não pode estar vazio.";
          msg.style.display = "block";
          msg.style.color = "#c00";
          setTimeout(() => (msg.style.display = "none"), 2000);
          inputEdit.focus();
          return;
        }
        li.firstChild.textContent = inputEdit.value;
        inputEdit.remove();
        btnS.remove();
        btnE.style.display = "inline-block";
      };
      li.insertBefore(inputEdit, btnC);
      li.insertBefore(btnS, btnC);
      li.firstChild.remove();
      btnE.style.display = "none";
      inputEdit.focus();
      inputEdit.onkeydown = (e) => {
        if (e.key === "Enter") btnS.onclick();
      };
    };
    const btnR = document.createElement("button");
    btnR.textContent = "🗑️";
    btnR.onclick = () => {
      li.remove();
      atualizarContador();
      aplicarFiltro();
    };
    li.append(btnC, btnE, btnR);
    list.append(li);
    atualizarContador();
    aplicarFiltro();
  }

  // Botão de modo escuro
  const btnTheme = document.getElementById("btn-theme");
  if (btnTheme) {
    btnTheme.onclick = () => {
      document.body.classList.toggle("dark");
      btnTheme.textContent = document.body.classList.contains("dark")
        ? "☀️ Modo Claro"
        : "🌙 Modo Escuro";
    };
  }

  // Botão de priorizar
  const btnPrioritaria = document.getElementById("btn-prioritaria");
  if (btnPrioritaria) {
    btnPrioritaria.onclick = () => {
      // Remove a classe de todas as tarefas
      list
        .querySelectorAll("li")
        .forEach((li) => li.classList.remove("prioritaria"));
      // Marca a primeira tarefa pendente
      const li = list.querySelector("li:not(.completed)");
      if (li) {
        li.classList.add("prioritaria");
        msg.textContent = "Tarefa marcada como prioritária!";
        msg.style.display = "block";
        msg.style.color = "#ffd54f";
      } else {
        msg.textContent = "Nenhuma tarefa pendente para priorizar.";
        msg.style.display = "block";
        msg.style.color = "#c00";
      }
      setTimeout(() => (msg.style.display = "none"), 2000);
    };
  }
});
