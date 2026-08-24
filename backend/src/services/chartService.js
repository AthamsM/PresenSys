import attendanceRepository from '../repositories/attendanceRepository.js';

class ChartService {

  async foulsPerMonth(year) {

    const fouls = await attendanceRepository.foulsPerMonth(year);

    if (!fouls) {

      const error = new Error('nenhuma falta encontrada');
      error.statusCode = 400;
      throw error;

    }

    return fouls;

  }

  async studentsMostFouls(year) {

    const mostFouls = await attendanceRepository.studentsMostFouls(year);

    if (!mostFouls) {

      const error = new Error('nenhum aluno encontrada');
      error.statusCode = 400;
      throw error;

    }

    return mostFouls;

  }

  async classesFouls(year) {

    const mostFouls = await attendanceRepository.classesFouls(year);

    if (!mostFouls) {

      const error = new Error('nenhuma turma encontrada');
      error.statusCode = 400;
      throw error;

    }

    return Object.values(mostFouls.reduce((acc, foul) => {

      const key = foul.classes.id;
        
      if (!acc[key]) {

        acc[key] = {class: foul.classes, fouls: 0, presences: 0};

      };
      
      acc[key].fouls += foul.fouls;
      acc[key].presences += foul.presences;

      return acc;

    }, {}));

  }

  async presencesFouls(year) {

    const presencesFoul = await attendanceRepository.presencesFouls(year);

    if (!presencesFoul) {

      const error = new Error('nenhuma turma encontrada');
      error.statusCode = 400;
      throw error;

    }

    return presencesFoul;

  }

}

export default new ChartService();