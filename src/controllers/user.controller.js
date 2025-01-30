const pool = require('../config/database');

const userController = {
    // Buscar todos os usuários (ou filtrar por role)
    getAllUsers: async (req, res) => {
        try {
            const { role } = req.query; // Captura o parâmetro da URL
            let query = 'SELECT id, name, email, phone, role, profile_image, active, created_at, updated_at FROM users';
            let values = [];

            if (role) {
                query += ' WHERE role = ?';
                values.push(role);
            }

            const [users] = await pool.query(query, values);
            res.json(users);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    // Buscar usuário por ID
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;

            const [user] = await pool.query(
                'SELECT id, name, email, phone, role, profile_image, active, created_at, updated_at FROM users WHERE id = ?',
                [id]
            );

            if (user.length === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            res.json(user[0]);
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
};

module.exports = userController;
