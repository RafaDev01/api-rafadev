const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const VISITAS_FILE_PATH = path.join(__dirname, 'visitas.txt');

// Função para ler e atualizar o número de visitas
const getVisitas = () => {
    if (fs.existsSync(VISITAS_FILE_PATH)) {
        return parseInt(fs.readFileSync(VISITAS_FILE_PATH, 'utf8'));
    }
    return 0;
};

const incrementVisitas = () => {
    const visitas = getVisitas() + 1;
    fs.writeFileSync(VISITAS_FILE_PATH, visitas.toString());
    return visitas;
};

app.get('/visitas', (req, res) => {
    const visitas = getVisitas();
    res.json({ visitas });
});

// Middleware para contar uma visita por cada requisição
app.use((req, res, next) => {
    incrementVisitas();
    next();
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
