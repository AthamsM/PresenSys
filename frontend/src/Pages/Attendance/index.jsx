import { useEffect, useState } from "react";
import { AttendanceHeader } from "../../Components/Attendance/AttendanceHeader";
import { AttendanceStats } from "../../Components/Attendance/AttendanceStats";
import { AttendanceSearch } from "../../Components/Attendance/AttendanceSearch";
import { AttendanceActions } from "../../Components/Attendance/AttendanceActions";
import { StudentCard } from "../../Components/Attendance/StudentCard";
import { useSearchParams } from "react-router-dom";
import API from "../../Controller/Api";
import { toast, Toaster } from "react-hot-toast";


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

    useEffect(() => {
        if (id) {
            loadStudents(id);
        }
    }, [id]);

    async function loadStudents(classId) {
        try {

            const response = await API.get(`/class/${classId}`);

            const students = response.data.students.map(student => ({
                id: student.id,
                name: student.name,
                present: false,
                justification: null,
            }));

            setStudents(students);
            setNameClass(response.data.grade + " " + response.data.name);

        } catch (error) {
            console.error(error);
        }
    }

    async function saveAttendance() {
        try {
            const today = new Date();

            const date =
                `${today.getFullYear()}-` +
                `${String(today.getMonth() + 1).padStart(2, "0")}-` +
                `${String(today.getDate()).padStart(2, "0")}`;
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
            
            toast.success(<b>Frequência salva com sucesso!!</b>, { id: "saveAttendance", duration: 2500, style: { borderRadius: "0.375rem" } });

        } catch (error) {
            console.error("Erro ao salvar frequência:", error);
            if (error.response?.status === 409) {
            toast.error("A chamada dessa turma já foi realizada hoje!");
            } else {
            toast.error("Erro ao salvar a chamada.");
            }
        }
    }

    function toggleAttendance(id) {
    setStudents(current =>
        current.map(student =>
            student.id === id
                ? {
                    ...student,
                    present: !student.present,
                    ...(student.present
                        ? {}
                        : { justification: null })
                }
                : student
        )
    );
}
    function openJustificationModal(student) {
    setSelectedStudent(student);
    setJustification(student.justification || "");
    setShowModal(true);
    }
    
    function confirmAbsence() {
    if (!selectedStudent) return;

    setStudents(current =>
        current.map(student =>
            student.id === selectedStudent.id
                ? {
                    ...student,
                    justification: justification.trim() || null
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
                className="mt-4 w-full rounded-xl bg-green-300 py-4 font-medium hover:bg-green-400">
                Salvar chamada
            </button>
            <div><Toaster /></div>


            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-96 shadow-lg">

                        <h2 className="text-lg font-bold mb-4">
                            Justificar Falta
                        </h2>

                        <p className="mb-2 text-sm text-gray-600">
                            {selectedStudent?.name}
                        </p>

                        <textarea
                            rows={4}
                            value={justification}
                            onChange={(e) =>
                                setJustification(e.target.value)
                            }
                            placeholder="Digite a justificativa..."
                            className="w-full border rounded-lg p-2 resize-none"
                        />

                        <div className="flex justify-end gap-2 mt-4">

                            <button
                                onClick={closeModal}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition-colors"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={confirmAbsence}
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-800 transition-colors"
                            >
                                Confirmar
                            </button>

                        </div>

                    </div>
                </div>
            )}
        

            </div>
            );
}





