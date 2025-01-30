// src/controllers/services.controller.js
const pool = require('../config/database');

const servicesController = {
    getAllServices: async (req, res) => {
        try {
            const { hairdresserId } = req.query;

            // Verificar se foi fornecido o hairdresserId
            if (!hairdresserId) {
                return res.status(400).json({ message: 'ID do cabeleireiro é necessário' });
            }

            // Buscar serviços do cabeleireiro
            const [services] = await pool.query(
                'SELECT * FROM `services` WHERE 1;',

            );

            res.json(services);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    getServicesByHairdresser: async (req, res) => {
        try {
            const { hairdresserId } = req.query;

            if (!hairdresserId) {
                return res.status(400).json({ message: 'ID do cabeleireiro é necessário' });
            }

            const [services] = await pool.query(
                'SELECT * FROM `services` WHERE hairdresser_id = ?;',
                [hairdresserId]
            );

            res.json(services);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    // No services.controller.js
    // No services.controller.js
    createService: async (req, res) => {
        try {
            const { hairdresser_id, name, description, price, duration, category } = req.body;

            if (!hairdresser_id) {
                return res.status(400).json({ message: 'ID do cabeleireiro é obrigatório' });
            }

            const [result] = await pool.query(
                'INSERT INTO services (hairdresser_id, name, description, price, duration, category, active) VALUES (?, ?, ?, ?, ?, ?, true)',
                [hairdresser_id, name, description, price, duration, category]
            );

            res.status(201).json({
                id: result.insertId,
                hairdresser_id,
                name,
                description,
                price,
                duration,
                category,
                active: true
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    updateService: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, price, duration, category } = req.body;

            const [result] = await pool.query(
                'UPDATE services SET name = ?, description = ?, price = ?, duration = ?, category = ? WHERE id = ?',
                [name, description, price, duration, category, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Serviço não encontrado' });
            }

            const [updatedService] = await pool.query(
                'SELECT * FROM services WHERE id = ?',
                [id]
            );

            res.json(updatedService[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    updateServiceStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { active } = req.body;

            const [result] = await pool.query(
                'UPDATE services SET active = ? WHERE id = ?',
                [active, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Serviço não encontrado' });
            }

            const [updatedService] = await pool.query(
                'SELECT * FROM services WHERE id = ?',
                [id]
            );

            res.json(updatedService[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    deleteService: async (req, res) => {
        try {
            const { id } = req.params;

            const [result] = await pool.query(
                'UPDATE services SET active = false WHERE id = ?',
                [id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Serviço não encontrado' });
            }

            res.json({ message: 'Serviço removido com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
};

module.exports = servicesController;