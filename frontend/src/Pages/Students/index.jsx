import { useState } from "react";
import API from "../../Controller/Api";
import Button from "../../Components/Button";
import { formatDate } from "../../Utils/formatDate";
import { toast, Toaster } from "react-hot-toast";
import Modal from "../../Components/Modal";

function Students() {
    const [registration, setRegistration] = useState("");
    const [student, setStudent] = useState(null);

    const [filter, setFilter] = useState({
        startDate: "",
        endDate: "",
    });

    const [fouls, setFouls] = useState([]);

    const [loadingStudent, setLoadingStudent] = useState(false);
    const [loadingFouls, setLoadingFouls] = useState(false);
    const [saving, setSaving] = useState(false);

    // Controla se a consulta de faltas ja foi realizada.
    const [hasSearched, setHasSearched] = useState(false);

    // Falta selecionada para correcao.
    const [selectedFoul, setSelectedFoul] = useState(null);

    // Justificativa da falta.
    const [justification, setJustification] = useState("");


    async function findStudent() {

        if (!registration.trim()) {
            toast.error("Informe a matrícula.");
            return;
        }

        setLoadingStudent(true);

        try {
            const { data } = await API.get(`/students/${registration.trim()}`);

            const { data: classData } = await API.get(`/class/${data.classId}`);

            setStudent({
                ...data,
                nameClass: classData.name,
                gradeClass: classData.grade,
            });

            setFouls([]);

            setFilter({
                startDate: "",
                endDate: "",
            });

            setHasSearched(false);
            setSelectedFoul(null);
            setJustification("");

        } catch (error) {
            console.error("Erro ao buscar aluno:", error);

            setStudent(null);
            setFouls([]);
            setHasSearched(false);

            toast.error("Aluno não encontrado.");
        } finally {
            setLoadingStudent(false);
        }
    }

    async function findFouls() {
        if (!student) {
            toast.error("Busque um aluno primeiro.");
            return;
        }

        if (!filter.startDate || !filter.endDate) {
            toast.error("Informe a data inicial e a data final." );
            return;
        }

        if (filter.startDate > filter.endDate) {
            toast.error( "A data inicial não pode ser maior que a data final.");
            return;
        }

        setLoadingFouls(true);
        setHasSearched(true);

        try {
            const { data } = await API.get("/reports/foul-student",
                {
                    params: {
                        id: student.id,
                        startDate: filter.startDate,
                        endDate: filter.endDate,
                    },
                }
            );

            setFouls(data.foul || []);

        } catch (error) {
            console.error("Erro ao buscar faltas:",error);

            setFouls([]);
            toast.error("Não foi possível buscar as faltas do aluno.");
        } finally {
            setLoadingFouls(false);
        }
    }

    function openCorrection(foul) {

        setSelectedFoul(foul);
        setJustification(foul.justification || foul.excusedAbsence || "");
    }


    function closeCorrection() {

        if (saving) {
            return;
        }

        setSelectedFoul(null);
        setJustification("");
    }

    async function saveJustification() {

        if (!selectedFoul || !student) {
            return;
        }

        setSaving(true);

        try {

            const date = selectedFoul.date.toString().split("T")[0];

            const data = {
                classId: student.classId,
                date,
                attendance: [
                    {
                        studentId: student.id,
                        present: false,
                        justification: justification.trim() || null,
                    },
                ],
            };
            await API.post("/attendances/",data );

            setFouls((currentFouls) =>
                currentFouls.map((foul) =>
                    foul.id === selectedFoul.id
                        ? {
                              ...foul,
                              justification:
                                  justification.trim() ||
                                  null,

                              excusedAbsence:
                                  justification.trim() ||
                                  null,
                          }
                        : foul
                )
            );

            if (justification.trim()) {
                toast.success(
                    "Falta justificada com sucesso!",
                    {
                        id: "saveJustification",
                        duration: 2500,
                        style: {
                            borderRadius: "0.375rem",
                        },
                    }
                );
            } else {
                toast.success(
                    "Falta atualizada sem justificativa.",
                    {
                        id: "saveJustification",
                        duration: 2500,
                        style: {
                            borderRadius: "0.375rem",
                        },
                    }
                );
            }

            setSelectedFoul(null);
            setJustification("");

        } catch (error) {
            console.error(
                "Erro ao atualizar falta:",
                error
            );

            toast.error(
                "Não foi possível atualizar a falta."
            );
        } finally {
            setSaving(false);
        }
    }

    function handleFilterChange(field, value) {
        setFilter((currentFilter) => ({
            ...currentFilter,
            [field]: value,
        }));

        setHasSearched(false);
        setFouls([]);
    }

    return (
        <div className="max-w-5xl mx-auto p-6">

            <Toaster />

            <div className="mb-6">

                <h1 className="text-2xl font-bold"> Correção de Frequência </h1>
                <p className="text-gray-500 mt-1"> Consulte as faltas de um aluno e adicione ou altere suas justificativas. </p>

            </div>

            <div className="border border-gray-300 rounded-xl p-5">

                <h2 className="font-bold text-lg mb-4"> Buscar aluno </h2>

                <div className=" flex flex-col sm:flex-row gap-3 ">

                    <div className="flex flex-col gap-1 flex-1">

                        <label className="text-sm font-medium"> Matrícula </label>
                        <input type="text" value={registration} onChange={(e) => setRegistration( e.target.value )} onKeyDown={(e) => {if (e.key === "Enter") { findStudent();}}} placeholder="Digite a matrícula do aluno" className=" border   border-gray-400 rounded-xl p-2 outline-none  focus:border-blue-500"/>

                    </div>

                    <div className="flex items-end">

                        <Button onClick={findStudent} disabled={loadingStudent} className=" bg-[#155DDD]  hover:bg-[#155DDD] active:bg-[#133069] rounded-xl font-bold text-sm text-[#EBEBEB]  px-5 py-2 disabled:cursor-not-allowed  disabled:opacity-40  "> {loadingStudent ? "Buscando...": "Buscar aluno"} </Button>

                    </div>

                </div>

            </div>


            {student && (

                <div className=" border border-gray-300 rounded-xl p-5 mt-5 " >

                    <div className=" flex flex-col md:flex-row md:items-center md:justify-between gap-4 " >

                        <div>

                            <p  className=" text-xs  uppercase  text-gray-500 font-bold  "  > Aluno </p>
                            <h2 className="text-xl font-bold"> {student.name} </h2>
                            <p className="text-gray-500 mt-1">  Matrícula:{" "} {student.enrollment || student.registration || registration} </p>

                        </div>

                        <div className="flex gap-8">

                            <div>

                                <p className=" text-xs uppercase  text-gray-500 font-bold " > Série </p>
                                <p className="font-semibold"> {student.gradeClass} </p>

                            </div>

                            <div>

                                <p className="  text-xs  uppercase  text-gray-500  font-bold " >  Turma </p>
                                <p className="font-semibold"> {student.nameClass} </p>

                            </div>

                        </div>

                    </div>

                </div>

            )} 

            {student && (

                <div className=" border  border-gray-300 rounded-xl p-5 mt-5 " >

                    <h2 className="font-bold text-lg mb-4"> Período da consulta </h2>

                    <div className=" grid grid-cols-1 sm:grid-cols-3 gap-3 " >

                        <div className="flex flex-col gap-1">

                            <label className="text-sm font-medium"> Data inicial </label>
                            <input type="date" value={filter.startDate} onChange={(e) => handleFilterChange( "startDate", e.target.value ) } className=" border border-gray-400 rounded-xl p-2 " />

                        </div>

                        <div className="flex flex-col gap-1">

                            <label className="text-sm font-medium"> Data final </label>
                            <input  type="date" value={filter.endDate} onChange={(e) => handleFilterChange( "endDate", e.target.value ) } className=" border border-gray-400 rounded-xl p-2"/>

                        </div>

                        <div className="flex items-end">

                            <Button onClick={findFouls} disabled={loadingFouls} className=" bg-[#155DDD] hover:bg-[#155DDD] active:bg-[#133069] rounded-xl font-bold text-sm  text-[#EBEBEB] px-5 py-2 disabled:cursor-not-allowed disabled:opacity-40">{loadingFouls ? "Consultando..." : "Consultar faltas"}</Button>

                        </div>

                    </div>

                </div>

            )}

            {student && hasSearched && (

                <div className=" border  border-gray-300 rounded-xl mt-5 overflow-hidden ">
                    <div className=" p-5 border-b  border-gray-200 " >

                        <div className=" flex flex-col sm:flex-row sm:justify-between gap-3 " >

                            <div>

                                <h2 className="text-lg font-bold"> Faltas encontradas </h2>
                                <p className=" text-sm text-gray-500 mt-1 " > Período:{" "} {formatDate(  filter.startDate )} {" até "} {formatDate( filter.endDate )} </p>

                            </div>

                            <div lassName="  bg-gray-100 rounded-xl px-4 py-2 " >

                                <p className=" text-sm  text-gray-500 " > Total de faltas </p>
                                <p className="text-xl font-bold">  {fouls.length} </p>

                            </div>

                        </div>

                    </div>

                    {loadingFouls && (

                        <div className=" p-10 text-center  text-gray-500 " > Consultando faltas... </div>

                    )}

                    {!loadingFouls &&
                        fouls.length === 0 && (

                            <div className="p-10 text-center">

                                <p className=" font-semibold  text-gray-600 " > Nenhuma falta encontrada. </p>
                                <p className=" text-sm  text-gray-400 mt-1 " > O aluno não possui faltas no período informado. </p>

                            </div>

                        )}

                    {!loadingFouls &&
                        fouls.length > 0 && (

                            <div className="overflow-x-auto">

                                <table className="w-full text-sm">

                                    <thead>

                                        <tr className="  bg-gray-50 text-left " >

                                            <th className="px-5 py-4">  Data </th>
                                            <th className="px-5 py-4"> Situação </th>
                                            <th className="px-5 py-4"> Justificativa </th>
                                            <th className=" px-5  py-4 text-right " > Ação </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {fouls.map((foul) => {

                                            const foulJustification = foul.justification || foul.excusedAbsence;

                                            return (

                                                <tr key={foul.id} className=" border-t border-gray-200 " >

                                                    <td className=" px-5 py-4 font-medium " > {formatDate( foul.date )}  </td>
                                                    <td className="px-5 py-4">
                                                        <p className=" inline-flex px-3 py-1 rounded-full text-xs font-bold" > Falta </p>
                                                    </td>
                                                    <td className=" px-5 py-4 max-w-xs "  >

                                                        {foulJustification ? (

                                                            <p className="  text-gray-700 " > { foulJustification } </p>

                                                        ) : (

                                                            <p className="  text-gray-400 italic " >  Sem justificativa </p>

                                                        )}
                                                    </td>

                                                    <td className=" px-5 py-4 text-right " >

                                                        <Button onClick={() => openCorrection( foul ) } className=" bg-[#155DDD] hover:bg-[#155DDD]  active:bg-[#133069] rounded-xl font-bold text-sm  text-white px-4 py-2 " > Corrigir </Button>

                                                    </td>

                                                </tr>

                                            );
                                        })}

                                    </tbody>

                                </table>

                            </div>

                        )}

                </div>

            )}


            {selectedFoul && (

                <Modal open={!!selectedFoul} setOpen={(open) => { if (!open) { closeCorrection(); }}} className="w-full max-w-md" >

                    <div className="p-2">

                        <div className="mb-5">

                            <h2 className="text-xl font-bold">  Justificar falta </h2>
                            <p className=" text-sm text-gray-500 mt-1 " > Adicione, altere ou remova a justificativa da falta. </p>

                        </div>

                        <div className="  bg-gray-50 rounded-xl p-4 space-y-3 mb-5 " >

                            <div className=" flex justify-between gap-4 " >
                                
                                <p className="text-gray-500"> Aluno </p>
                                <p className=" font-semibold text-right " > {student.name} </p>

                            </div>

                            <div className=" flex justify-between gap-4 " >

                                <p className="text-gray-500"> Data </p>
                                <p className="font-semibold"> {formatDate( selectedFoul.date )} </p>

                            </div>

                            <div className=" flex justify-between gap-4 " >

                                <p className="text-gray-500"> Situação  </p>
                                <p className=" font-bold  text-red-600 " > Falta </p>

                            </div>

                        </div>

                        <div className="mb-5">

                            <label className=" block text-sm font-semibold mb-2 " > Justificativa </label>
                            <textarea rows={4} value={justification} onChange={(e) => setJustification( e.target.value ) } placeholder="Digite a justificativa..." disabled={saving} className=" w-full border border-gray-300 rounded-xl p-3 resize-none outline-none  focus:border-blue-500  disabled:bg-gray-100 "/>
                            <p className=" text-xs  text-gray-400 mt-1 " > Deixe o campo vazio para manter a falta sem justificativa. </p>

                        </div>

                        <div className="flex gap-3">

                            <button onClick={closeCorrection} disabled={saving} className=" flex-1 border  border-gray-300 rounded-xl py-2 font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40 " > Cancelar </button>
                            <Button onClick={saveJustification} disabled={saving} className=" flex-1 bg-[#155DDD]  hover:bg-blue-700 active:bg-[#133069] rounded-xl font-bold  text-white py-2 disabled:opacity-40 " > {saving ? "Salvando..." : "Salvar"} </Button>

                        </div>

                    </div>

                </Modal>

            )}

        </div>
    );
}

export default Students;