// src/controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Verificar se JWT_SECRET está definido
if (!process.env.JWT_SECRET) {
   console.error('JWT_SECRET não está definido nas variáveis de ambiente');
   process.exit(1);
}

const authController = {
   // Login do usuário
   login: async (req, res) => {
       try {
           const { email, password } = req.body;

           if (!email || !password) {
               return res.status(400).json({ message: 'Email e senha são obrigatórios' });
           }

           // Buscar usuário
           const [users] = await pool.query(
               'SELECT * FROM users WHERE email = ?', 
               [email]
           );

           if (users.length === 0) {
               return res.status(401).json({ message: 'Email ou senha inválidos' });
           }

           const user = users[0];

           // Verificar senha
           const isValidPassword = await bcrypt.compare(password, user.password);

           if (!isValidPassword) {
               return res.status(401).json({ message: 'Email ou senha inválidos' });
           }

           // Gerar token JWT
           const token = jwt.sign(
               { 
                   id: user.id, 
                   role: user.role 
               },
               process.env.JWT_SECRET,
               { expiresIn: '24h' }
           );

           // Retornar dados do usuário e token
           res.json({
               token,
               user: {
                   id: user.id,
                   name: user.name,
                   email: user.email,
                   role: user.role,
                   phone: user.phone
               }
           });

       } catch (error) {
           console.error('Erro no login:', error);
           res.status(500).json({ message: 'Erro interno do servidor' });
       }
   },

   // Registro de novo usuário
   register: async (req, res) => {
       try {
           const { name, email, password, phone, role } = req.body;

           // Validações básicas
           if (!name || !email || !password || !role) {
               return res.status(400).json({ 
                   message: 'Todos os campos obrigatórios devem ser preenchidos' 
               });
           }

           // Verificar se email já existe
           const [existing] = await pool.query(
               'SELECT id FROM users WHERE email = ?', 
               [email]
           );

           if (existing.length > 0) {
               return res.status(400).json({ message: 'Email já cadastrado' });
           }

           // Hash da senha
           const hashedPassword = await bcrypt.hash(password, 10);

           // Inserir usuário
           const [result] = await pool.query(
               'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
               [name, email, hashedPassword, phone, role]
           );

           // Gerar token para o novo usuário
           const token = jwt.sign(
               { 
                   id: result.insertId,
                   role: role 
               },
               process.env.JWT_SECRET,
               { expiresIn: '24h' }
           );

           // Retornar dados do novo usuário
           res.status(201).json({
               message: 'Usuário criado com sucesso',
               token,
               user: {
                   id: result.insertId,
                   name,
                   email,
                   role,
                   phone
               }
           });

       } catch (error) {
           console.error('Erro no registro:', error);
           res.status(500).json({ 
               message: 'Erro interno do servidor',
               error: error.message 
           });
       }
   }
};

module.exports = authController;