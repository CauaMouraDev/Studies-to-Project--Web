const getCEP = async (cep) => {
    try {
        const resultado = await axios.get( `https://cep.awesomeapi.com.br/json/${cep}` );
        const data = resultado.data;
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = `
            <strong>Endereço:</strong> ${data.address}<br>
            <strong>Cidade:</strong> ${data.city}<br>
            <strong>Local:</strong> ${data.state}<br>
            <strong>DDD:</strong> ${data.ddd}
        `;
    } catch (error) {
        document.getElementById("result").innerHTML = "CEP não encontrado!";
    }
};

const cepInput = document.getElementById("cepInput");
if (cepInput) {
    cepInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            const cep = event.target.value;
            if (cep) {
                getCEP(cep);
        }
    }
    });
}
