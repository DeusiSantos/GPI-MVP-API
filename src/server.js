// src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Teste de rota
app.get('/', (req, res) => {
    res.json({ message: 'Bem vindo à API do Karapinha!' });
});

// Rotas da API
app.use('/api/auth', require('./routes/auth.routes.js'));
app.use('/api/hairdressers', require('./routes/hairdressers.routes.js'));
app.use('/api/services', require('./routes/services.routes.js'));
app.use('/api/appointments', require('./routes/appointments.routes.js'));
app.use('/api/users', require('./routes/users.routes.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});