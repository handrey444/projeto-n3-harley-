const express = require('express');
const cors = require('cors');
const router = require('./routes/routes');
const path = require('path');


const app = express();
const port =  3000;

app.use(cors());




app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'front-end', 'index.html'));
});



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});