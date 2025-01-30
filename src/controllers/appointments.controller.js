const pool = require('../config/database');

const appointmentsController = {
  getAppointments: async (req, res) => {
    try {
      const query = `
        SELECT a.*, s.name as service_name, u.name as hairdresser_name 
        FROM appointments a
        JOIN services s ON a.service_id = s.id
        JOIN users u ON a.hairdresser_id = u.id
        ORDER BY a.appointment_date, a.appointment_time
      `;

      const [appointments] = await pool.query(query);
      res.json(appointments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  createAppointment: async (req, res) => {
    try {
      const { hairdresser_id, service_id, appointment_date, appointment_time, client_id, notes } = req.body;

      // Verificar se o serviço existe e está ativo
      const [service] = await pool.query(
        'SELECT price FROM services WHERE id = ? AND active = true',
        [service_id]
      );

      if (service.length === 0) {
        return res.status(404).json({ message: 'Serviço não encontrado ou inativo' });
      }

      // Criar o agendamento
      const [result] = await pool.query(
        `INSERT INTO appointments 
        (client_id, hairdresser_id, service_id, appointment_date, appointment_time, total_price, notes, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
        [client_id, hairdresser_id, service_id, appointment_date, appointment_time, service[0].price, notes]
      );

      res.status(201).json({
        id: result.insertId,
        message: 'Agendamento criado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  updateAppointmentStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Verificar se é um status válido
      const validStatus = ['pending', 'confirmed', 'cancelled', 'completed'];
      if (!validStatus.includes(status)) {
        return res.status(400).json({ message: 'Status inválido' });
      }

      const [appointment] = await pool.query('SELECT * FROM appointments WHERE id = ?', [id]);

      if (appointment.length === 0) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
      }

      // Atualizar o status do agendamento
      const [result] = await pool.query(
        'UPDATE appointments SET status = ? WHERE id = ?',
        [status, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
      }

      res.json({ message: 'Status do agendamento atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
};

module.exports = appointmentsController;
