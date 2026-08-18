import ReportRepository from '../repositories/reportRepository.js';

class RelatorioService {

  async getFoulAll(startDate, endDate) {

    const values = await ReportRepository.getFoulAll(
      startDate,
      endDate
    );

    const foulsStudent = await Promise.all(
      values.map(async (item) => {

        const fouls = await ReportRepository.getFoulStudent(
          item.id,
          startDate,
          endDate
        );

        return {
          id: item.id,
          name: item.name,
          registration: item.registration,
          grade: item.grade,
          class: item.class,
          foul: fouls.foul,
          excusedAbsence: fouls.excusedAbsence
        };
      })
    );

    return {
      data: values.map(item => ({
        id: item.id,
        name: item.name,
        registration: item.registration,
        grade: item.grade,
        class: item.class,
        foul: item.foul,
        excusedAbsence: item.excusedAbsence
      })),
      foulsStudent
    };
  }

  async getFoulClass(className, startDate, endDate) {
    const values = await ReportRepository.getFoulClass(
      className,
      startDate,
      endDate
    );

    const foulsStudent = await Promise.all(
      values.map(async (item) => {

        const fouls = await ReportRepository.getFoulStudent(
          item.id,
          startDate,
          endDate
        );

        return {
          id: item.id,
          name: item.name,
          registration: item.registration,
          grade: item.grade,
          class: item.class,
          foul: fouls.foul,
          excusedAbsence: fouls.excusedAbsence
        };
      })
    );

    return {
      data: values.map(item => ({
        id: item.id,
        name: item.name,
        registration: item.registration,
        grade: item.grade,
        class: item.class,
        foul: item.foul,
        excusedAbsence: item.excusedAbsence
      })),
      foulsStudent
    };
  }

  async getFoulGrade(grade, startDate, endDate) {
    const values = await ReportRepository.getFoulGrade(
      grade,
      startDate,
      endDate
    );

    const foulsStudent = await Promise.all(
      values.map(async (item) => {

        const fouls = await ReportRepository.getFoulStudent(
          item.id,
          startDate,
          endDate
        );

        return {
          id: item.id,
          name: item.name,
          registration: item.registration,
          grade: item.grade,
          class: item.class,
          foul: fouls.foul,
          excusedAbsence: fouls.excusedAbsence
        };
      })
    );

    return {
      data: values.map(item => ({
        id: item.id,
        name: item.name,
        registration: item.registration,
        grade: item.grade,
        class: item.class,
        foul: item.foul,
        excusedAbsence: item.excusedAbsence
      })),
      foulsStudent
    };
  }

 async getFoulGradeInClass(grade, className, startDate, endDate) {
    const values = await ReportRepository.getFoulGradeInClass(
      grade,
      className,
      startDate,
      endDate
    );

    const foulsStudent = await Promise.all(
      values.map(async (item) => {

        const fouls = await ReportRepository.getFoulStudent(
          item.id,
          startDate,
          endDate
        );

        return {
          id: item.id,
          name: item.name,
          registration: item.registration,
          grade: item.grade,
          class: item.class,
          foul: fouls.foul,
          excusedAbsence: fouls.excusedAbsence
        };
      })
    );

    return {
      data: values.map(item => ({
        id: item.id,
        name: item.name,
        registration: item.registration,
        grade: item.grade,
        class: item.class,
        foul: item.foul,
        excusedAbsence: item.excusedAbsence
      })),
      foulsStudent
    };
  }
  
  async getFoulStudent(id, startDate, endDate) {
    const values = await ReportRepository.getFoulStudent(
      Number(id),
      startDate,
      endDate
    );

    return ({
      id: values.id,
      name: values.name,
      registration: values.registration,
      grade: values.grade,
      class: values.class,
      totalfoul: values.totalfoul,
      foul: values.foul,
      excusedAbsence: values.excusedAbsence
    });
  }
}

export default new RelatorioService();