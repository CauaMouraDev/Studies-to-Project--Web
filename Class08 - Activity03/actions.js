var agenda = [];

function addEvent(date, description) {
  agenda.push({ date: date, description: description });
  console.log("Evento adicionado com sucesso!");
  return agenda;
}

function removeEvent(date, description) {
  for (var i = 0; i < agenda.length; i++) {
    if (agenda[i].date === date && agenda[i].description === description) {
      agenda.splice(i, 1);
      console.log("Evento removido com sucesso!");
      return agenda;
    }
  }
  console.log("Evento não encontrado!");
  return agenda;
}

function listEvents() {
  console.log("Agenda:");
  if (agenda.length === 0) {
    console.log("Nenhum evento encontrado!");
  } else {
    agenda.forEach((event, index) => {
      console.log(
        `${index + 1}. Data: ${event.date}, Descrição: ${event.description}`
      );
    });
  }
}

function editEvent(oldDate, oldDescription, newDate, newDescription) {
  for (var i = 0; i < agenda.length; i++) {
    if (
      agenda[i].date === oldDate &&
      agenda[i].description === oldDescription
    ) {
      agenda[i] = { date: newDate, description: newDescription };
      console.log("Evento editado com sucesso!");
      return agenda;
    }
  }
  console.log("Evento não encontrado!");
  return agenda;
}

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Digite a data do evento (DD/MM/AAAA): ", (date) => {
  rl.question("Digite a descrição do evento: ", (description) => {
    addEvent(date, description);
    listEvents();
    rl.close();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Atualiza a lista de eventos ao carregar a página
  handleListEvents();

  // Conecta os botões às funções
  document
    .querySelector("button[onclick='handleAddEvent()']")
    .addEventListener("click", handleAddEvent);
  document
    .querySelector("button[onclick='handleEditEvent()']")
    .addEventListener("click", handleEditEvent);
  document
    .querySelector("button[onclick='handleRemoveEvent()']")
    .addEventListener("click", handleRemoveEvent);
});
