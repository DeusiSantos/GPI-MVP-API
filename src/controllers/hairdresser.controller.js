// src/controllers/hairdresser.controller.js
const pool = require('../config/database');

const hairdresserController = {
    getAllHairdressers: async (req, res) => {
        try {
            const [hairdressers] = await pool.query(
                'SELECT id, name, email, phone FROM users WHERE role = "hairdresser"'
            );
            res.json(hairdressers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    getHairdresserById: async (req, res) => {
        try {
            const [hairdresser] = await pool.query(
                'SELECT id, name, email, phone FROM users WHERE id = ? AND role = "hairdresser"',
                [req.params.id]
            );
            
            if (hairdresser.length === 0) {
                return res.status(404).json({ message: 'Cabeleireiro não encontrado' });
            }
            
            res.json(hairdresser[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
};

module.exports = hairdresserController;