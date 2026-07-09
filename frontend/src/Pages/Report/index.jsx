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
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  async function findReports() {
    let rota = "/reports/foul-all";
    if (!filter.startDate || !filter.endDate) {
      return alert("Preencha o intervalo.");
    }
    if (filter.startDate > filter.endDate) {
      return alert("A data inicial não pode ser maior que a final.");
    }
    setLoading(true);

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
    finally {
      setLoading(false)
    }
  }

  const [className, setClassName] = useState([]);
  const [classGrade, setClassGrade] = useState([]);
  async function findClass() {
    try {
      const { data } = await API.get("/class");
      const name = [...new Set(data.map(item => item.name))];
      const grade = [...new Set(data.map(item => item.grade))];

      setClassName(name);
      setClassGrade(grade);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    findClass();
  }, []);

  return (
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

      <div className="border border-gray-400 rounded-xl mt-5 p-5 w-full grid grid-cols-1 justify-start sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="flex flex-col gap-1">
          <h3>Ano</h3>
          <select name="ano" id="ano" className="border border-gray-400 rounded-xl p-1" onChange={(e) => setFilter({ ...filter, grade: e.target.value })}>
            <option value="">Selecione um Ano</option>
            {classGrade.map((gradeClass, index) => (
              <option key={index} value={gradeClass}>
                {gradeClass}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <h3>Turma</h3>
          <select name="turma" id="turma" className="border border-gray-400 rounded-xl p-1" onChange={(e) => setFilter({ ...filter, class: e.target.value })}>
            <option value="">Selecione uma turma</option>
            {className.map((nameClass, index) => (
              <option key={index} value={nameClass}>
                {nameClass}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <h3>Data inicial</h3>
          <input type="date" name="inicial" id="inicial" className="border border-gray-400 rounded-xl p-1" onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}>
          </input>
        </div>
        <div className="flex flex-col gap-1">
          <h3>Data final</h3>
          <input type="date" name="final" id="final" className="border border-gray-400 rounded-xl p-1" onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}>
          </input>
        </div>
        <div className="flex items-end">
          <Button onClick={findReports} disabled={loading} type="submit" className=" bg-[#155DDD] hover:bg-[#155DDD] active:bg-[#133069] rounded-xl font-bold text-sm text-[#EBEBEB] cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#155DDD] transition delay-50 duration-50 ease-in-out">Buscar</Button>
        </div>
      </div>

      {datas.length !== 0 && (
        <div className="border border-gray-400 rounded-xl px-3 mt-5 h-[calc(100vh-330px)] overflow-y-auto">

          <div className="py-3 block md:hidden space-y-3">
            {datas.map((e) => (
              <div key={e.id} className="border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-1.5">
                <div className="flex justify-between items-center border-b border-gray-200 pb-1.5 mb-1.5">
                  <span className="text-xs font-bold text-gray-500 uppercase">Aluno</span>
                  <span className="text-sm font-semibold text-gray-800">{e.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Série/Ano:</span>
                  <span className="font-medium">{e.grade}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Turma:</span>
                  <span className="font-medium">{e.class}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Faltas:</span>
                  <span className="font-bold px-2.5 py-0.5 rounded-full text-xs">
                    {e.foul} faltas
                  </span>
                </div>
              </div>
            ))}
          </div>

          <table className="hidden md:table table-auto w-full text-base text-left border-separate border-spacing-y-3">
            <thead className="text-base text-gray-700 uppercase sticky top-0 z-10">
              <tr>
                <th className="py-4 px-3 bg-white font-bold rounded-l-xl" scope="col">Série</th>
                <th className="py-4 px-3 bg-white font-bold" scope="col">Turma</th>
                <th className="py-4 px-3 bg-white font-bold" scope="col">Alunos</th>
                <th className="py-4 px-3 bg-white font-bold rounded-r-xl" scope="col">Faltas</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((e) => (
                <tr key={e.id}>
                  <td className=" py-4 px-3 border-b border-gray-200">{e.grade}</td>
                  <td className=" py-4 px-3 border-b border-gray-200">{e.class}</td>
                  <td className=" py-4 px-3 border-b border-gray-200">{e.name}</td>
                  <td className=" py-4 px-3 border-b border-gray-200">{e.foul}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}

    </div>
  )
}

export default Report;