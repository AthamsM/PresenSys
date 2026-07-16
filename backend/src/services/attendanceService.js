import AttendanceRepository from '../repositories/attendanceRepository.js';

class AttendanceService {
  async register(date, attendance, prisma) {
    if (!date || !Array.isArray(attendance) || attendance.length === 0) {
      const error = new Error('Dados da frequencia inválidos.');
      error.statusCode = 400;
      throw error;
    }

    // Mapeia para garantir o formato correto de data YYYY-MM-DD para o banco
    const registerFormatted = attendance.map((item) => ({
      studentId: Number(item.studentId),
      date, 
      present: Boolean(item.present),
    }));

    // O repositório utiliza Upsert garantindo que se já existir para o aluno na date, ele atualiza,
    // evitando duplicidade e permitindo correções da chamada do dia.
    return AttendanceRepository.registerInBatch(registerFormatted, prisma);
  }
}

export default new AttendanceService();