document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        buscarSeries(query);
    }
});

  function buscarSeries(query) {
    const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;
    axios.get(url)
        .then(response => mostrarResultados(response.data))
        .catch(() => {
            document.getElementById('results').innerHTML = '<p>Erro ao buscar séries.</p>';
        });
}


function mostrarResultados(series) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (!series.length) {
        resultsDiv.innerHTML = '<p>Nenhuma série encontrada.</p>';
        return;
    }
    series.forEach(item => {
        const show = item.show;
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = show.image && show.image.medium ? show.image.medium : 'https://via.placeholder.com/210x295?text=Sem+Imagem';
        img.alt = show.name;
        card.appendChild(img);

        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = show.name;
        card.appendChild(title);

        const score = document.createElement('div');
        score.className = 'score';
        score.textContent = `Score: ${item.score.toFixed(2)}`;
        card.appendChild(score);

        resultsDiv.appendChild(card);
    });
}
