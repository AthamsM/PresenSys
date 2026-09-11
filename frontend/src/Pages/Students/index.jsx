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

    // Controla se a consulta de faltas já foi realizada
    const [hasSearched, setHasSearched] = useState(false);

    // Falta selecionada para correção
    const [selectedFoul, setSelectedFoul] = useState(null);

    // Estados da justificativa
    const [justification, setJustification] = useState("");
    const [justificationType, setJustificationType] = useState(""); // "Atestado" | "Autorização" | ""

    async function findStudent() {
        if (!registration.trim()) {
            toast.error(<b>Informe a matrícula</b>);
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
            setFilter({ startDate: "", endDate: "" });
            setHasSearched(false);
            setSelectedFoul(null);
            setJustification("");
            setJustificationType("");
        } catch (error) {
            console.error("Erro ao buscar aluno:", error);
            setStudent(null);
            setFouls([]);
            setHasSearched(false);
            toast.error(<b>Aluno não encontrado.</b>);
        } finally {
            setLoadingStudent(false);
        }
    }

    async function findFouls() {
        if (!student) {
            toast.error(<b>Busque um aluno primeiro.</b>);
            return;
        }

        if (!filter.startDate || !filter.endDate) {
            toast.error(<b>Informe a data inicial e a data final.</b>);
            return;
        }

        if (filter.startDate > filter.endDate) {
            toast.error(<b>A data inicial não pode ser maior que a data final.</b>);
            return;
        }

        setLoadingFouls(true);
        setHasSearched(true);

        try {
            const { data } = await API.get("/reports/foul-student", {
                params: {
                    id: student.id,
                    startDate: filter.startDate,
                    endDate: filter.endDate,
                },
            });

            setFouls(data.foul || []);
        } catch (error) {
            console.error("Erro ao buscar faltas:", error);
            setFouls([]);
            toast.error(<b>Não foi possível buscar as faltas do aluno.</b>);
        } finally {
            setLoadingFouls(false);
        }
    }

    function openCorrection(foul) {
        setSelectedFoul(foul);
        const raw = foul.justification || foul.excusedAbsence || "";

        // Se já foi cadastrado no formato "Tipo - Motivo", separa para os inputs
        if (raw.startsWith("Atestado - ")) {
            setJustificationType("Atestado");
            setJustification(raw.replace("Atestado - ", ""));
        } else if (raw.startsWith("Autorização - ")) {
            setJustificationType("Autorização");
            setJustification(raw.replace("Autorização - ", ""));
        } else {
            setJustificationType("");
            setJustification(raw);
        }
    }

    function closeCorrection() {
        if (saving) return;
        setSelectedFoul(null);
        setJustification("");
        setJustificationType("");
    }

    async function saveJustification() {
        if (!selectedFoul || !student) return;

        const text = justification.trim();

        // Validação de segurança: se escreveu texto, precisa ter tipo
        if (text && !justificationType) {
            toast.error(<b>Selecione se é Atestado ou Autorização!</b>);
            return;
        }

        // Formata o payload: se tiver texto adiciona o tipo, senão null
        const finalJustification = text ? `${justificationType} - ${text}` : null;

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
                        justification: finalJustification,
                    },
                ],
            };

            await API.post("/attendances/", data);

            setFouls((currentFouls) =>
                currentFouls.map((foul) =>
                    foul.id === selectedFoul.id
                        ? {
                            ...foul,
                            justification: finalJustification,
                            excusedAbsence: finalJustification,
                        }
                        : foul
                )
            );

            if (finalJustification) {
                toast.success(<b>Falta justificada com sucesso!</b>, {
                    id: "saveJustification",
                    duration: 2500,
                    style: { borderRadius: "0.375rem" },
                });
            } else {
                toast.success(<b>Falta atualizada sem justificativa.</b>, {
                    id: "saveJustification",
                    duration: 2500,
                    style: { borderRadius: "0.375rem" },
                });
            }

            closeCorrection();
        } catch (error) {
            console.error("Erro ao atualizar falta:", error);
            toast.error(<b>Não foi possível atualizar a falta.</b>);
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
        <div className="h-full pr-2 overflow-y-auto scrollbar-thumb-[#155DDD]/80 scrollbar-track-[#99A1AF]/10 scrollbar-thin">
            <Toaster />

            <div className="mb-6">
                <h1 className="text-2xl font-bold">Correção de Frequência</h1>
                <p className="text-gray-500 mt-1">
                    Consulte as faltas de um aluno e adicione ou altere suas justificativas.
                </p>
            </div>

            <div className=" bg-[#FFFFFC] border border-gray-200 shadow-sm shadow-gray-300  rounded-lg p-5">
                <h2 className="font-bold text-lg mb-4">Buscar aluno</h2>
                <div className="flex flex-row gap-3 ">
                    <div className="flex flex-col gap-1 flex-1 ">
                        <label className="text-sm ">Matrícula</label>
                        <input
                            type="text"
                            value={registration}
                            onChange={(e) => setRegistration(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") findStudent();
                            }}
                            placeholder="Digite a matrícula do aluno"
                            className="border border-gray-200 shadow-sm shadow-gray-300  rounded-lg p-2 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex items-end">
                        <Button onClick={findStudent} disabled={loadingStudent} className="bg-[#155DDD] hover:bg-[#155DDD] border border-[#155DDD] active:bg-[#133069] rounded-lg font-bold text-[#EBEBEB] px-5 py-2 disabled:cursor-not-allowed disabled:opacity-40"> {loadingStudent ? "Busc..." : "Buscar"} </Button>
                    </div>
                </div>
            </div>

            {student && (
                <div className="bg-[#FFFFFC] border border-gray-200 shadow-sm shadow-gray-300  rounded-lg  p-5 mt-5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase text-gray-500 font-bold">Aluno</p>
                            <h2 className="text-xl font-bold">{student.name}</h2>
                            <p className="text-gray-500 mt-1">
                                Matrícula: {student.enrollment || student.registration || registration}
                            </p>
                        </div>

                        <div className="flex gap-8">
                            <div>
                                <p className="text-xs uppercase text-gray-500 font-bold text-center">Série</p>
                                <p className="font-semibold text-center">{student.gradeClass}</p>
                            </div>

                            <div>
                                <p className="text-xs uppercase text-gray-500 font-bold">Turma</p>
                                <p className="font-semibold text-center">{student.nameClass}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {student && (
                <div className="bg-[#FFFFFC] border border-gray-200 shadow-sm shadow-gray-300  rounded-lg  p-3 mt-5">
                    <h2 className="font-bold text-lg mb-4">Período da consulta</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                        <div className="flex gap-2">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Data inicial</label>
                                <input
                                    type="date"
                                    value={filter.startDate}
                                    onChange={(e) => handleFilterChange("startDate", e.target.value)}
                                    className="border border-gray-200 shadow-sm shadow-gray-300  rounded-lg  p-2"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Data final</label>
                                <input
                                    type="date"
                                    value={filter.endDate}
                                    onChange={(e) => handleFilterChange("endDate", e.target.value)}
                                    className="border border-gray-200 shadow-sm shadow-gray-300  rounded-lg  p-2"
                                />
                            </div>
                        </div>

                        <div className="flex items-end justify-end">
                            <Button
                                onClick={findFouls}
                                disabled={loadingFouls}
                                className="bg-[#155DDD] border-[#155DDD]hover:bg-[#155DDD] active:bg-[#133069] rounded-lg font-bold text-[#EBEBEB] px-5 py-2 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                {loadingFouls ? "..." : "Consultar"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {student && hasSearched && (
                <div className="border border-gray-200 shadow-sm shadow-gray-300 rounded-lg overflow-hidden bg-white mt-5 scrollbar-thumb-[#155DDD]/80 scrollbar-track-[#99A1AF]/10 scrollbar-thin">
                    <div className="p-5 border-b border-gray-200">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                                    Faltas encontradas
                                </h2>
                                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                    Período: {formatDate(filter.startDate)} até {formatDate(filter.endDate)}
                                </p>
                            </div>

                            <div className="flex items-center justify-between gap-2 bg-gray-100 rounded-lg px-4 py-2.5 w-full sm:w-auto">
                                <p className="text-xs sm:text-sm text-gray-500">Total de faltas: </p>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    {fouls.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    {loadingFouls && (
                        <div className="p-10 text-center text-gray-500">
                            Consultando faltas...
                        </div>
                    )}

                    {!loadingFouls && fouls.length === 0 && (
                        <div className="p-10 text-center">
                            <p className="font-semibold text-gray-600">Nenhuma falta encontrada.</p>
                            <p className="text-sm text-gray-400 mt-1">
                                O aluno não possui faltas no período informado.
                            </p>
                        </div>
                    )}

                    {!loadingFouls && fouls.length > 0 && (
                        <>
                            <div className="p-4 block md:hidden space-y-3">
                                {fouls.map((foul, indx) => {
                                    const foulJustification = foul.justification || foul.excusedAbsence;

                                    return (
                                        <div
                                            key={indx}
                                            className="border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col gap-2.5 bg-white"
                                        >
                                            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                                <span className="text-xs font-bold text-gray-500 uppercase">Data</span>
                                                <span className="text-sm font-semibold text-gray-800">
                                                    {formatDate(foul.date)}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500">Situação:</span>
                                                <span className="inline-flex px-2.5 py-0.5 text-xs font-bold">
                                                    Falta
                                                </span>
                                            </div>

                                            <div className="flex flex-col gap-1 text-sm">
                                                <span className="text-gray-500">Justificativa:</span>
                                                {foulJustification ? (
                                                    <span className="text-gray-700 break-words">{foulJustification}</span>
                                                ) : (
                                                    <span className="text-gray-400 italic">Sem justificativa</span>
                                                )}
                                            </div>

                                            <div className="mt-2 pt-2 border-t border-gray-100">
                                                <Button
                                                    onClick={() => openCorrection(foul)}
                                                    className="w-full bg-[#155DDD] hover:bg-[#5b90ec] active:bg-[#133069] rounded-lg font-bold text-sm text-white py-2"
                                                >
                                                    Corrigir
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50 text-left">
                                            <th className="px-5 py-4">Data</th>
                                            <th className="px-5 py-4">Situação</th>
                                            <th className="px-5 py-4">Justificativa</th>
                                            <th className="px-5 py-4 text-center">Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fouls.map((foul, indx) => {
                                            const foulJustification = foul.justification || foul.excusedAbsence;

                                            return (
                                                <tr key={indx} className="border-t border-gray-200">
                                                    <td className="px-5 py-4 font-medium">
                                                        {formatDate(foul.date)}
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <span className="inline-flex px-2.5 py-0.5 text-xs font-bold">
                                                            Falta
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-4 max-w-xs break-words">
                                                        {foulJustification ? (
                                                            <p className="text-gray-700">{foulJustification}</p>
                                                        ) : (
                                                            <p className="text-gray-400 italic">Sem justificativa</p>
                                                        )}
                                                    </td>
                                                    <td className="px-5 py-4 text-center">
                                                        <Button
                                                            onClick={() => openCorrection(foul)}
                                                            className="bg-[#155DDD] hover:bg-[#5b90ec] active:bg-[#133069] rounded-lg font-bold text-sm text-white px-4 py-2 transition duration-150"
                                                        >
                                                            Corrigir
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            )}

            {selectedFoul && (
                <Modal
                    open={!!selectedFoul}
                    setOpen={(open) => {
                        if (!open) closeCorrection();
                    }}
                    className="w-[92vw] max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-2xl"
                >
                    <div className="flex flex-col">

                        <div className="mb-4 sm:mb-5">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                Justificar falta
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                Adicione, altere ou remova a justificativa da falta.
                            </p>
                        </div>

                        <div className="bg-gray-50 border border-gray-100 rounded-lg p-3.5 sm:p-4 space-y-2.5 sm:space-y-3 mb-4 sm:mb-5 text-xs sm:text-sm">
                            <div className="flex justify-between items-center gap-3">
                                <span className="text-gray-500 shrink-0">Aluno</span>
                                <span className="font-semibold text-gray-800 text-right truncate">
                                    {student.name}
                                </span>
                            </div>

                            <div className="flex justify-between items-center gap-3">
                                <span className="text-gray-500 shrink-0">Data</span>
                                <span className="font-semibold text-gray-800">
                                    {formatDate(selectedFoul.date)}
                                </span>
                            </div>

                            <div className="flex justify-between items-center gap-3">
                                <span className="text-gray-500">Situação</span>
                                <span className="inline-flex px-2.5 py-0.5 text-xs font-bold ">
                                    Falta
                                </span>
                            </div>
                        </div>

                        <div className="mb-4 sm:mb-5">
                            <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5 sm:mb-2">
                                Justificativa
                            </label>

                            <textarea
                                rows={3}
                                value={justification}
                                onChange={(e) => {
                                    setJustification(e.target.value);
                                    if (!e.target.value.trim()) {
                                        setJustificationType("");
                                    }
                                }}
                                placeholder="Digite o motivo (ex: consulta médica, dor de cabeça...)"
                                disabled={saving}
                                className="w-full border border-gray-300 rounded-lg p-3 resize-none outline-none focus:border-[#155DDD] focus:ring-1 focus:ring-[#155DDD] disabled:bg-gray-100 text-xs sm:text-sm"
                            />

                            <div className="mt-3">
                                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                    Tipo de Comprovante:
                                </label>

                                <div className="grid grid-cols-2 gap-2">
                                    <label
                                        className={`flex items-center justify-center gap-2 p-2 sm:p-2.5 rounded-lg border text-xs sm:text-sm font-medium transition cursor-pointer select-none ${!justification.trim()
                                            ? "opacity-40 bg-gray-100 border-gray-200 cursor-not-allowed text-gray-400"
                                            : justificationType === "Atestado"
                                                ? "border-[#155DDD] bg-blue-50 text-[#155DDD] font-bold"
                                                : "border-gray-200 hover:bg-gray-50 text-gray-700"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="justificationType"
                                            value="Atestado"
                                            checked={justificationType === "Atestado"}
                                            onChange={(e) => setJustificationType(e.target.value)}
                                            disabled={!justification.trim() || saving}
                                            className="hidden"
                                        />
                                        <span>Atestado</span>
                                    </label>

                                    <label
                                        className={`flex items-center justify-center gap-2 p-2 sm:p-2.5 rounded-lg border text-xs sm:text-sm font-medium transition cursor-pointer select-none ${!justification.trim()
                                            ? "opacity-40 bg-gray-100 border-gray-200 cursor-not-allowed text-gray-400"
                                            : justificationType === "Autorização"
                                                ? "border-[#155DDD] bg-blue-50 text-[#155DDD] font-bold"
                                                : "border-gray-200 hover:bg-gray-50 text-gray-700"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="justificationType"
                                            value="Autorização"
                                            checked={justificationType === "Autorização"}
                                            onChange={(e) => setJustificationType(e.target.value)}
                                            disabled={!justification.trim() || saving}
                                            className="hidden"
                                        />
                                        <span>Autorização</span>
                                    </label>
                                </div>

                                <p className="text-[11px] sm:text-xs text-gray-400 mt-1.5 leading-relaxed">
                                    {!justification.trim()
                                        ? "Digite um motivo acima para liberar a escolha do tipo."
                                        : !justificationType
                                            ? "Selecione o tipo para concluir a justificativa."
                                            : `Será salvo como: "${justificationType} - ${justification.trim()}"`}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2 sm:gap-3">
                            <button
                                onClick={closeCorrection}
                                disabled={saving}
                                className="flex-1 border border-gray-300 rounded-lg py-2 sm:py-2.5 font-semibold text-xs sm:text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition"
                            >
                                Cancelar
                            </button>
                            <Button
                                onClick={saveJustification}
                                disabled={
                                    saving || (justification.trim().length > 0 && !justificationType)
                                }
                                className="flex-1 bg-[#155DDD] hover:bg-[#5b90ec] active:bg-[#133069] rounded-lg font-bold text-xs sm:text-sm text-white py-2 sm:py-2.5 disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                {saving ? "Salvando..." : "Salvar"}
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Students;