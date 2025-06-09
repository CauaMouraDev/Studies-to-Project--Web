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
      // Captura o texto da tarefa corretamente, mesmo após edições
      let textoTarefa = Array.from(li.childNodes).find(
        (node) =>
          node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ""
      );
      if (!textoTarefa) {
        // Se não encontrar, cria um novo nó de texto vazio
        textoTarefa = document.createTextNode("");
        li.insertBefore(textoTarefa, li.firstChild);
      }
      const inputEdit = document.createElement("input");
      inputEdit.value = textoTarefa.textContent.trim();
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
        // Remove input e botão salvar
        inputEdit.remove();
        btnS.remove();
        // Insere o texto editado no início do li, antes dos botões
        const novoTexto = document.createTextNode(inputEdit.value + " ");
        li.insertBefore(novoTexto, li.firstChild);
        btnE.style.display = "inline-block";
      };
      // Remove o texto da tarefa do DOM para mostrar o input
      if (textoTarefa) textoTarefa.remove();
      li.insertBefore(inputEdit, btnC);
      li.insertBefore(btnS, btnC);
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
    btnTheme.onclick = function () {
      document.body.classList.toggle("dark");
      // Troca o texto do botão
      if (document.body.classList.contains("dark")) {
        btnTheme.textContent = "☀️ Modo Claro";
      } else {
        btnTheme.textContent = "🌙 Modo Escuro";
      }
    };
  }

  // Botão de priorizar
  const btnPrioritaria = document.getElementById("btn-prioritaria");
  if (btnPrioritaria) {
    btnPrioritaria.onclick = function () {
      // Remove prioritaria de todos
      list
        .querySelectorAll("li")
        .forEach((li) => li.classList.remove("prioritaria"));
      // Adiciona na primeira tarefa não concluída
      const li = list.querySelector("li:not(.completed)");
      if (li) {
        li.classList.add("prioritaria");
        msg.textContent = "Tarefa marcada como prioritária!";
        msg.style.display = "block";
        msg.style.color = "#ffd54f";
        setTimeout(() => (msg.style.display = "none"), 2000);
      } else {
        msg.textContent = "Nenhuma tarefa pendente para priorizar.";
        msg.style.display = "block";
        msg.style.color = "#c00";
        setTimeout(() => (msg.style.display = "none"), 2000);
      }
    };
  }
});
