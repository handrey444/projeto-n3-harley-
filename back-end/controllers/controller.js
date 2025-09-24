const dadosLista = [];

const addData = (req, res) => {
    const { temp, umid } = req.query;

    if (temp && umid) {
        const newData = {
            temperatura: parseFloat(temp),
            umidade: parseFloat(umid),

        };
        dadosLista.push(newData);
        console.log('Dados recebidos:', newData);
        res.status(200).send('Dados recebidos com sucesso!');
    } else {
        res.status(400).send('Parâmetros de temperatura e/ou umidade ausentes.');
    }
};

const getAllData = (req, res) => {
    res.status(200).json(dadosLista);
};

module.exports = {
    addData,
    getAllData,
};