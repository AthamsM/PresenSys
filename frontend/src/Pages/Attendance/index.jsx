import { useEffect, useState } from "react";
import { AttendanceHeader } from "../../Components/Attendance/AttendanceHeader";
import { AttendanceStats } from "../../Components/Attendance/AttendanceStats";
import { AttendanceSearch } from "../../Components/Attendance/AttendanceSearch";
import { AttendanceActions } from "../../Components/Attendance/AttendanceActions";
import { StudentCard } from "../../Components/Attendance/StudentCard";
import { useSearchParams } from "react-router-dom";
import API from "../../Controller/Api";
import {toast, Toaster } from "react-hot-toast";


export default function AttendancePage() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    //o ID da turma tá vindo pela url
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id"); //o valor que vai buscar no banco da turma

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
            }));

           setStudents(students);

        } catch (error) {
            console.error(error);
        }
    }

    async function saveAttendance() {
        try {
            const data = {
                date: new Date().toISOString().split("T")[0],
                attendance: students.map((student) => ({
                    studentId: student.id,
                    present: student.present,
                })),

            };

            const response = await API.post("/attendances/", data); 

            toast.success (<b>Frequência salva com sucesso!!</b>, {id: "saveAttendance", duration: 2500, style: { borderRadius: "0.375rem"} });

        } catch (error) {
            console.error("Erro ao salvar frequência:", error);
        }
    }

    function toggleAttendance(id) {
        setStudents((currentStateStudents) => 
            currentStateStudents.map((student) =>
                student.id === id
                    ?   {
                            ...student,
                             present: !student.present,
                        }   
                    : student
            )
        );
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

            <AttendanceHeader />

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

            <div className="mt-6 rounded-xl border bg-white">

                {filterStudents.map(
                    (student, index) => (
                        <StudentCard
                            key={student.id}
                            student={student}
                            index={index}
                            onToggle={toggleAttendance}
                        />
                    )
                )}

            </div>
            
            <button
                onClick={saveAttendance}
                className="mt-4 w-full rounded-xl bg-green-300 py-4 font-medium hover:bg-green-400">
                Salvar chamada
            </button>
            <div><Toaster/></div>
        </div>
    );                        
} 




    
