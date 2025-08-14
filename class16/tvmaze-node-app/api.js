const axios = require('../my_project/node_modules/axios/index.d.cts');

async function fetchSeries(query) {
    const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;
    const response = await axios.get(url);
    return response.data;
}

module.exports = { fetchSeries };
