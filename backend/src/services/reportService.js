import ReportRepository from '../repositories/reportRepository.js';

class RelatorioService {

  async getFoulAll(startDate, endDate) {
    const values = await ReportRepository.getFoulAll(
      startDate,
      endDate
    );

    return values.map(item => ({
      id: item.id,
      name: item.name,
      registration: item.registration,
      grade: item.grade,
      class: item.class,
      foul: item.foul
    }));
  }

  async getFoulClass(className, startDate, endDate) {
    const values = await ReportRepository.getFoulClass(
      className,
      startDate,
      endDate
    );

    return values.map(item => ({
      id: item.id,
      name: item.name,
      registration: item.registration,
      grade: item.grade,
      class: item.class,
      foul: item.foul
    }));
  }

  async getFoulGrade(grade, startDate, endDate) {
    const values = await ReportRepository.getFoulGrade(
      grade,
      startDate,
      endDate
    );

    return values.map(item => ({
      id: item.id,
      name: item.name,
      registration: item.registration,
      grade: item.grade,
      class: item.class,
      foul: item.foul
    }));
  }

 async getFoulGradeInClass(grade, className, startDate, endDate) {
    const values = await ReportRepository.getFoulGradeInClass(
      grade,
      className,
      startDate,
      endDate
    );

    return values.map(item => ({
      id: item.id,
      name: item.name,
      registration: item.registration,
      grade: item.grade,
      class: item.class,
      foul: item.foul
    }));
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
      foul: values.foul
    });
  }
}

export default new RelatorioService();