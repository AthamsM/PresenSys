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
import Button from "../../Components/Button";


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
    const [markAll, setMarkAll] = useState(false);

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
                toast.success(<b>Frequência atualizada com sucesso!</b>, { id: "saveAttendance", duration: 2500, style: { borderRadius: "0.375rem" }});
            } else {
                toast.success(<b>Frequência salva com sucesso!</b>, { id: "saveAttendance", duration: 2500, style: { borderRadius: "0.375rem" }});
            }   

        } catch (error) { 
            console.error("Erro ao salvar a frequência:", error); 
            toast.error(<b>Erro ao salvar a frequência!</b>);
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
                present: !markAll,
            }))
        );

        setMarkAll(!markAll);

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

        <div className="h-full flex flex-col justify-stretch gap-y-3.5">

            <AttendanceHeader nameClass={nameClass}/>

            <AttendanceStats totalStudents={totalStudents} totalPresent={totalPresent} calculateAttendance={calculateAttendance}/>

            <div className="w-full flex justify-between items-center gap-3">

                <AttendanceSearch value={search} onChange={setSearch}/>
                <AttendanceActions onMarkAll={markAllPresent}/>

            </div>

            <div className="overflow-y-auto bg-[#FFFFFC] rounded-lg shadow-md shadow-gray-300 divide-y-[0.114rem] divide-[#D1D5DC] scrollbar-thumb-[#155DDD]/80 scrollbar-track-[#99A1AF]/10 scrollbar-thin">

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

            <div className="text-end">
                <Button onClick={saveAttendance} className="px-[0.5rem] py-[0.2rem] bg-[#347D39] hover:bg-[#499E4E] active:bg-[#347D39] rounded-lg font-bold text-[1rem] text-[#EBEBEB] cursor-pointer transition delay-50 duration-50 ease-in-out shadow-sm shadow-gray-300">
                                    
                    <div className="flex justify-center items-center gap-x-[0.4rem] text-[0.9rem]">
                        <img src="icons/save-w.svg" alt="email-icon" className="w-[1.5rem]"/>
                        Salvar chamada
                    </div>        
                                                
                </Button>
            </div>

            <Toaster />

            <Modal open={showModal} setOpen={(open) => { if (!open) closeModal(); }} className="w-[92vw] max-w-md max-h-[90vh] p-4 sm:p-6 bg-[#F9FBFC] overflow-y-auto  rounded-lg animate-scale-in-center"> 
                <div className="flex flex-col">
                    <div className="mb-4 sm:mb-5">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                            Justificar falta
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Adicione, altere ou remova a justificativa da falta.
                        </p>
                    </div>

                    <div className="bg-[#FFFFFC] border border-gray-200 shadow-md shadow-gray-300 rounded-lg p-3.5 sm:p-4 mb-4 sm:mb-5 text-xs sm:text-sm">
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
                            className="w-full p-3 bg-[#FFFFFC] border border-gray-200 shadow-md shadow-gray-300 rounded-lg resize-none outline-none focus:border-[#155DDD] text-xs sm:text-sm"
                        />

                        <div className="mt-3">
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                Tipo de Comprovante:
                            </label>

                            <div className="grid grid-cols-2 gap-2 ">
                                <label
                                    className={`flex items-center justify-center gap-2 p-2 sm:p-2.5 rounded-lg border shadow-md shadow-gray-300 text-xs sm:text-sm font-medium transition cursor-pointer select-none ${
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
                                    className={`flex items-center justify-center gap-2 p-2 sm:p-2.5 rounded-lg border shadow-md shadow-gray-300 text-xs sm:text-sm font-medium transition cursor-pointer select-none ${
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

                    <div className="flex gap-2 sm:gap-3 ">
                        <button
                            onClick={closeModal}
                            className="flex-1 py-2 sm:py-2.5 bg-[#FFFFFC] border border-gray-200 shadow-md shadow-gray-300 rounded-lg font-semibold text-xs sm:text-sm text-gray-600 hover:bg-gray-50 hover:cursor-pointer transition"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={confirmAbsence}
                            disabled={justification.trim().length >= 0 && !justificationType}
                            className="flex-1 bg-[#155DDD] not-disabled:hover:bg-[#5B90EC] not-disabled:active:bg-[#133069] border border-gray-200 shadow-md shadow-gray-300 rounded-lg font-bold text-xs sm:text-sm text-white py-2 sm:py-2.5 hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </Modal>

        </div>
    );
}