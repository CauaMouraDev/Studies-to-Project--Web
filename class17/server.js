const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Dados simulados de alunos
let alunos = [
  { nome: 'Ana', prontuario: '123', curso: 'Engenharia' },
  { nome: 'Bruno', prontuario: '456', curso: 'Direito' },
  { nome: 'Carla', prontuario: '789', curso: 'Engenharia' },
  { nome: 'Daniel', prontuario: '101', curso: 'Medicina' },
  { nome: 'Eduardo', prontuario: '102', curso: 'Arquitetura' },
  { nome: 'Fernanda', prontuario: '103', curso: 'Psicologia' },
  { nome: 'Gabriel', prontuario: '104', curso: 'Computação' }
];

// Rota estática
app.get('/sobre', (req, res) => {
  res.send('Sistema simples de cadastro de alunos. Cada aluno possui Nome, Prontuário e Curso.');
});

// Rota dinâmica com parâmetro
app.get('/alunos/:prontuario', (req, res) => {
  const aluno = alunos.find(a => a.prontuario === req.params.prontuario);
  if (aluno) {
    res.json(aluno);
  } else {
    res.status(404).json({ erro: 'Aluno não encontrado.' });
  }
});

// Rota com query string
app.get('/buscar', (req, res) => {
  const { curso } = req.query;
  if (curso) {
    const filtrados = alunos.filter(a => a.curso.toLowerCase() === curso.toLowerCase());
    res.json(filtrados);
  } else {
    res.json(alunos);
  }
});

// Rota para cadastrar aluno (POST)
app.post('/alunos', (req, res) => {
  const { nome, prontuario, curso } = req.body;
  if (!nome || !prontuario || !curso) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }
  if (alunos.find(a => a.prontuario === prontuario)) {
    return res.status(400).json({ erro: 'Prontuário já cadastrado.' });
  }
  const novoAluno = { nome, prontuario, curso };
  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
