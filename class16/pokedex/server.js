
import express from 'express';
import axios from 'axios';
import _ from 'lodash';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota GET /apis: busca dados da PokéAPI, ordena alfabeticamente pelo nome
app.get('/apis', async (req, res) => {
    try {
        // Busca os primeiros 10 pokémons
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
        const results = response.data.results;

        // Busca detalhes de cada Pokémon
        const detalhesPromises = results.map(async (poke) => {
            const pokeRes = await axios.get(poke.url);
            const data = pokeRes.data;
            return {
                name: data.name,
                id: data.id,
                url: poke.url,
                types: data.types.map(t => t.type.name)
            };
        });
        let detalhes = await Promise.all(detalhesPromises);

        // Filtrar: exemplo, só pokémons cujo nome começa com 'p'
        detalhes = detalhes.filter(p => p.name.startsWith('p'));

        // Ordenar alfabeticamente pelo nome
        const ordenados = _.orderBy(detalhes, ['name'], ['asc']);
        res.json(ordenados);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados da API.' });
    }
});

app.get('/pokemon', async (req, res) => {
    const name = req.query.name;
    if (!name) {
        return res.status(400).json({ error: 'Nome do Pokémon não informado.' });
    }
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const pokedata = response.data;
        const pokemon = {
            name: pokedata.name,
            image: pokedata.sprites.front_default,
            id: pokedata.id,
            types: pokedata.types.map(typeInfo => typeInfo.type.name),
            height: pokedata.height,
            weight: pokedata.weight,
            abilities: pokedata.abilities.map(abilityInfo => abilityInfo.ability.name),
        };
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Pokémon.' });
    }
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
