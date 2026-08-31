import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Controller/Api";
import Button from "../../Components/Button";
import Modal from "../../Components/Modal";
import { formatDate } from "../../Utils/formatDate"
import { reportsCSV } from "../../Utils/reportsCSV";
import { toast, Toaster } from "react-hot-toast";

function Report() {

  const [filter, setFilter] = useState({
    grade: "",
    class: "",
    startDate: "",
    endDate: ""
  });

  const [datas, setDatas] = useState([]);
  const [studentsFouls, setStudentsFouls] = useState([]); // Para modal de todas as faltas do aluno
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState([]);

  const navigate = useNavigate();

  async function findReports() {
    let rota = "/reports/foul-all";
    if (!filter.startDate || !filter.endDate) {
      toast.error(<b>Preencha o intervalo de data!!</b>, { id: "filterError", duration: 2500, style: { borderRadius: "0.375rem" } });
      return;
    }
    if (filter.startDate > filter.endDate) {
      toast.error(<b>A data inicial não pode ser maior que a final!!</b>, { id: "filterError", duration: 2500, style: { borderRadius: "0.375rem" } });
      return;
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
      console.log(data);
      setDatas(data.data);
      setStudentsFouls(data.foulsStudent);
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

  function closeModal(open) {

    setOpenModal(open);

  }

  function setStudent(id) {

    setSelectedStudent(studentsFouls.find(studentsFouls => studentsFouls.id == id));

  }

  useEffect(() => {
    findClass();
  }, []);

  const [file, setFile] = useState("pdf");

  async function generateReportsCSV() {

    reportsCSV(datas, `relatorio_${filter.startDate}_${filter.endDate}.csv`);
  }

  return (
    <div>

      <h1 className="text-2xl font-bold">Relatórios</h1>
      <div className="flex justify-between items-center">
        <p className="sm:text-base text-xs">Acompanhe faltas por meio de filtros</p>

        <div className="flex items-end px-2">
          <Button disabled={datas.length === 0} onClick={generateReportsCSV} type="submit" className=" bg-[#155DDD] hover:bg-[#5b90ec] active:bg-[#133069] rounded-xl font-bold text-xs sm:text-sm text-[#EBEBEB] cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#155DDD] transition delay-50 duration-50 ease-in-out">Gerar CSV</Button>
        </div>
      </div>

      <div className=" bg-[#FFFFFC] border border-gray-200 shadow-sm shadow-gray-300  rounded-xl mt-5 p-5 w-full grid grid-cols-2 justify-start lg:grid-cols-5 gap-3">
        <div className="flex flex-col gap-1">
          <h3>Ano</h3>
          <select name="ano" id="ano" className="border border-gray-200 shadow-sm shadow-gray-300  rounded-xl p-1 text-xs sm:text-base" onChange={(e) => setFilter({ ...filter, grade: e.target.value })}>
            <option value="">Todos</option>
            {classGrade.map((gradeClass, index) => (
              <option key={index} value={gradeClass}>
                {gradeClass}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <h3>Turma</h3>
          <select name="turma" id="turma" className="border border-gray-200 shadow-sm shadow-gray-300  rounded-xl p-1 text-xs sm:text-sm" onChange={(e) => setFilter({ ...filter, class: e.target.value })}>
            <option value="">Todos</option>
            {className.map((nameClass, index) => (
              <option key={index} value={nameClass}>
                {nameClass}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <h3>Data inicial</h3>
          <input type="date" name="inicial" id="inicial" className="border border-gray-200 shadow-sm shadow-gray-300  rounded-xl p-1 text-xs sm:text-sm" onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}>
          </input>
        </div>
        <div className="flex flex-col gap-1">
          <h3>Data final</h3>
          <input type="date" name="final" id="final" className="border border-gray-200 shadow-sm shadow-gray-300  rounded-xl p-1 text-xs sm:text-sm" onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}>
          </input>
        </div>
        <div className="flex items-end justify-end lg:justify-start col-span-2 lg:col-span-1">
          <Button onClick={findReports} disabled={loading} type="submit" className="p-[0.40rem] bg-[#155DDD] hover:bg-[#5b90ec] active:bg-[#133069] rounded-xl font-bold text-sm text-[#EBEBEB] cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#155DDD] transition delay-50 duration-50 ease-in-out">Buscar</Button>
        </div>
      </div>

      {datas.length !== 0 && (
        <div className="bg-[#FFFFFC] border border-gray-200 shadow-sm shadow-gray-300  rounded-xl px-3 mt-5 h-[calc(100vh-330px)] overflow-y-auto">

          <div className="py-3 block md:hidden space-y-3">
            {datas.map((e) => (
              <div key={e.id} className="border border-gray-200  rounded-xl p-4 shadow-sm flex flex-col gap-1.5">
                <div className="flex justify-between items-center border-b border-gray-300 pb-1.5 mb-1.5">
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
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Faltas justificadas:</span>
                  <span className="font-bold px-2.5 py-0.5 rounded-full text-xs">
                    {e.excusedAbsence} faltas justificadas
                  </span>
                </div>

                <div className="mt-[0.5rem]">
                  <Button disabled={e.foul == 0} onClick={() => { setStudent(e.id); setOpenModal(true); }} className="w-full bg-[#155DDD] hover:bg-[#5b90ec] active:bg-[#133069] rounded-xl font-bold text-sm text-[#EBEBEB] cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#155DDD] transition delay-50 duration-50 ease-in-out">Detalhes</Button>
                </div>
              </div>
            ))}
          </div>

          <table className="bg-[#FFFFFC]  hidden md:table table-auto w-full text-base text-center border-separate border-spacing-y-3">
            <thead className="text-base text-gray-700 uppercase sticky top-0 z-10">
              <tr>
                <th className="py-4 px-3 bg-white font-bold" scope="col">Série</th>
                <th className="py-4 px-3 bg-white font-bold" scope="col">Turma</th>
                <th className="py-4 px-3 bg-white font-bold" scope="col">Alunos</th>
                <th className="py-4 px-3 bg-white font-bold" scope="col">Faltas</th>
                <th className="py-4 px-3 bg-white font-bold" scope="col">Faltas justificadas</th>
                <th className="py-4 px-3 bg-white font-bold" scope="col">Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((e) => (
                <tr key={e.id}>
                  <td className="py-4 px-3 border-b border-gray-200">{e.grade}</td>
                  <td className="py-4 px-3 border-b border-gray-200">{e.class}</td>
                  <td className="py-4 px-3 border-b border-gray-200">{e.name}</td>
                  <td className="py-4 px-3 border-b border-gray-200">{e.foul}</td>
                  <td className="py-4 px-3 border-b border-gray-200">{e.excusedAbsence}</td>
                  <td className="py-4 px-3 border-b border-gray-200">
                    <Button disabled={e.foul == 0} onClick={() => { setStudent(e.id); setOpenModal(true); }} className=" bg-[#155DDD] hover:bg-[#5b90ec] active:bg-[#133069] rounded-xl font-bold text-sm text-[#EBEBEB] cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 transition delay-50 duration-50 ease-in-out">Detalhes</Button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          <Modal open={openModal} setOpen={closeModal} className="bg-[#F9FBFC] animate-scale-in-center border border-gray-200 shadow-sm shadow-gray-300 rounded-xl">

            <div className="min-w-[75vw] max-h-[82.5vw] lg:max-h-[33vw] lg:min-w-[30vw] flex flex-col gap-y-[0.5rem]">

              <div className="flex justify-between items-center">

                <img src="icons/report.svg" alt="report-icon" className="w-[1.9rem]" />

                <h1 className="font-bold text-[1.2rem] sm:text-[1.5rem]">Relatório de Faltas</h1>

                <Button onClick={() => (setOpenModal(false))} className="py-[0.2rem] px-[0.4rem] bg-[#C10007] hover:bg-[#DB0008] active:bg-[#C10007] rounded-xl cursor-pointer transition delay-25 duration-25 ease-in-out">
                  <img src="icons/x.svg" alt="x" className="w-[1.5rem]" />
                </Button>

              </div>

              <div className="p-[0.5rem] flex flex-col items-start border-t-2 border-[#99A1Af]">

                <h1>Nome: {selectedStudent?.name}</h1>
                <h1>Turma: {selectedStudent?.grade} {selectedStudent?.class}</h1>
                <h1>Número da matrícula: {selectedStudent?.registration}</h1>

              </div>

              <h1 className="flex justify-center border-y-2 border-[#99A1Af] text-[#263238] font-bold ">Dias faltados</h1>

              <div className="overflow-auto">
                <table className="w-full text-center table-auto [counter-reset:linha] border-collapse border-[0.063rem] border-[#99A1Af]">

                  <thead>

                    <tr className="border-b-[0.063rem] border-[#99A1Af] text-[#263238]">

                      <th>N°</th>
                      <th>Data</th>
                      <th>Justificativa</th>
                    </tr>

                  </thead>

                  {selectedStudent?.foul?.map((foul) => (

                    <tbody key={foul.date}>

                      <tr className="[counter-increment:linha] border-b-[0.063rem] border-[#99A1Af]">

                        <td className="before:content-[counter(linha)]"></td>
                        <td>{formatDate(foul.date).split(",")[0]}</td>
                        <td>{foul.justification || "Não Justificada"}</td>
                      </tr>

                    </tbody>

                  ))}

                </table>
              </div>

            </div>

          </Modal>


        </div>
      )}

      <div><Toaster /></div>
    </div>
  )
}

export default Report;