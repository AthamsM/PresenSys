import RelatorioRepository from '../repositories/relatorioRepository.js';
import AlunoRepository from '../repositories/alunoRepository.js';

class RelatorioService {
  async listarFaltasPorAluno() {
    const dados = await RelatorioRepository.getFaltasPorAluno();
    return dados.map(item => ({
      id: item.id,
      nome: item.nome,
      matricula: item.matricula,
      totalFaltas: item._count.frequencias
    }));
  }

  async listarFaltasPorTurma(turmaId) {
    const dados = await RelatorioRepository.getFaltasPorTurma(Number(turmaId));
    return dados.map(item => ({
      id: item.id,
      nome: item.nome,
      matricula: item.matricula,
      totalFaltas: item._count.frequencias
    }));
  }

  async listarFaltasPorSerie() {
    return RelatorioRepository.getFaltasPorSerie();
  }

  async calcularPercentualPresenca(alunoId) {
    const aluno = await AlunoRepository.findById(Number(alunoId));
    if (!aluno) {
      const error = new Error('Aluno não encontrado.');
      error.statusCode = 404;
      throw error;
    }

    const frequencias = await RelatorioRepository.getDadosPresencaAluno(Number(alunoId));
    const totalDias = frequencias.length;

    if (totalDias === 0) {
      return { aluno: aluno.nome, percentualPresenca: "100.00%", totalDias };
    }

    const diasPresente = frequencias.filter(f => f.presente).length;
    const percentual = (diasPresente / totalDias) * 100;

    return {
      aluno: aluno.nome,
      matricula: aluno.matricula,
      totalDias,
      diasPresente,
      diasAusente: totalDias - diasPresente,
      percentualPresenca: `${percentual.toFixed(2)}%`
    };
  }
}

export default new RelatorioService();