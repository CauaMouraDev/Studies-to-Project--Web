

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Servir arquivos estáticos da pasta class18
app.use(express.static(path.join(__dirname)));

app.use(express.json());

// Array de tarefas (em memória)
let tarefas = [
	{ id: 1, titulo: 'Estudar Node.js', feito: false },
	{ id: 2, titulo: 'Fazer exercício', feito: true },
];

// 1. Visualizar todas as tarefas
app.get('/tarefas', (req, res) => {
	const { feito } = req.query;
	if (feito === 'true') {
		return res.json(tarefas.filter(t => t.feito));
	}
	if (feito === 'false') {
		return res.json(tarefas.filter(t => !t.feito));
	}
	res.json(tarefas);
});

// 4. Inserir uma nova tarefa
app.post('/tarefas', (req, res) => {
	const { titulo, feito } = req.body;
	if (!titulo || typeof feito !== 'boolean') {
		return res.status(400).json({ erro: 'Título e status "feito" são obrigatórios.' });
	}
	const novaTarefa = {
		id: tarefas.length ? tarefas[tarefas.length - 1].id + 1 : 1,
		titulo,
		feito,
	};
	tarefas.push(novaTarefa);
	res.status(201).json(novaTarefa);
});

// 5. Alterar uma tarefa existente
app.put('/tarefas/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const { titulo, feito } = req.body;
	const tarefa = tarefas.find(t => t.id === id);
	if (!tarefa) {
		return res.status(404).json({ erro: 'Tarefa não encontrada.' });
	}
	if (titulo !== undefined) tarefa.titulo = titulo;
	if (feito !== undefined) tarefa.feito = feito;
	res.json(tarefa);
});

// 6. Deletar uma tarefa
app.delete('/tarefas/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = tarefas.findIndex(t => t.id === id);
	if (index === -1) {
		return res.status(404).json({ erro: 'Tarefa não encontrada.' });
	}
	tarefas.splice(index, 1);
	res.status(204).send();
});

app.listen(PORT, () => {
	console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Resposta JSON para rotas não encontradas
app.use((req, res, next) => {
	if (req.accepts('json')) {
		res.status(404).json({ erro: 'Rota não encontrada.' });
	} else {
		res.status(404).send('Rota não encontrada.');
	}
});
