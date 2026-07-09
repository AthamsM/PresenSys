import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Controller/Api";
import Button from "../../Components/Button";

function Report() {

  const [file, setFile] = useState("pdf");

  const [filter, setFilter] = useState({
    grade: "",
    class: "",
    startDate: "",
    endDate: ""
  });

  const [datas, setDatas] = useState([]);

  const navigate = useNavigate();

  async function carregarRelatorio() {
    let rota = "/reports/foul-all";
    if(!filter.startDate && !filter.endDate){
      return console.warn("Preencha o intervalor");
    }

    if (filter.grade && filter.class) {
      rota = "/reports/foul-grade-class";
    } else if (filter.grade) {
      rota = "/reports/foul-grade";
    } else if (filter.class) {
      rota = "/reports/foul-class";
    }

    try {
      const { data } = await API.get(rota, {
        params: {
          grade: filter.grade,
          className: filter.class,
          startDate: filter.startDate,
          endDate: filter.endDate
        }
      });

      setDatas(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    carregarRelatorio();
  }, []);

  return(
    <div className="mx-10 my-10">

      <h1 className="text-2xl font-bold">Relatórios</h1>
      <div className="flex justify-between items-center">
        <p>Acompanhe faltas por meio de filtros</p>

        <div className="flex gap-2">
          <button onClick={() => setFile('xlsx')}
          className={file === 'xlsx' ? 'bg-blue-500 px-4 py-1 rounded-xl text-white' : 'border border-gray-400 px-4 py-1 rounded-xl'}>
            Excel
          </button>
          <button onClick={() => setFile('pdf')}
          className={file === 'pdf' ? 'bg-blue-500 px-4 py-1 rounded-xl text-white' : 'border border-gray-400 px-4 py-1 rounded-xl'}>
            PDF
          </button>
        </div>
      </div>

      <div className="border border-gray-400 rounded-xl mt-5 flex gap-5 p-5 w-fit">
        <div>
          <h3>Ano</h3>
          <select name="ano" id="ano" className="border border-gray-400 rounded-xl p-1" onChange={(e) => setFilter({...filter, grade: e.target.value})}>
            <option value="">Selecione um Ano</option>
            <option value="1º Ano">1º Ano</option>
            <option value="2º Ano">2º Ano</option>
            <option value="3º Ano">3º Ano</option>
          </select>
        </div>
        <div>
          <h3>Turma</h3>
          <select name="turma" id="turma" className="border border-gray-400 rounded-xl p-1" onChange={(e) => setFilter({...filter, class: e.target.value})}>
            <option value="">Selecione uma turma</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>
        <div>
          <h3>Data inicial</h3>
          <input type="date" name="inicial" id="inicial" className="border border-gray-400 rounded-xl p-1" onChange={(e) => setFilter({...filter, startDate: e.target.value})}>
          </input>
        </div>
        <div>
          <h3>Data final</h3>
          <input type="date" name="final" id="final" className="border border-gray-400 rounded-xl p-1" onChange={(e) => setFilter({...filter, endDate: e.target.value})}>
          </input>
        </div>
        <div className="flex items-end">
          <Button onClick={carregarRelatorio} type="submit"  className=" bg-[#155DDD] hover:bg-[#155DDD] active:bg-[#155DDD] rounded-xl font-bold text-sm text-[#EBEBEB] cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#155DDD] transition delay-50 duration-50 ease-in-out">Buscar</Button>
        </div>
      </div>

      <div className="border border-gray-400 rounded-xl mt-5 px-5 h-[calc(100vh-330px)] overflow-y-auto overflow-x-hidden">

        <table className="table-auto w-full text-base text-left border-separate border-spacing-y-3">
          <thead className="text-base text-gray-700 uppercase bg-white sticky top-0 z-10">
            <tr>
              <th className="py-3" scope="col">Série</th>
              <th className="py-3" scope="col">Turma</th>
              <th className="py-3" scope="col">Alunos</th>
              <th className="py-3" scope="col">Faltas</th>
            </tr>
          </thead>
          <tbody className="">
            {datas.map((e, index) => (
              <tr key={index} className="p-5">
                <td className="border-b border-gray-200">{e.grade}</td>
                <td className="border-b border-gray-200">{e.class}</td>
                <td className="border-b border-gray-200">{e.name}</td>
                <td className="border-b border-gray-200">{e.foul}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Report;