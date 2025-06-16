const getCEP = async (cep) => {
     const CEP = document.getElementById
    const resultado = await axios.get(`https://cep.awesomeapi.com.br/json/${cep}`);
    console.dir(resultado.data.address);
    console.dir(resultado.data.city);
    console.dir(resultado.data.ddd);


};

getCEP(12301598);