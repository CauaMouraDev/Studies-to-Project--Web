// actions.js - Aula10
// Função para buscar valores de criptomoedas e atualizar na página

async function fetchCryptoPrices() {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,binancecoin&vs_currencies=brl";
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar preços de criptomoedas:", error);
    return null;
  }
}

function renderCryptoPrices(prices) {
  const container = document.getElementById("crypto-prices");
  if (!container) return;
  if (!prices) {
    container.innerHTML = "<p>Erro ao carregar valores.</p>";
    return;
  }
  const coins = [
    { id: "bitcoin", nome: "Bitcoin" },
    { id: "ethereum", nome: "Ethereum" },
    { id: "solana", nome: "Solana" },
    { id: "cardano", nome: "Cardano" },
    { id: "binancecoin", nome: "Binance Coin" },
  ];
  container.innerHTML = `
    <table class="crypto-table">
      <thead>
        <tr>
          <th>Criptomoeda</th>
          <th>Valor (BRL)</th>
        </tr>
      </thead>
      <tbody>
        ${coins
          .map(
            (coin) => `
          <tr>
            <td>${coin.nome}</td>
            <td>R$ ${
              prices[coin.id]?.brl?.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              }) || "-"
            }</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

async function updateCryptoPrices() {
  const prices = await fetchCryptoPrices();
  renderCryptoPrices(prices);
}

// Atualiza a cada 20 segundos
document.addEventListener("DOMContentLoaded", () => {
  updateCryptoPrices();
  setInterval(updateCryptoPrices, 20000);
});
