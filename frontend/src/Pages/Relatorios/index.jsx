import { useState } from "react";

export default function Relatorios() {

  const [mesAtual, setMesAtual] = useState('');
  const [arquivo, setArquivo] = useState('pdf');
  const [filtro, setFiltro] = useState({'ano':'', 'turma':'', 'dataInicial':'', 'dataFinal':''});
  const [ordem, setOrdem] = useState('turma');
  const [dados, setDados] = useState([]);

  return(
    <div className="ml-10 mt-5 w-fit">

      <h1 className="text-2xl font-bold">Relatórios</h1>
      <div className="flex justify-between items-center">
        <p>Acompanhe frequência, faltas e indicadores por turma</p>

        <div className="flex gap-2">
          <button onClick={() => setArquivo('xlsx')}
          className={arquivo === 'xlsx' ? 'bg-blue-500 px-4 py-1 rounded-xl text-white' : 'border border-gray-400 px-4 py-1 rounded-xl'}>
            Excel
          </button>
          <button onClick={() => setArquivo('pdf')}
          className={arquivo === 'pdf' ? 'bg-blue-500 px-4 py-1 rounded-xl text-white' : 'border border-gray-400 px-4 py-1 rounded-xl'}>
            PDF
          </button>
        </div>
      </div>

      <div className="border border-gray-400 rounded-xl mt-5 flex gap-5 p-5">
        <div>
          <h3>Ano</h3>
          <select name="ano" id="ano" className="border border-gray-400 rounded-xl p-1" onChange={(e) => setFiltro({...filtro, ano: e.target.value})}>
            <option value="">Selecione um Ano</option>
            <option value="1">Turma 1</option>
            <option value="2">Turma 2</option>
          </select>
        </div>

        <div>
          <h3>Turma</h3>
          <select name="turma" id="turma" className="border border-gray-400 rounded-xl p-1" onChange={(e) => setFiltro({...filtro, turma: e.target.value})}>
            <option value="">Selecione uma turma</option>
            <option value="1">Turma 1</option>
            <option value="2">Turma 2</option>
          </select>
        </div>

        <div>
          <h3>Data inicial</h3>
          <input type="date" name="inicial" id="inicial" className="border border-gray-400 rounded-xl p-1" onChange={(e) => setFiltro({...filtro, dataInicial: e.target.value})}>
          </input>
        </div>

        <div>
          <h3>Data final</h3>
          <input type="date" name="final" id="final" className="border border-gray-400 rounded-xl p-1" onChange={(e) => setFiltro({...filtro, dataFinal: e.target.value})}>
          </input>
        </div>
        
      </div>
      <div className="flex gap-5 mt-5">
        <button className={ordem === 'turma' ? 'bg-blue-500 px-4 py-1 rounded-xl text-white' : 'border border-gray-400 px-4 py-1 rounded-xl'}
          onClick={()=> setOrdem('turma')}>Por turma</button>

        <button className={ordem === 'ano' ? 'bg-blue-500 px-4 py-1 rounded-xl text-white' : 'border border-gray-400 px-4 py-1 rounded-xl'}
          onClick={()=> setOrdem('ano')}>Por ano</button>

        <button className={ordem === 'geral' ? 'bg-blue-500 px-4 py-1 rounded-xl text-white' : 'border border-gray-400 px-4 py-1 rounded-xl'}
          onClick={()=> setOrdem('geral')}>Geral</button>

        <button className={ordem === 'ranking' ? 'bg-blue-500 px-4 py-1 rounded-xl text-white' : 'border border-gray-400 px-4 py-1 rounded-xl'}
          onClick={()=> setOrdem('ranking')}>Ranking das faltas</button>
      </div>
      <div className="border border-gray-400 rounded-xl mt-5 p-5">
        <div>
          <h1 className="text-lg font-bold">Frequência por turma</h1>
          <p>Periodo: {mesAtual}</p>
        </div>


        <table class="w-full text-sm  text-left border-separate border-spacing-y-3 ">

          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr class="bg-gray-100">
              <th scope="col">Turma</th>
              <th scope="col">Alunos</th>
              <th scope="col">Faltas</th>
              <th scope="col">Frequência</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            {dados.map((e, index) => (
              <tr key={index}>
                <td className="border-b border-gray-200">{e.turma}</td>
                <td className="border-b border-gray-200">{e.alunos}</td>
                <td className="border-b border-gray-200">{e.faltas}</td>
                <td className="border-b border-gray-200">{e.frequencia}</td>
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>
    </div>
  )
}