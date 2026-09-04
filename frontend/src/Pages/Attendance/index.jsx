import { useEffect, useState } from "react";
import { AttendanceHeader } from "../../Components/Attendance/AttendanceHeader";
import { AttendanceStats } from "../../Components/Attendance/AttendanceStats";
import { AttendanceSearch } from "../../Components/Attendance/AttendanceSearch";
import { AttendanceActions } from "../../Components/Attendance/AttendanceActions";
import { StudentCard } from "../../Components/Attendance/StudentCard";
import { useSearchParams } from "react-router-dom";
import API from "../../Controller/Api";
import { toast, Toaster } from "react-hot-toast";
import Modal from "../../Components/Modal";


export default function AttendancePage() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [nameClass, setNameClass] = useState(""); // pegar nome da classe para passar na chamada

    //o ID da turma tá vindo pela url
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id"); //o valor que vai buscar no banco da turma
 
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [justification, setJustification] = useState("");
    const [justificationType, setJustificationType] = useState("");

    useEffect(() => {
        if (id) {
            loadStudents(id);
        }
    }, [id]);

    async function loadStudents(classId) {
        try {

            const response = await API.get(`/class/${classId}`);
            const today = new Date();
            const date =
                `${today.getFullYear()}-` +
                `${String(today.getMonth() + 1).padStart(2, "0")}-` +
                `${String(today.getDate()).padStart(2, "0")}`;
            const attendanceResponse = await API.get(`/attendances/class/${classId}/${date}`);
            const attendances = attendanceResponse.data.attendance || [];
            const students = response.data.students.map(student => {
                const attendance = attendances.find(item => item.studentId === student.id);
                return {
                    id: student.id,
                    name: student.name,
                    present: attendance
                        ? attendance.present
                        : false,
                    justification:
                        attendance?.excusedAbsence || null,
                };

            });
            
            setStudents(students);
            setNameClass(response.data.grade + " " + response.data.name);

        } catch (error) {
            console.error("Erro ao carregar alunos.", error);
        }
    }

    async function saveAttendance() {
        try {
            const today = new Date();
            const date =
                `${today.getFullYear()}-` +
                `${String(today.getMonth() + 1).padStart(2, "0")}-` +
                `${String(today.getDate()).padStart(2, "0")}`;

            const checkResponse = await API.get(`/attendances/check/${id}/${date}`);   
            const data = { 
                classId: id, 
                date, 
                attendance: students.map((student) => ({ 
                    studentId: student.id, 
                    present: student.present, 
                    justification: student.justification,
                })), 
            };


            await API.post("/attendances/", data);
            
            if (checkResponse.data.alreadyTaken) {
                toast.success(<b>Chamada já realizada hoje. Os dados foram atualizados com sucesso.</b>, { id: "saveAttendance", duration: 2500, style: { borderRadius: "0.375rem" }});
            } else {
                toast.success(<b>Frequência salva com sucesso!</b>, { id: "saveAttendance", duration: 2500, style: { borderRadius: "0.375rem" }});
            }   

        } catch (error) { 
            console.error("Erro ao salvar frequência:", error); 
            toast.error("Erro ao salvar a chamada.");
            }
        }
        
    function toggleAttendance(id) {
        setStudents(current =>
            current.map(student => 
                student.id === id

                ? {
                    ...student,
                    present:!student.present,
                    ...(student.present
                        ? {}
                        : {justification: null})
                }
                : student
                    
            )
        );
    }
    
    function openJustificationModal(student) {
        setSelectedStudent(student);
        const current = student.justification || "";

        if (current.startsWith("Atestado - ")) {
            setJustificationType("Atestado");
            setJustification(current.replace("Atestado - ", ""));
        } else if (current.startsWith("Autorização - ")) {
            setJustificationType("Autorização");
            setJustification(current.replace("Autorização - ", ""));
        } else {
            setJustificationType("");
            setJustification(current);
        }

        setShowModal(true);
    }
    
    function confirmAbsence() {
        if (!selectedStudent) return;

        const text = justification.trim();

        if (text && !justificationType) {
            toast.error("Selecione se é Atestado ou Autorização!");
            return;
        }

        const finalJustification = text ? `${justificationType} - ${text}` : null;

        setStudents(current =>
            current.map(student =>
                student.id === selectedStudent.id
                    ? {
                        ...student,
                        justification: finalJustification
                    }
                    : student
            )
        );

        closeModal();
    }
    
    function closeModal() {
        setShowModal(false);
        setSelectedStudent(null);
        setJustification("");
        setJustificationType("");
    }

    function markAllPresent() {
        setStudents((currentStateStudents) =>
            currentStateStudents.map((student) => ({
                ...student,
                present: true,
            }))
        );
    }

    const filterStudents = students.filter((student) =>
        student.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const totalStudents = students.length;

    const totalPresent = students.filter(
        (student) => student.present
    ).length;

    const calculateAttendance =
        totalStudents === 0
            ? 0
            : Math.round(
                (totalPresent / totalStudents) * 100
            );

    return (
    <div className="max-w-3xl mx-auto p-6">

        <AttendanceHeader nameClass={nameClass}/>

        <AttendanceStats
            totalStudents={totalStudents}
            totalPresent={totalPresent}
            calculateAttendance={calculateAttendance}
        />

        <AttendanceSearch
            value={search}
            onChange={setSearch}
        />

        <AttendanceActions
            onMarkAll={markAllPresent}
        />

        <div className="mt-6 rounded-xl border bg-white h-110 sm:h-80 overflow-y-auto">

            {filterStudents.map(
                (student, index) => (
                    <StudentCard
                        key={student.id}
                        student={student}
                        index={index}
                        onToggle={toggleAttendance}
                        onJustify={openJustificationModal}
                    />
                )
            )}

        </div>

        <button
            onClick={saveAttendance}
            className="mt-4 w-full rounded-xl bg-green-300 py-4 font-medium hover:bg-green-400"
        >
            Salvar chamada
        </button>

        
        <Toaster />

        <Modal
            open={showModal}
            setOpen={(open) => {
                if (!open) closeModal();
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

                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 sm:p-4 mb-4 sm:mb-5 text-xs sm:text-sm">
                    <div className="flex justify-between items-center gap-3">
                        <span className="text-gray-500 shrink-0">Aluno</span>
                        <span className="font-semibold text-gray-800 text-right truncate">
                            {selectedStudent?.name}
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
                        className="w-full border border-gray-300 rounded-xl p-3 resize-none outline-none focus:border-[#155DDD] text-xs sm:text-sm"
                    />

                    <div className="mt-3">
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                            Tipo de Comprovante:
                        </label>

                        <div className="grid grid-cols-2 gap-2">
                            <label
                                className={`flex items-center justify-center gap-2 p-2 sm:p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition cursor-pointer select-none ${
                                    !justification.trim()
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
                                    disabled={!justification.trim()}
                                    className="hidden"
                                />
                                <span>Atestado</span>
                            </label>

                            <label
                                className={`flex items-center justify-center gap-2 p-2 sm:p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition cursor-pointer select-none ${
                                    !justification.trim()
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
                                    disabled={!justification.trim()}
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
                        onClick={closeModal}
                        className="flex-1 border border-gray-300 rounded-xl py-2 sm:py-2.5 font-semibold text-xs sm:text-sm text-gray-600 hover:bg-gray-50 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={confirmAbsence}
                        disabled={justification.trim().length > 0 && !justificationType}
                        className="flex-1 bg-[#155DDD] hover:bg-[#5b90ec] active:bg-[#133069] rounded-xl font-bold text-xs sm:text-sm text-white py-2 sm:py-2.5 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </Modal>

    </div>
    );
}