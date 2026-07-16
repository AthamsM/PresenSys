import ReportRepository from '../repositories/reportRepository.js';

class RelatorioService {

  async getFoulAll(startDate, endDate, prisma) {

    const values = await ReportRepository.getFoulAll(
      startDate,
      endDate,
      prisma
    );

    const foulsStudent = await Promise.all(
      values.map(async (item) => {

        const fouls = await ReportRepository.getFoulStudent(
          item.id,
          startDate,
          endDate,
          prisma
        );

        return {
          id: item.id,
          name: item.name,
          registration: item.registration,
          grade: item.grade,
          class: item.class,
          foul: fouls.foul
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
        foul: item.foul
      })),
      foulsStudent
    };
  }

  async getFoulClass(className, startDate, endDate, prisma) {
    const values = await ReportRepository.getFoulClass(
      className,
      startDate,
      endDate,
      prisma
    );

    const foulsStudent = await Promise.all(
      values.map(async (item) => {

        const fouls = await ReportRepository.getFoulStudent(
          item.id,
          startDate,
          endDate,
          prisma
        );

        return {
          id: item.id,
          name: item.name,
          registration: item.registration,
          grade: item.grade,
          class: item.class,
          foul: fouls.foul
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
        foul: item.foul
      })),
      foulsStudent
    };
  }

  async getFoulGrade(grade, startDate, endDate, prisma) {
    const values = await ReportRepository.getFoulGrade(
      grade,
      startDate,
      endDate,
      prisma
    );

    const foulsStudent = await Promise.all(
      values.map(async (item) => {

        const fouls = await ReportRepository.getFoulStudent(
          item.id,
          startDate,
          endDate,
          prisma
        );

        return {
          id: item.id,
          name: item.name,
          registration: item.registration,
          grade: item.grade,
          class: item.class,
          foul: fouls.foul
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
        foul: item.foul
      })),
      foulsStudent
    };
  }

 async getFoulGradeInClass(grade, className, startDate, endDate, prisma) {
    const values = await ReportRepository.getFoulGradeInClass(
      grade,
      className,
      startDate,
      endDate,
      prisma
    );

    const foulsStudent = await Promise.all(
      values.map(async (item) => {

        const fouls = await ReportRepository.getFoulStudent(
          item.id,
          startDate,
          endDate,
          prisma
        );

        return {
          id: item.id,
          name: item.name,
          registration: item.registration,
          grade: item.grade,
          class: item.class,
          foul: fouls.foul
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
        foul: item.foul
      })),
      foulsStudent
    };
  }
  
  async getFoulStudent(id, startDate, endDate, prisma) {
    const values = await ReportRepository.getFoulStudent(
      Number(id),
      startDate,
      endDate,
      prisma
    );

    return ({
      id: values.id,
      name: values.name,
      registration: values.registration,
      grade: values.grade,
      class: values.class,
      totalfoul: values.totalfoul,
      foul: values.foul
    });
  }
}

export default new RelatorioService();