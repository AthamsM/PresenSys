import attendanceRepository from '../repositories/attendanceRepository.js';

class ChartService {

  // async foulsPerMonth(year) {

  //   //const fouls = await ChartRepository.foulsPerMonth(new Date(year, 0, 1));

  // }

  async studentsMostFouls(year) {

    const mostFouls = await attendanceRepository.studentsMostFouls(year);

    if (!mostFouls) {

      const error = new Error('nenhuma turma encontrada');
      error.statusCode = 400;
      throw error;

    }

    return mostFouls;

  }

}

export default new ChartService();