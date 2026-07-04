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
      serie: item.serie,
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
      serie: item.serie,
      class: item.class,
      foul: item.foul
    }));
  }

  async getFoulSerie(serie, startDate, endDate) {
    const values = await ReportRepository.getFoulSerie(
      serie,
      startDate,
      endDate
    );

    return values.map(item => ({
      id: item.id,
      name: item.name,
      registration: item.registration,
      serie: item.serie,
      class: item.class,
      fol: item.foul
    }));
  }

 async getFoulSerieInClass(serie, className, startDate, endDate) {
    const values = await ReportRepository.getFoulSerieInClass(
      serie,
      className,
      startDate,
      endDate
    );

    return values.map(item => ({
      id: item.id,
      name: item.name,
      registration: item.registration,
      serie: item.serie,
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
      serie: values.serie,
      class: values.class,
      totalfoul: values.totalfoul,
      foul: values.foul
    });
  }
}

export default new RelatorioService();