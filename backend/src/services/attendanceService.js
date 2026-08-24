import AttendanceRepository from '../repositories/attendanceRepository.js';

class AttendanceService {
  async register(classId, date, attendance) {
    if ( !classId || !date || !Array.isArray(attendance) || attendance.length === 0) {
      const error = new Error('Dados da frequência inválidos.');
      error.statusCode = 400;
      throw error;
    }
    const alreadyExists =
      await AttendanceRepository.existsByClassAndDate(
          Number(classId),
          date
      );

    if (alreadyExists) {
      const error = new Error(
        'A chamada dessa turma já foi realizada hoje.'
      );
      error.statusCode = 409;
      throw error;
    
    }
    // Mapeia para garantir o formato correto de data YYYY-MM-DD para o banco
    const registerFormatted = attendance.map((item) => ({
      studentId: Number(item.studentId),
      date, 
      present: Boolean(item.present),
      excusedAbsence: item.justification || '',
    }));

    // O repositório utiliza Upsert garantindo que se já existir para o aluno na date, ele atualiza,
    // evitando duplicidade e permitindo correções da chamada do dia.
    return AttendanceRepository.registerInBatch(registerFormatted);
  }
}

export default new AttendanceService();